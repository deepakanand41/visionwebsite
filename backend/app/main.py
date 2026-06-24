from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse

from app.config import settings
from app.database import Base, engine
from app.migrate import run_migrations
from app.seed import seed_testimonials
from app.routers import enquiry, demo_class, referral, testimonials, admin, education_loan

Base.metadata.create_all(bind=engine)
run_migrations()
seed_testimonials()

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
app.include_router(admin.router)

STATIC_DIR = Path(__file__).parent / "static" / "admin"


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "vision-fastapi-backend"}


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
