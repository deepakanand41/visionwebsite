from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ExamBooking
from app.schemas import ExamBookingCreate, MessageResponse
from app.services.email_service import notify_form_submission

router = APIRouter(prefix="/api", tags=["Exam Booking"])


@router.post("/exam-booking", response_model=MessageResponse, status_code=201)
def book_exam(payload: ExamBookingCreate, db: Session = Depends(get_db)):
    booking = ExamBooking(
        exam_type=payload.examType.lower(),
        first_name=payload.firstName,
        last_name=payload.lastName,
        email=payload.email,
        phone=payload.phone,
        exam_format=payload.examFormat,
        exam_date=payload.examDate,
        preferred_city=payload.preferredCity,
        notes=payload.notes,
        accept_terms=bool(payload.acceptTerms),
        contact_permission=bool(payload.contactPermission),
    )
    db.add(booking)
    db.commit()

    label = payload.examType.upper()
    notify_form_submission(
        f"{label} Exam Booking",
        {
            "Name": f"{payload.firstName} {payload.lastName}",
            "Email": payload.email,
            "Phone": payload.phone,
            "Exam Type": label,
            "Exam Format": payload.examFormat,
            "Preferred Date": payload.examDate,
            "Preferred City": payload.preferredCity,
            "Notes": payload.notes,
            "Contact Permission": payload.contactPermission,
        },
        submitter_email=str(payload.email),
    )
    return MessageResponse(
        message=f"Your {label} exam booking enquiry has been submitted! Our team will contact you within 24 hours."
    )
