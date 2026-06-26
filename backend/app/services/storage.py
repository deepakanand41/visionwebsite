import mimetypes
import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile

from app.config import settings

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime"}
ALLOWED_MEDIA_TYPES = ALLOWED_IMAGE_TYPES | ALLOWED_VIDEO_TYPES

ALLOWED_RESUME_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
ALLOWED_RESUME_EXTENSIONS = {".pdf", ".doc", ".docx"}

TESTIMONIAL_PREFIX = "testimonials"
OFFER_PREFIX = "offers"
CONTENT_PREFIX = "content"
ACCREDITATION_PREFIX = "accreditations"
TOURIST_VISA_PREFIX = "tourist-visa"
RESUME_PREFIX = "resumes"
MEDIA_PREFIXES = (TESTIMONIAL_PREFIX, OFFER_PREFIX, CONTENT_PREFIX, ACCREDITATION_PREFIX, TOURIST_VISA_PREFIX, RESUME_PREFIX)

ACCREDITATION_IMAGE_TYPES = {"image/jpeg", "image/png"}


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


def _resume_extension(filename: str | None) -> str:
    ext = Path(filename or "").suffix.lower()
    if ext in ALLOWED_RESUME_EXTENSIONS:
        return ext
    return ".pdf"


class StorageService:
    def backend_name(self) -> str:
        return "s3" if _use_s3() else "local"

    def public_url(self, key: str) -> str:
        return f"/api/media/{key}"

    def resolve_key(self, media_url: str | None) -> str | None:
        if not media_url:
            return None
        url = media_url.strip()
        if url.startswith("/api/media/"):
            return url.removeprefix("/api/media/").lstrip("/")
        if url.startswith("/uploads/"):
            return url.removeprefix("/uploads/").lstrip("/")
        if url.startswith("http://") or url.startswith("https://"):
            return self._s3_key_from_url(url)
        return None

    def get_media_size(self, key: str) -> int:
        if _use_s3():
            bucket = settings.aws_s3_bucket.strip()
            s3 = self._s3_client()
            try:
                head = s3.head_object(Bucket=bucket, Key=key)
                return head["ContentLength"]
            except Exception as exc:
                raise HTTPException(status_code=404, detail="Media not found") from exc

        path = _local_root() / key
        if not path.exists() or not path.is_file():
            raise HTTPException(status_code=404, detail="Media not found")
        return path.stat().st_size

    def upload_testimonial_media(self, file: UploadFile, content: bytes) -> tuple[str, str]:
        media_type = _validate_file(file, content)
        ext = _extension(file.filename, media_type)
        key = f"{TESTIMONIAL_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            self._upload_s3(key, content, file.content_type)
        else:
            self._upload_local(key, content)

        return media_type, self.public_url(key)

    def upload_offer_media(self, file: UploadFile, content: bytes) -> tuple[str, str]:
        media_type = _validate_file(file, content)
        ext = _extension(file.filename, media_type)
        key = f"{OFFER_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            self._upload_s3(key, content, file.content_type)
        else:
            self._upload_local(key, content)

        return media_type, self.public_url(key)

    def upload_offer_image(self, file: UploadFile, content: bytes) -> str:
        media_type, media_url = self.upload_offer_media(file, content)
        if media_type != "image":
            raise HTTPException(status_code=400, detail="Offer image must be JPEG, PNG, WebP, or GIF (max 10MB).")
        return media_url

    def upload_content_media(self, file: UploadFile, content: bytes) -> tuple[str, str]:
        media_type = _validate_file(file, content)
        ext = _extension(file.filename, media_type)
        key = f"{CONTENT_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            self._upload_s3(key, content, file.content_type)
        else:
            self._upload_local(key, content)

        return media_type, self.public_url(key)

    def upload_content_image(self, file: UploadFile, content: bytes) -> str:
        media_type = _validate_file(file, content)
        if media_type != "image":
            raise HTTPException(status_code=400, detail="Cover image must be JPEG, PNG, WebP, or GIF (max 10MB).")
        ext = _extension(file.filename, media_type)
        key = f"{CONTENT_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            self._upload_s3(key, content, file.content_type)
        else:
            self._upload_local(key, content)

        return self.public_url(key)

    def upload_tourist_visa_image(self, file: UploadFile, content: bytes) -> str:
        media_type = _validate_file(file, content)
        if media_type != "image":
            raise HTTPException(status_code=400, detail="Hero image must be JPEG, PNG, WebP, or GIF (max 10MB).")
        ext = _extension(file.filename, media_type)
        key = f"{TOURIST_VISA_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            self._upload_s3(key, content, file.content_type)
        else:
            self._upload_local(key, content)

        return self.public_url(key)

    def upload_accreditation_image(self, file: UploadFile, content: bytes) -> str:
        content_type = (file.content_type or "").split(";")[0].strip().lower()
        if content_type not in ACCREDITATION_IMAGE_TYPES:
            guessed, _ = mimetypes.guess_type(file.filename or "")
            content_type = (guessed or "").lower()
        if content_type not in ACCREDITATION_IMAGE_TYPES:
            raise HTTPException(
                status_code=400,
                detail="Accreditation logo must be JPEG or PNG (max 10MB).",
            )
        if len(content) > settings.upload_max_bytes:
            max_mb = settings.upload_max_bytes // (1024 * 1024)
            raise HTTPException(status_code=400, detail=f"Image must be smaller than {max_mb}MB")

        ext = _extension(file.filename, "image")
        if ext not in {".jpg", ".jpeg", ".png"}:
            ext = ".jpg" if content_type == "image/jpeg" else ".png"
        key = f"{ACCREDITATION_PREFIX}/{uuid.uuid4().hex}{ext}"

        if _use_s3():
            self._upload_s3(key, content, content_type)
        else:
            self._upload_local(key, content)

        return self.public_url(key)

    def upload_resume(self, file: UploadFile, content: bytes) -> tuple[str, str]:
        content_type = (file.content_type or "").split(";")[0].strip().lower()
        ext = _resume_extension(file.filename)
        if content_type not in ALLOWED_RESUME_TYPES and ext not in ALLOWED_RESUME_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail="Resume must be PDF or Word document (.pdf, .doc, .docx, max 5MB).",
            )

        max_bytes = settings.upload_max_resume_bytes
        if len(content) > max_bytes:
            max_mb = max_bytes // (1024 * 1024)
            raise HTTPException(status_code=400, detail=f"Resume must be smaller than {max_mb}MB")

        key = f"{RESUME_PREFIX}/{uuid.uuid4().hex}{ext}"
        if _use_s3():
            self._upload_s3(key, content, file.content_type or content_type)
        else:
            self._upload_local(key, content)

        return self.public_url(key), file.filename or f"resume{ext}"

    def delete_media(self, media_url: str | None) -> None:
        key = self.resolve_key(media_url)
        if not key:
            return

        if _use_s3():
            self._delete_s3(key)
            return

        path = _local_root() / key
        if path.exists() and path.is_file():
            path.unlink()

    def _s3_client(self):
        try:
            import boto3
        except ImportError as exc:
            raise HTTPException(status_code=500, detail="boto3 is required for S3") from exc

        client_kwargs = {"region_name": settings.aws_s3_region}
        if settings.aws_access_key_id and settings.aws_secret_access_key:
            client_kwargs["aws_access_key_id"] = settings.aws_access_key_id
            client_kwargs["aws_secret_access_key"] = settings.aws_secret_access_key
        return boto3.client("s3", **client_kwargs)

    def _upload_local(self, key: str, content: bytes) -> str:
        dest = _local_root() / key
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(content)
        return key

    def _upload_s3(self, key: str, content: bytes, content_type: str | None) -> str:
        from botocore.exceptions import BotoCoreError, ClientError

        s3 = self._s3_client()
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

        return key

    def _s3_key_from_url(self, url: str) -> str | None:
        if settings.aws_s3_public_base_url and url.startswith(settings.aws_s3_public_base_url):
            return url[len(settings.aws_s3_public_base_url.rstrip("/")) + 1 :]
        marker = f".amazonaws.com/"
        if marker in url:
            return url.split(marker, 1)[1]
        return None

    def _delete_s3(self, key: str) -> None:
        from botocore.exceptions import BotoCoreError, ClientError

        s3 = self._s3_client()
        try:
            s3.delete_object(Bucket=settings.aws_s3_bucket, Key=key)
        except (BotoCoreError, ClientError):
            pass


storage_service = StorageService()
