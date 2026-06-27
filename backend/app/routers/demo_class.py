from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import DemoClassBooking
from app.schemas import DemoClassCreate, MessageResponse
from app.services.email_service import notify_form_submission

router = APIRouter(prefix="/api", tags=["Demo Class"])


@router.post("/demo-class", response_model=MessageResponse, status_code=201)
def book_demo_class(payload: DemoClassCreate, db: Session = Depends(get_db)):
    booking = DemoClassBooking(
        exam_type=payload.examType.lower(),
        full_name=payload.fullName,
        email=payload.email,
        phone=payload.phone,
        target_score=payload.targetScore,
        batch=payload.batch,
        mode=payload.mode,
        demo_date=payload.demoDate,
        message=payload.message,
    )
    db.add(booking)
    db.commit()
    notify_form_submission(
        f"{payload.examType.upper()} Demo Class Booking",
        {
            "Name": payload.fullName,
            "Email": payload.email,
            "Phone": payload.phone,
            "Exam Type": payload.examType.upper(),
            "Target Score": payload.targetScore,
            "Batch": payload.batch,
            "Mode": payload.mode,
            "Demo Date": payload.demoDate,
            "Message": payload.message,
        },
        submitter_email=str(payload.email),
    )
    return MessageResponse(
        message=f"Your {payload.examType.upper()} demo class has been booked! We'll contact you within 24 hours."
    )
