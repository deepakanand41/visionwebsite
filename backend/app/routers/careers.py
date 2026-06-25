from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import JobApplication, JobPosting
from app.schemas import JobPostingPublicResponse, MessageResponse
from app.services.storage import storage_service

router = APIRouter(prefix="/api", tags=["Careers"])


@router.get("/careers", response_model=list[JobPostingPublicResponse])
def list_careers(
    job_type: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(JobPosting).filter(JobPosting.is_active == True)
    if job_type:
        query = query.filter(JobPosting.job_type == job_type)
    return query.order_by(JobPosting.sort_order.asc(), JobPosting.id.desc()).all()


@router.get("/careers/{slug}", response_model=JobPostingPublicResponse)
def get_career(slug: str, db: Session = Depends(get_db)):
    job = (
        db.query(JobPosting)
        .filter(JobPosting.slug == slug, JobPosting.is_active == True)
        .first()
    )
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.post("/careers/apply", response_model=MessageResponse, status_code=201)
async def apply_for_job(
    job_id: int = Form(...),
    full_name: str = Form(..., min_length=3, max_length=150),
    email: EmailStr = Form(...),
    phone: str = Form(..., min_length=8, max_length=20),
    current_city: str | None = Form(None),
    current_role: str | None = Form(None),
    experience_years: str | None = Form(None),
    linkedin_url: str | None = Form(None),
    cover_message: str | None = Form(None),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    job = db.query(JobPosting).filter(JobPosting.id == job_id, JobPosting.is_active == True).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job opening not found or no longer active")

    content = await resume.read()
    resume_url, resume_filename = storage_service.upload_resume(resume, content)

    application = JobApplication(
        job_id=job.id,
        job_title=job.title,
        full_name=full_name.strip(),
        email=str(email).strip().lower(),
        phone=phone.strip(),
        current_city=current_city.strip() if current_city else None,
        current_role=current_role.strip() if current_role else None,
        experience_years=experience_years.strip() if experience_years else None,
        linkedin_url=linkedin_url.strip() if linkedin_url else None,
        cover_message=cover_message.strip() if cover_message else None,
        resume_url=resume_url,
        resume_filename=resume_filename,
    )
    db.add(application)
    db.commit()

    return MessageResponse(
        message="Your application has been submitted successfully. Our HR team will review it and contact you soon."
    )
