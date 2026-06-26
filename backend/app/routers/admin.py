from datetime import datetime, timezone

from fastapi import APIRouter, Depends, File, HTTPException, Query, UploadFile
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.auth import verify_admin_secret
from app.constants import ALL_STATUSES, SUBMISSION_STATUSES
from app.database import get_db
from app.models import Enquiry, DemoClassBooking, ExamBooking, ReferralApplication, EducationLoanRequest, Testimonial, ContentPost, Offer, JobPosting, JobApplication, Accreditation, TouristVisaCountry, TouristVisaEnquiry
from app.schemas import (
    EnquiryResponse,
    DemoClassResponse,
    ExamBookingResponse,
    ReferralResponse,
    EducationLoanResponse,
    TestimonialCreate,
    TestimonialUpdate,
    TestimonialResponse,
    StatusUpdate,
    MessageResponse,
    MediaUploadResponse,
    ContentPostCreate,
    ContentPostUpdate,
    ContentPostResponse,
    OfferCreate,
    OfferUpdate,
    OfferResponse,
    ImageUploadResponse,
    JobPostingCreate,
    JobPostingUpdate,
    JobPostingResponse,
    JobApplicationResponse,
    AccreditationCreate,
    AccreditationUpdate,
    AccreditationResponse,
    TouristVisaCountryCreate,
    TouristVisaCountryUpdate,
    TouristVisaCountryResponse,
    TouristVisaEnquiryResponse,
)
from app.services.storage import storage_service
from app.utils.slugify import slugify

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"],
    dependencies=[Depends(verify_admin_secret)],
)


def _apply_search_enquiry(query, search: str):
    term = f"%{search.lower()}%"
    return query.filter(
        or_(
            Enquiry.first_name.ilike(term),
            Enquiry.last_name.ilike(term),
            Enquiry.email.ilike(term),
            Enquiry.phone.ilike(term),
            Enquiry.destination.ilike(term),
            Enquiry.study_level.ilike(term),
            Enquiry.admin_notes.ilike(term),
        )
    )


def _apply_search_demo(query, search: str):
    term = f"%{search.lower()}%"
    return query.filter(
        or_(
            DemoClassBooking.full_name.ilike(term),
            DemoClassBooking.email.ilike(term),
            DemoClassBooking.phone.ilike(term),
            DemoClassBooking.exam_type.ilike(term),
            DemoClassBooking.batch.ilike(term),
            DemoClassBooking.admin_notes.ilike(term),
        )
    )


def _apply_search_exam_booking(query, search: str):
    term = f"%{search.lower()}%"
    return query.filter(
        or_(
            ExamBooking.first_name.ilike(term),
            ExamBooking.last_name.ilike(term),
            ExamBooking.email.ilike(term),
            ExamBooking.phone.ilike(term),
            ExamBooking.exam_type.ilike(term),
            ExamBooking.exam_format.ilike(term),
            ExamBooking.preferred_city.ilike(term),
            ExamBooking.notes.ilike(term),
            ExamBooking.admin_notes.ilike(term),
        )
    )


def _apply_search_referral(query, search: str):
    term = f"%{search.lower()}%"
    return query.filter(
        or_(
            ReferralApplication.full_name.ilike(term),
            ReferralApplication.email.ilike(term),
            ReferralApplication.mobile.ilike(term),
            ReferralApplication.city.ilike(term),
            ReferralApplication.state.ilike(term),
            ReferralApplication.country.ilike(term),
            ReferralApplication.occupation.ilike(term),
            ReferralApplication.admin_notes.ilike(term),
        )
    )


def _apply_search_loan(query, search: str):
    term = f"%{search.lower()}%"
    return query.filter(
        or_(
            EducationLoanRequest.full_name.ilike(term),
            EducationLoanRequest.email.ilike(term),
            EducationLoanRequest.phone.ilike(term),
            EducationLoanRequest.destination.ilike(term),
            EducationLoanRequest.course_program.ilike(term),
            EducationLoanRequest.loan_type.ilike(term),
            EducationLoanRequest.city.ilike(term),
            EducationLoanRequest.state.ilike(term),
            EducationLoanRequest.admin_notes.ilike(term),
        )
    )


