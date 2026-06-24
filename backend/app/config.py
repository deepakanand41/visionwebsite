from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql://postgres:password@localhost:5432/visionwebsite"
    admin_secret_key: str = "vision-admin-secret-2026"
    cors_origins: str = "http://localhost:5173"

    # Storage: auto = S3 on EC2 when bucket configured, else local uploads
    storage_backend: str = "auto"
    local_upload_dir: str = "uploads"
    upload_max_bytes: int = 10 * 1024 * 1024
    upload_max_video_bytes: int = 40 * 1024 * 1024

    aws_s3_bucket: str = ""
    aws_s3_region: str = "ap-south-1"
    aws_s3_public_base_url: str = ""
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
