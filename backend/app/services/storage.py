import mimetypes
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile

from app.config import settings

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime"}
ALLOWED_MEDIA_TYPES = ALLOWED_IMAGE_TYPES | ALLOWED_VIDEO_TYPES

TESTIMONIAL_PREFIX = "testimonials"


def _use_s3() -> bool:
    backend = settings.storage_backend.lower()
    bucket_set = bool(settings.aws_s3_bucket.strip())

    if backend == "s3":
        return bucket_set
    if backend == "local":
        return False

    # auto: S3 when APP_ENV=production and bucket is configured
    return bucket_set and settings.is_production


def _local_root() -> Path:
    root = Path(settings.local_upload_dir)
    if not root.is_absolute():
        root = Path(__file__).resolve().parents[2] / root
    return root


def _validate_file(file: UploadFile, content: bytes) -> str:
    content_type = (file.content_type or "").split(";")[0].strip().lower()
    if content_type not in ALLOWED_MEDIA_TYPES:
        guessed, _ = mimetypes.guess_type(file.filename or "")
        content_type = (guessed or "").lower()

    if content_type in ALLOWED_IMAGE_TYPES:
        max_bytes = settings.upload_max_bytes
        media_type = "image"
    elif content_type in ALLOWED_VIDEO_TYPES:
        max_bytes = settings.upload_max_video_bytes
        media_type = "video"
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Upload JPEG, PNG, WebP, GIF (max 10MB), or MP4/WebM (max 40MB).",
        )

    if len(content) > max_bytes:
        max_mb = max_bytes // (1024 * 1024)
        raise HTTPException(
            status_code=400,
            detail=f"{media_type.capitalize()} must be smaller than {max_mb}MB",
        )

    return media_type


def _extension(filename: str | None, media_type: str) -> str:
    ext = Path(filename or "").suffix.lower()
    if ext in {".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".webm", ".mov"}:
        return ext
    return ".jpg" if media_type == "image" else ".mp4"


class StorageService:
    def backend_name(self) -> str:
        return "s3" if _use_s3() else "local"

    def upload_testimonial_media(self, file: UploadFile, content: bytes) -> tuple[str, str]:
        media_type = _validate_file(file, content)
        ext = _extension(file.filename, media_type)
        key = f"{TESTIMONIAL_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            url = self._upload_s3(key, content, file.content_type)
        else:
            url = self._upload_local(key, content)

        return media_type, url

    def delete_media(self, media_url: str | None) -> None:
        if not media_url:
            return
        if media_url.startswith("http://") or media_url.startswith("https://"):
            if _use_s3() and settings.aws_s3_bucket in media_url:
                key = self._s3_key_from_url(media_url)
                if key:
                    self._delete_s3(key)
            return
        if media_url.startswith("/uploads/"):
            relative = media_url.removeprefix("/uploads/")
            path = _local_root() / relative
            if path.exists() and path.is_file():
                path.unlink()

    def _upload_local(self, key: str, content: bytes) -> str:
        dest = _local_root() / key
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(content)
        return f"/uploads/{key}"

    def _upload_s3(self, key: str, content: bytes, content_type: str | None) -> str:
        try:
            import boto3
            from botocore.exceptions import BotoCoreError, ClientError
        except ImportError as exc:
            raise HTTPException(status_code=500, detail="boto3 is required for S3 uploads") from exc

        client_kwargs = {"region_name": settings.aws_s3_region}
        if settings.aws_access_key_id and settings.aws_secret_access_key:
            client_kwargs["aws_access_key_id"] = settings.aws_access_key_id
            client_kwargs["aws_secret_access_key"] = settings.aws_secret_access_key

        s3 = boto3.client("s3", **client_kwargs)
        extra_args = {}
        if content_type:
            extra_args["ContentType"] = content_type

        try:
            s3.put_object(
                Bucket=settings.aws_s3_bucket,
                Key=key,
                Body=content,
                **extra_args,
            )
        except (BotoCoreError, ClientError) as exc:
            raise HTTPException(status_code=500, detail=f"S3 upload failed: {exc}") from exc

        if settings.aws_s3_public_base_url:
            base = settings.aws_s3_public_base_url.rstrip("/")
            return f"{base}/{key}"

        return f"https://{settings.aws_s3_bucket}.s3.{settings.aws_s3_region}.amazonaws.com/{key}"

    def _s3_key_from_url(self, url: str) -> str | None:
        if settings.aws_s3_public_base_url and url.startswith(settings.aws_s3_public_base_url):
            return url[len(settings.aws_s3_public_base_url.rstrip("/")) + 1 :]
        marker = f".amazonaws.com/"
        if marker in url:
            return url.split(marker, 1)[1]
        return None

    def _delete_s3(self, key: str) -> None:
        try:
            import boto3
            from botocore.exceptions import BotoCoreError, ClientError
        except ImportError:
            return

        client_kwargs = {"region_name": settings.aws_s3_region}
        if settings.aws_access_key_id and settings.aws_secret_access_key:
            client_kwargs["aws_access_key_id"] = settings.aws_access_key_id
            client_kwargs["aws_secret_access_key"] = settings.aws_secret_access_key

        s3 = boto3.client("s3", **client_kwargs)
        try:
            s3.delete_object(Bucket=settings.aws_s3_bucket, Key=key)
        except (BotoCoreError, ClientError):
            pass


storage_service = StorageService()
