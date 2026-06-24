from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.services.storage import storage_service
from app.database import Base, engine
from app.migrate import run_migrations
from app.seed import seed_testimonials
from app.seed_content import seed_content
from app.seed_offers import seed_offers
from app.routers import enquiry, demo_class, referral, testimonials, admin, education_loan, media, content, offers

Base.metadata.create_all(bind=engine)
run_migrations()
seed_testimonials()
seed_content()
seed_offers()

app = FastAPI(
    title="Vision Overseas Education API",
    description="REST API for Vision website forms and admin panel",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(enquiry.router)
app.include_router(demo_class.router)
app.include_router(referral.router)
app.include_router(education_loan.router)
app.include_router(testimonials.router)
app.include_router(content.router)
app.include_router(offers.router)
app.include_router(admin.router)
app.include_router(media.router)

STATIC_DIR = Path(__file__).parent / "static" / "admin"


@app.get("/api/health")
def health_check():
    bucket = settings.aws_s3_bucket.strip()
    return {
        "status": "ok",
        "service": "vision-fastapi-backend",
        "app_env": settings.app_env,
        "is_production": settings.is_production,
        "storage_backend": storage_service.backend_name(),
        "storage_mode": settings.storage_backend,
        "s3_bucket_configured": bool(bucket),
        "s3_bucket": bucket or None,
        "upload_max_image_mb": settings.upload_max_bytes // (1024 * 1024),
        "upload_max_video_mb": settings.upload_max_video_bytes // (1024 * 1024),
    }


@app.get("/admin/{secret_key}", response_class=HTMLResponse)
def admin_panel(secret_key: str):
    if secret_key != settings.admin_secret_key:
        raise HTTPException(status_code=403, detail="Invalid admin secret key")

    html_path = STATIC_DIR / "index.html"
    if not html_path.exists():
        raise HTTPException(status_code=404, detail="Admin panel not found")

    return HTMLResponse(content=html_path.read_text(encoding="utf-8"))


@app.get("/admin/static/{filename}")
def admin_static(filename: str):
    file_path = STATIC_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404)
    return FileResponse(file_path)


UPLOAD_DIR = Path(__file__).resolve().parents[1] / settings.local_upload_dir
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")
