import mimetypes
import re
from pathlib import Path

from fastapi import HTTPException
from fastapi.responses import Response, StreamingResponse

from app.config import settings
from app.services.storage import (
    TESTIMONIAL_PREFIX,
    _local_root,
    _use_s3,
    storage_service,
)

CHUNK_SIZE = 256 * 1024
RANGE_RE = re.compile(r"bytes=(\d*)-(\d*)")


def safe_media_key(key: str) -> str:
    normalized = key.strip().lstrip("/").replace("\\", "/")
    if ".." in normalized.split("/") or not normalized.startswith(f"{TESTIMONIAL_PREFIX}/"):
        raise HTTPException(status_code=404, detail="Media not found")
    return normalized


def parse_range_header(range_header: str | None, file_size: int) -> tuple[int, int] | None:
    if not range_header:
        return None

    match = RANGE_RE.match(range_header.strip())
    if not match:
        return None

    start_str, end_str = match.groups()
    if start_str == "" and end_str == "":
        return None

    if start_str == "":
        suffix = int(end_str)
        if suffix <= 0:
            return None
        start = max(file_size - suffix, 0)
        end = file_size - 1
    else:
        start = int(start_str)
        end = int(end_str) if end_str else file_size - 1

    if start >= file_size or start < 0 or end < start:
        raise HTTPException(
            status_code=416,
            detail="Range not satisfiable",
            headers={"Content-Range": f"bytes */{file_size}"},
        )

    end = min(end, file_size - 1)
    return start, end


def _content_type_for_key(key: str) -> str:
    guessed, _ = mimetypes.guess_type(key)
    return guessed or "application/octet-stream"


def _stream_local(key: str, byte_range: tuple[int, int] | None) -> Response:
    path = _local_root() / key
    if not path.exists() or not path.is_file():
        raise HTTPException(status_code=404, detail="Media not found")

    file_size = path.stat().st_size
    content_type = _content_type_for_key(key)

    if byte_range is None:
        def full_iter():
            with path.open("rb") as handle:
                while chunk := handle.read(CHUNK_SIZE):
                    yield chunk

        return StreamingResponse(
            full_iter(),
            media_type=content_type,
            headers={
                "Accept-Ranges": "bytes",
                "Content-Length": str(file_size),
                "Cache-Control": "public, max-age=86400",
            },
        )

    start, end = byte_range
    length = end - start + 1

    def range_iter():
        with path.open("rb") as handle:
            handle.seek(start)
            remaining = length
            while remaining > 0:
                data = handle.read(min(CHUNK_SIZE, remaining))
                if not data:
                    break
                remaining -= len(data)
                yield data

    return StreamingResponse(
        range_iter(),
        status_code=206,
        media_type=content_type,
        headers={
            "Accept-Ranges": "bytes",
            "Content-Range": f"bytes {start}-{end}/{file_size}",
            "Content-Length": str(length),
            "Cache-Control": "public, max-age=86400",
        },
    )


def _s3_client():
    try:
        import boto3
    except ImportError as exc:
        raise HTTPException(status_code=500, detail="boto3 is required for S3 media") from exc

    client_kwargs = {"region_name": settings.aws_s3_region}
    if settings.aws_access_key_id and settings.aws_secret_access_key:
        client_kwargs["aws_access_key_id"] = settings.aws_access_key_id
        client_kwargs["aws_secret_access_key"] = settings.aws_secret_access_key
    return boto3.client("s3", **client_kwargs)


def _stream_s3(key: str, byte_range: tuple[int, int] | None) -> Response:
    bucket = settings.aws_s3_bucket.strip()
    if not bucket:
        raise HTTPException(status_code=404, detail="Media not found")

    s3 = _s3_client()
    try:
        head = s3.head_object(Bucket=bucket, Key=key)
    except Exception as exc:
        raise HTTPException(status_code=404, detail="Media not found") from exc

    file_size = head["ContentLength"]
    content_type = head.get("ContentType") or _content_type_for_key(key)

    get_kwargs = {"Bucket": bucket, "Key": key}
    if byte_range is not None:
        start, end = byte_range
        get_kwargs["Range"] = f"bytes={start}-{end}"

    try:
        obj = s3.get_object(**get_kwargs)
    except Exception as exc:
        raise HTTPException(status_code=404, detail="Media not found") from exc

    body = obj["Body"]

    def s3_iter():
        try:
            while chunk := body.read(CHUNK_SIZE):
                yield chunk
        finally:
            body.close()

    if byte_range is None:
        return StreamingResponse(
            s3_iter(),
            media_type=content_type,
            headers={
                "Accept-Ranges": "bytes",
                "Content-Length": str(file_size),
                "Cache-Control": "public, max-age=86400",
            },
        )

    start, end = byte_range
    length = end - start + 1
    return StreamingResponse(
        s3_iter(),
        status_code=206,
        media_type=content_type,
        headers={
            "Accept-Ranges": "bytes",
            "Content-Range": f"bytes {start}-{end}/{file_size}",
            "Content-Length": str(length),
            "Cache-Control": "public, max-age=86400",
        },
    )


def media_head_response(key: str) -> Response:
    key = safe_media_key(key)

    if _use_s3():
        bucket = settings.aws_s3_bucket.strip()
        s3 = _s3_client()
        try:
            head = s3.head_object(Bucket=bucket, Key=key)
        except Exception as exc:
            raise HTTPException(status_code=404, detail="Media not found") from exc
        file_size = head["ContentLength"]
        content_type = head.get("ContentType") or _content_type_for_key(key)
    else:
        path = _local_root() / key
        if not path.exists() or not path.is_file():
            raise HTTPException(status_code=404, detail="Media not found")
        file_size = path.stat().st_size
        content_type = _content_type_for_key(key)

    return Response(
        status_code=200,
        headers={
            "Accept-Ranges": "bytes",
            "Content-Length": str(file_size),
            "Content-Type": content_type,
            "Cache-Control": "public, max-age=86400",
        },
    )


def media_stream_response(key: str, range_header: str | None) -> Response:
    key = safe_media_key(key)

    file_size = storage_service.get_media_size(key)
    byte_range = parse_range_header(range_header, file_size)

    if _use_s3():
        return _stream_s3(key, byte_range)
    return _stream_local(key, byte_range)
