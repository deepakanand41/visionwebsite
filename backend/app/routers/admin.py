from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.auth import verify_admin_secret
from app.constants import ALL_STATUSES, SUBMISSION_STATUSES
from app.database import get_db
from app.models import Enquiry, DemoClassBooking, ReferralApplication, EducationLoanRequest, Testimonial
from app.schemas import (
    EnquiryResponse,
    DemoClassResponse,
    ReferralResponse,
    EducationLoanResponse,
    TestimonialCreate,
    TestimonialUpdate,
    TestimonialResponse,
    StatusUpdate,
    MessageResponse,
)

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

    db.delete(testimonial)
    db.commit()
    return MessageResponse(message="Testimonial deleted successfully")
