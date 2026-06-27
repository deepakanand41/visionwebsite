from pathlib import Path

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

_BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=_BACKEND_DIR / ".env",
        extra="ignore",
    )

    database_url: str = "postgresql://postgres:password@localhost:5432/visionwebsite"
    admin_secret_key: str = "vision-admin-secret-2026"
    cors_origins: str = "http://localhost:5173"

    # development | production — set APP_ENV=production on the server
    app_env: str = "development"

    # Storage: auto = S3 in production when bucket configured, else local uploads
    storage_backend: str = "auto"
    local_upload_dir: str = "uploads"
    upload_max_bytes: int = 10 * 1024 * 1024
    upload_max_video_bytes: int = 40 * 1024 * 1024
    upload_max_resume_bytes: int = 5 * 1024 * 1024

    aws_s3_bucket: str = ""
    aws_s3_region: str = "ap-south-1"
    aws_s3_public_base_url: str = ""
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""

    # Zoho SMTP — set SMTP_ENABLED=true and credentials in .env
    smtp_enabled: bool = False
    smtp_host: str = "smtp.zoho.com"
    smtp_port: int = 587
    smtp_security: str = "tls"  # tls (port 587) | ssl (port 465)
    smtp_username: str = ""
    smtp_password: str = ""
    smtp_from_email: str = ""
    smtp_from_name: str = "Vision International"
    smtp_notify_to: str = ""  # comma-separated recipient emails
    smtp_ssl_verify: bool = True  # set false only for local debugging if certs fail

    @field_validator(
        "smtp_host",
        "smtp_security",
        "smtp_username",
        "smtp_password",
        "smtp_from_email",
        "smtp_from_name",
        "smtp_notify_to",
        mode="before",
    )
    @classmethod
    def _strip_smtp_fields(cls, value):
        if isinstance(value, str):
            return value.strip()
        return value

    @model_validator(mode="after")
    def _normalize_smtp(self):
        if self.smtp_enabled and not self.smtp_from_email and self.smtp_username:
            self.smtp_from_email = self.smtp_username
        return self

    @property
    def notify_recipients(self) -> list[str]:
        return [e.strip() for e in self.smtp_notify_to.split(",") if e.strip()]

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env.strip().lower() in ("production", "prod")


settings = Settings()