def _update_status(record, payload: StatusUpdate):
    if payload.status not in ALL_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Allowed: {', '.join(ALL_STATUSES)}")
    record.status = payload.status
    if payload.admin_notes is not None:
        record.admin_notes = payload.admin_notes
    record.status_updated_at = datetime.now(timezone.utc)


# ─── Submissions ───────────────────────────────────────────────────────────────

@router.get("/enquiries", response_model=list[EnquiryResponse])
def list_enquiries(
    status: str | None = Query(None),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Enquiry)
    if status:
        query = query.filter(Enquiry.status == status)
    if search:
        query = _apply_search_enquiry(query, search)
    return query.order_by(Enquiry.created_at.desc()).all()


@router.patch("/enquiries/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry_status(
    enquiry_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    record = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    _update_status(record, payload)
    db.commit()
    db.refresh(record)
    return record


@router.get("/demo-classes", response_model=list[DemoClassResponse])
def list_demo_classes(
    status: str | None = Query(None),
    search: str | None = Query(None),
    exam_type: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(DemoClassBooking)
    if status:
        query = query.filter(DemoClassBooking.status == status)
    if exam_type:
        query = query.filter(DemoClassBooking.exam_type == exam_type.lower())
    if search:
        query = _apply_search_demo(query, search)
    return query.order_by(DemoClassBooking.created_at.desc()).all()


@router.patch("/demo-classes/{booking_id}", response_model=DemoClassResponse)
def update_demo_status(
    booking_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    record = db.query(DemoClassBooking).filter(DemoClassBooking.id == booking_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Demo class booking not found")
    _update_status(record, payload)
    db.commit()
    db.refresh(record)
    return record


@router.get("/exam-bookings", response_model=list[ExamBookingResponse])
def list_exam_bookings(
    status: str | None = Query(None),
    search: str | None = Query(None),
    exam_type: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(ExamBooking)
    if status:
        query = query.filter(ExamBooking.status == status)
    if exam_type:
        query = query.filter(ExamBooking.exam_type == exam_type.lower())
    if search:
        query = _apply_search_exam_booking(query, search)
    return query.order_by(ExamBooking.created_at.desc()).all()


@router.patch("/exam-bookings/{booking_id}", response_model=ExamBookingResponse)
def update_exam_booking_status(
    booking_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    record = db.query(ExamBooking).filter(ExamBooking.id == booking_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Exam booking not found")
    _update_status(record, payload)
    db.commit()
    db.refresh(record)
    return record


@router.get("/referrals", response_model=list[ReferralResponse])
def list_referrals(
    status: str | None = Query(None),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(ReferralApplication)
    if status:
        query = query.filter(ReferralApplication.status == status)
    if search:
        query = _apply_search_referral(query, search)
    return query.order_by(ReferralApplication.created_at.desc()).all()


@router.patch("/referrals/{referral_id}", response_model=ReferralResponse)
def update_referral_status(
    referral_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    record = db.query(ReferralApplication).filter(ReferralApplication.id == referral_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Referral application not found")
    _update_status(record, payload)
    db.commit()
    db.refresh(record)
    return record


@router.get("/education-loans", response_model=list[EducationLoanResponse])
def list_education_loans(
    status: str | None = Query(None),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(EducationLoanRequest)
    if status:
        query = query.filter(EducationLoanRequest.status == status)
    if search:
        query = _apply_search_loan(query, search)
    return query.order_by(EducationLoanRequest.created_at.desc()).all()


@router.patch("/education-loans/{loan_id}", response_model=EducationLoanResponse)
def update_education_loan_status(
    loan_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    record = db.query(EducationLoanRequest).filter(EducationLoanRequest.id == loan_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Education loan request not found")
    _update_status(record, payload)
    db.commit()
    db.refresh(record)
    return record


@router.get("/statuses")
def get_statuses():
    return {
        "general": SUBMISSION_STATUSES,
        "referral": SUBMISSION_STATUSES + ["approved", "onboarded"],
        "all": ALL_STATUSES,
    }


# ─── Testimonials CRUD ─────────────────────────────────────────────────────────

@router.get("/testimonials", response_model=list[TestimonialResponse])
def admin_list_testimonials(
    search: str | None = Query(None),
    is_active: bool | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Testimonial)
    if is_active is not None:
        query = query.filter(Testimonial.is_active == is_active)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                Testimonial.name.ilike(term),
                Testimonial.destination.ilike(term),
                Testimonial.university.ilike(term),
                Testimonial.course.ilike(term),
            )
        )
    return query.order_by(Testimonial.sort_order.asc(), Testimonial.id.desc()).all()


@router.post("/testimonials", response_model=TestimonialResponse, status_code=201)
def create_testimonial(payload: TestimonialCreate, db: Session = Depends(get_db)):
    testimonial = Testimonial(**payload.model_dump())
    db.add(testimonial)
    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.put("/testimonials/{testimonial_id}", response_model=TestimonialResponse)
def update_testimonial(
    testimonial_id: int,
    payload: TestimonialUpdate,
    db: Session = Depends(get_db),
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(testimonial, field, value)

    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/testimonials/{testimonial_id}", response_model=MessageResponse)
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db)):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    storage_service.delete_media(testimonial.media_url)
    db.delete(testimonial)
    db.commit()
    return MessageResponse(message="Testimonial deleted successfully")


@router.post("/testimonials/{testimonial_id}/media", response_model=MediaUploadResponse)
async def upload_testimonial_media(
    testimonial_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    content = await file.read()
    media_type, media_url = storage_service.upload_testimonial_media(file, content)

    if testimonial.media_url:
        storage_service.delete_media(testimonial.media_url)

    testimonial.media_type = media_type
    testimonial.media_url = media_url
    db.commit()
    db.refresh(testimonial)

    return MediaUploadResponse(
        media_type=media_type,
        media_url=media_url,
        message="Media uploaded successfully",
    )


@router.delete("/testimonials/{testimonial_id}/media", response_model=MessageResponse)
def delete_testimonial_media(testimonial_id: int, db: Session = Depends(get_db)):
    testimonial = db.query(Testimonial).filter(Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    if not testimonial.media_url:
        raise HTTPException(status_code=404, detail="No media on this testimonial")

    storage_service.delete_media(testimonial.media_url)
    testimonial.media_type = None
    testimonial.media_url = None
    db.commit()
    return MessageResponse(message="Media removed successfully")


# ─── News & Blog CRUD ──────────────────────────────────────────────────────────

def _unique_slug(db: Session, base_slug: str, exclude_id: int | None = None) -> str:
    slug = base_slug
    counter = 1
    while True:
        query = db.query(ContentPost).filter(ContentPost.slug == slug)
        if exclude_id:
            query = query.filter(ContentPost.id != exclude_id)
        if not query.first():
            return slug
        slug = f"{base_slug}-{counter}"
        counter += 1


def _apply_publish_state(post: ContentPost) -> None:
    if post.is_published and not post.published_at:
        post.published_at = datetime.now(timezone.utc)


@router.get("/content", response_model=list[ContentPostResponse])
def admin_list_content(
    content_type: str = Query(..., pattern="^(news|blog)$"),
    search: str | None = Query(None),
    is_published: bool | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(ContentPost).filter(ContentPost.content_type == content_type)
    if is_published is not None:
        query = query.filter(ContentPost.is_published == is_published)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                ContentPost.title.ilike(term),
                ContentPost.excerpt.ilike(term),
                ContentPost.category.ilike(term),
            )
        )
    return query.order_by(ContentPost.published_at.desc().nullslast(), ContentPost.id.desc()).all()


@router.post("/content", response_model=ContentPostResponse, status_code=201)
def create_content(payload: ContentPostCreate, db: Session = Depends(get_db)):
    base_slug = slugify(payload.slug or payload.title)
    if not base_slug:
        raise HTTPException(status_code=400, detail="Invalid title for slug")

    post = ContentPost(
        **payload.model_dump(exclude={"slug"}),
        slug=_unique_slug(db, base_slug),
    )
    _apply_publish_state(post)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.put("/content/{post_id}", response_model=ContentPostResponse)
def update_content(
    post_id: int,
    payload: ContentPostUpdate,
    db: Session = Depends(get_db),
):
    post = db.query(ContentPost).filter(ContentPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"]:
        data["slug"] = _unique_slug(db, slugify(data["slug"]), exclude_id=post_id)
    elif "title" in data and data["title"]:
        data["slug"] = _unique_slug(db, slugify(data["title"]), exclude_id=post_id)

    for field, value in data.items():
        setattr(post, field, value)

    _apply_publish_state(post)
    db.commit()
    db.refresh(post)
    return post


@router.delete("/content/{post_id}", response_model=MessageResponse)
def delete_content(post_id: int, db: Session = Depends(get_db)):
    post = db.query(ContentPost).filter(ContentPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    storage_service.delete_media(post.cover_image_url)
    db.delete(post)
    db.commit()
    return MessageResponse(message="Post deleted successfully")


@router.post("/content/{post_id}/image", response_model=ImageUploadResponse)
async def upload_content_image(
    post_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    post = db.query(ContentPost).filter(ContentPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    content = await file.read()
    image_url = storage_service.upload_content_image(file, content)

    if post.cover_image_url:
        storage_service.delete_media(post.cover_image_url)

    post.cover_image_url = image_url
    db.commit()

    return ImageUploadResponse(image_url=image_url, message="Image uploaded successfully")


@router.delete("/content/{post_id}/image", response_model=MessageResponse)
def delete_content_image(post_id: int, db: Session = Depends(get_db)):
    post = db.query(ContentPost).filter(ContentPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if not post.cover_image_url:
        raise HTTPException(status_code=404, detail="No cover image on this post")

    storage_service.delete_media(post.cover_image_url)
    post.cover_image_url = None
    db.commit()
    return MessageResponse(message="Cover image removed successfully")


@router.post("/content/upload-media", response_model=MediaUploadResponse)
async def upload_content_inline_media(file: UploadFile = File(...)):
    content = await file.read()
    media_type, media_url = storage_service.upload_content_media(file, content)
    return MediaUploadResponse(
        media_type=media_type,
        media_url=media_url,
        message="Media uploaded successfully",
    )


# ─── Offers CRUD ─────────────────────────────────────────────────────────────────

def _unique_offer_slug(db: Session, base_slug: str, exclude_id: int | None = None) -> str:
    slug = base_slug
    counter = 1
    while True:
        query = db.query(Offer).filter(Offer.slug == slug)
        if exclude_id:
            query = query.filter(Offer.id != exclude_id)
        if not query.first():
            return slug
        slug = f"{base_slug}-{counter}"
        counter += 1


@router.get("/offers", response_model=list[OfferResponse])
def admin_list_offers(
    search: str | None = Query(None),
    offer_type: str | None = Query(None),
    is_active: bool | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Offer)
    if offer_type:
        query = query.filter(Offer.offer_type == offer_type)
    if is_active is not None:
        query = query.filter(Offer.is_active == is_active)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                Offer.title.ilike(term),
                Offer.description.ilike(term),
                Offer.badge_text.ilike(term),
            )
        )
    return query.order_by(Offer.sort_order.asc(), Offer.id.desc()).all()


@router.post("/offers", response_model=OfferResponse, status_code=201)
def create_offer(payload: OfferCreate, db: Session = Depends(get_db)):
    base_slug = slugify(payload.slug or payload.title)
    if not base_slug:
        raise HTTPException(status_code=400, detail="Invalid title for slug")

    offer = Offer(
        **payload.model_dump(exclude={"slug"}),
        slug=_unique_offer_slug(db, base_slug),
    )
    db.add(offer)
    db.commit()
    db.refresh(offer)
    return offer


@router.put("/offers/{offer_id}", response_model=OfferResponse)
def update_offer(
    offer_id: int,
    payload: OfferUpdate,
    db: Session = Depends(get_db),
):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")

    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"]:
        data["slug"] = _unique_offer_slug(db, slugify(data["slug"]), exclude_id=offer_id)
    elif "title" in data and data["title"]:
        data["slug"] = _unique_offer_slug(db, slugify(data["title"]), exclude_id=offer_id)

    for field, value in data.items():
        setattr(offer, field, value)

    db.commit()
    db.refresh(offer)
    return offer


@router.delete("/offers/{offer_id}", response_model=MessageResponse)
def delete_offer(offer_id: int, db: Session = Depends(get_db)):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    storage_service.delete_media(offer.image_url)
    db.delete(offer)
    db.commit()
    return MessageResponse(message="Offer deleted successfully")


@router.post("/offers/{offer_id}/image", response_model=MediaUploadResponse)
async def upload_offer_image(
    offer_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")

    content = await file.read()
    media_type, media_url = storage_service.upload_offer_media(file, content)

    if offer.image_url:
        storage_service.delete_media(offer.image_url)

    offer.media_type = media_type
    offer.image_url = media_url
    db.commit()

    return MediaUploadResponse(
        media_type=media_type,
        media_url=media_url,
        message="Media uploaded successfully",
    )


@router.delete("/offers/{offer_id}/image", response_model=MessageResponse)
def delete_offer_image(offer_id: int, db: Session = Depends(get_db)):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    if not offer.image_url:
        raise HTTPException(status_code=404, detail="No media on this offer")

    storage_service.delete_media(offer.image_url)
    offer.image_url = None
    offer.media_type = None
    db.commit()
    return MessageResponse(message="Image removed successfully")


# ─── Careers (Jobs) ──────────────────────────────────────────────────────────────

def _unique_job_slug(db: Session, base_slug: str, exclude_id: int | None = None) -> str:
    slug = base_slug
    counter = 1
    while True:
        query = db.query(JobPosting).filter(JobPosting.slug == slug)
        if exclude_id:
            query = query.filter(JobPosting.id != exclude_id)
        if not query.first():
            return slug
        slug = f"{base_slug}-{counter}"
        counter += 1


@router.get("/careers", response_model=list[JobPostingResponse])
def admin_list_careers(
    search: str | None = Query(None),
    job_type: str | None = Query(None),
    is_active: bool | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(JobPosting)
    if job_type:
        query = query.filter(JobPosting.job_type == job_type)
    if is_active is not None:
        query = query.filter(JobPosting.is_active == is_active)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                JobPosting.title.ilike(term),
                JobPosting.description.ilike(term),
                JobPosting.location.ilike(term),
                JobPosting.requirements.ilike(term),
            )
        )
    return query.order_by(JobPosting.sort_order.asc(), JobPosting.id.desc()).all()


@router.post("/careers", response_model=JobPostingResponse, status_code=201)
def create_career(payload: JobPostingCreate, db: Session = Depends(get_db)):
    base_slug = slugify(payload.slug or payload.title)
    if not base_slug:
        raise HTTPException(status_code=400, detail="Invalid title for slug")

    job = JobPosting(
        **payload.model_dump(exclude={"slug"}),
        slug=_unique_job_slug(db, base_slug),
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.put("/careers/{job_id}", response_model=JobPostingResponse)
def update_career(
    job_id: int,
    payload: JobPostingUpdate,
    db: Session = Depends(get_db),
):
    job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"]:
        data["slug"] = _unique_job_slug(db, slugify(data["slug"]), exclude_id=job_id)
    elif "title" in data and data["title"]:
        data["slug"] = _unique_job_slug(db, slugify(data["title"]), exclude_id=job_id)

    for field, value in data.items():
        setattr(job, field, value)

    db.commit()
    db.refresh(job)
    return job


@router.delete("/careers/{job_id}", response_model=MessageResponse)
def delete_career(job_id: int, db: Session = Depends(get_db)):
    job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return MessageResponse(message="Job deleted successfully")


# ─── Job Applications ────────────────────────────────────────────────────────────

@router.get("/job-applications", response_model=list[JobApplicationResponse])
def list_job_applications(
    status: str | None = Query(None),
    job_id: int | None = Query(None),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(JobApplication)
    if status:
        query = query.filter(JobApplication.status == status)
    if job_id:
        query = query.filter(JobApplication.job_id == job_id)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                JobApplication.full_name.ilike(term),
                JobApplication.email.ilike(term),
                JobApplication.phone.ilike(term),
                JobApplication.job_title.ilike(term),
                JobApplication.admin_notes.ilike(term),
            )
        )
    return query.order_by(JobApplication.id.desc()).all()


@router.put("/job-applications/{application_id}/status", response_model=JobApplicationResponse)
def update_job_application_status(
    application_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    application = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    _update_status(application, payload)
    db.commit()
    db.refresh(application)
    return application


@router.delete("/job-applications/{application_id}", response_model=MessageResponse)
def delete_job_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(JobApplication).filter(JobApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")

    storage_service.delete_media(application.resume_url)
    db.delete(application)
    db.commit()
    return MessageResponse(message="Application deleted successfully")


# ─── Accreditations CRUD ───────────────────────────────────────────────────────

@router.get("/accreditations", response_model=list[AccreditationResponse])
def admin_list_accreditations(
    search: str | None = Query(None),
    is_active: bool | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Accreditation)
    if is_active is not None:
        query = query.filter(Accreditation.is_active == is_active)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(Accreditation.title.ilike(term))
    return query.order_by(Accreditation.sort_order.asc(), Accreditation.id.desc()).all()


@router.post("/accreditations", response_model=AccreditationResponse, status_code=201)
def create_accreditation(payload: AccreditationCreate, db: Session = Depends(get_db)):
    accreditation = Accreditation(**payload.model_dump())
    db.add(accreditation)
    db.commit()
    db.refresh(accreditation)
    return accreditation


@router.put("/accreditations/{accreditation_id}", response_model=AccreditationResponse)
def update_accreditation(
    accreditation_id: int,
    payload: AccreditationUpdate,
    db: Session = Depends(get_db),
):
    accreditation = db.query(Accreditation).filter(Accreditation.id == accreditation_id).first()
    if not accreditation:
        raise HTTPException(status_code=404, detail="Accreditation not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(accreditation, field, value)

    db.commit()
    db.refresh(accreditation)
    return accreditation


@router.delete("/accreditations/{accreditation_id}", response_model=MessageResponse)
def delete_accreditation(accreditation_id: int, db: Session = Depends(get_db)):
    accreditation = db.query(Accreditation).filter(Accreditation.id == accreditation_id).first()
    if not accreditation:
        raise HTTPException(status_code=404, detail="Accreditation not found")
    storage_service.delete_media(accreditation.image_url)
    db.delete(accreditation)
    db.commit()
    return MessageResponse(message="Accreditation deleted successfully")


@router.post("/accreditations/{accreditation_id}/image", response_model=ImageUploadResponse)
async def upload_accreditation_image(
    accreditation_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    accreditation = db.query(Accreditation).filter(Accreditation.id == accreditation_id).first()
    if not accreditation:
        raise HTTPException(status_code=404, detail="Accreditation not found")

    content = await file.read()
    image_url = storage_service.upload_accreditation_image(file, content)

    if accreditation.image_url:
        storage_service.delete_media(accreditation.image_url)

    accreditation.image_url = image_url
    db.commit()
    db.refresh(accreditation)
    return ImageUploadResponse(image_url=image_url, message="Accreditation image uploaded")


@router.delete("/accreditations/{accreditation_id}/image", response_model=MessageResponse)
def delete_accreditation_image(accreditation_id: int, db: Session = Depends(get_db)):
    accreditation = db.query(Accreditation).filter(Accreditation.id == accreditation_id).first()
    if not accreditation:
        raise HTTPException(status_code=404, detail="Accreditation not found")
    if not accreditation.image_url:
        raise HTTPException(status_code=404, detail="No image on this accreditation")

    storage_service.delete_media(accreditation.image_url)
    accreditation.image_url = None
    db.commit()
    return MessageResponse(message="Accreditation image removed")


# ─── Tourist Visa Countries CRUD ───────────────────────────────────────────────

def _apply_search_visa_enquiry(query, search: str):
    term = f"%{search.lower()}%"
    return query.filter(
        or_(
            TouristVisaEnquiry.first_name.ilike(term),
            TouristVisaEnquiry.last_name.ilike(term),
            TouristVisaEnquiry.email.ilike(term),
            TouristVisaEnquiry.phone.ilike(term),
            TouristVisaEnquiry.country_name.ilike(term),
            TouristVisaEnquiry.country_slug.ilike(term),
            TouristVisaEnquiry.purpose.ilike(term),
            TouristVisaEnquiry.message.ilike(term),
            TouristVisaEnquiry.admin_notes.ilike(term),
        )
    )


@router.get("/tourist-visa-countries", response_model=list[TouristVisaCountryResponse])
def admin_list_tourist_visa_countries(
    is_active: bool | None = Query(None),
    search: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(TouristVisaCountry)
    if is_active is not None:
        query = query.filter(TouristVisaCountry.is_active == is_active)
    if search:
        term = f"%{search.lower()}%"
        query = query.filter(
            or_(
                TouristVisaCountry.country_name.ilike(term),
                TouristVisaCountry.country_slug.ilike(term),
                TouristVisaCountry.hero_title.ilike(term),
            )
        )
    return query.order_by(TouristVisaCountry.sort_order.asc(), TouristVisaCountry.country_name.asc()).all()


@router.post("/tourist-visa-countries", response_model=TouristVisaCountryResponse, status_code=201)
def create_tourist_visa_country(payload: TouristVisaCountryCreate, db: Session = Depends(get_db)):
    existing = db.query(TouristVisaCountry).filter(TouristVisaCountry.country_slug == payload.country_slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Country slug already exists")
    country = TouristVisaCountry(**payload.model_dump())
    db.add(country)
    db.commit()
    db.refresh(country)
    return country


@router.put("/tourist-visa-countries/{country_id}", response_model=TouristVisaCountryResponse)
def update_tourist_visa_country(
    country_id: int,
    payload: TouristVisaCountryUpdate,
    db: Session = Depends(get_db),
):
    country = db.query(TouristVisaCountry).filter(TouristVisaCountry.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Tourist visa country not found")

    if payload.country_slug and payload.country_slug != country.country_slug:
        clash = db.query(TouristVisaCountry).filter(TouristVisaCountry.country_slug == payload.country_slug).first()
        if clash:
            raise HTTPException(status_code=400, detail="Country slug already exists")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(country, field, value)

    db.commit()
    db.refresh(country)
    return country


@router.delete("/tourist-visa-countries/{country_id}", response_model=MessageResponse)
def delete_tourist_visa_country(country_id: int, db: Session = Depends(get_db)):
    country = db.query(TouristVisaCountry).filter(TouristVisaCountry.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Tourist visa country not found")
    if country.hero_image_url:
        storage_service.delete_media(country.hero_image_url)
    db.delete(country)
    db.commit()
    return MessageResponse(message="Tourist visa country deleted successfully")


@router.post("/tourist-visa-countries/{country_id}/hero-image", response_model=ImageUploadResponse)
async def upload_tourist_visa_hero_image(
    country_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    country = db.query(TouristVisaCountry).filter(TouristVisaCountry.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Tourist visa country not found")

    content = await file.read()
    image_url = storage_service.upload_tourist_visa_image(file, content)

    if country.hero_image_url:
        storage_service.delete_media(country.hero_image_url)

    country.hero_image_url = image_url
    db.commit()
    db.refresh(country)
    return ImageUploadResponse(image_url=image_url, message="Hero image uploaded")


@router.delete("/tourist-visa-countries/{country_id}/hero-image", response_model=MessageResponse)
def delete_tourist_visa_hero_image(country_id: int, db: Session = Depends(get_db)):
    country = db.query(TouristVisaCountry).filter(TouristVisaCountry.id == country_id).first()
    if not country:
        raise HTTPException(status_code=404, detail="Tourist visa country not found")
    if not country.hero_image_url:
        raise HTTPException(status_code=404, detail="No hero image on this country")

    storage_service.delete_media(country.hero_image_url)
    country.hero_image_url = None
    db.commit()
    return MessageResponse(message="Hero image removed")


# ─── Tourist Visa Enquiries ────────────────────────────────────────────────────

@router.get("/tourist-visa-enquiries", response_model=list[TouristVisaEnquiryResponse])
def list_tourist_visa_enquiries(
    status: str | None = Query(None),
    search: str | None = Query(None),
    country_slug: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(TouristVisaEnquiry)
    if status:
        query = query.filter(TouristVisaEnquiry.status == status)
    if country_slug:
        query = query.filter(TouristVisaEnquiry.country_slug == country_slug)
    if search:
        query = _apply_search_visa_enquiry(query, search)
    return query.order_by(TouristVisaEnquiry.created_at.desc()).all()


@router.patch("/tourist-visa-enquiries/{enquiry_id}", response_model=TouristVisaEnquiryResponse)
def update_tourist_visa_enquiry_status(
    enquiry_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    record = db.query(TouristVisaEnquiry).filter(TouristVisaEnquiry.id == enquiry_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Tourist visa enquiry not found")
    _update_status(record, payload)
    db.commit()
    db.refresh(record)
    return record
