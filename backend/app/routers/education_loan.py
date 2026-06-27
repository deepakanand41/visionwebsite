from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import EducationLoanRequest
from app.schemas import EducationLoanCreate, MessageResponse
from app.services.email_service import notify_form_submission

router = APIRouter(prefix="/api", tags=["Education Loan"])


@router.post("/education-loan", response_model=MessageResponse, status_code=201)
def submit_education_loan(payload: EducationLoanCreate, db: Session = Depends(get_db)):
    request = EducationLoanRequest(
        full_name=payload.fullName,
        email=payload.email,
        phone=payload.phone,
        destination=payload.destination,
        university=payload.university,
        course_program=payload.courseProgram,
        study_level=payload.studyLevel,
        loan_type=payload.loanType,
        loan_amount=payload.loanAmount,
        city=payload.city,
        state=payload.state,
        co_applicant_name=payload.coApplicantName,
        monthly_income=payload.monthlyIncome,
        message=payload.message,
    )
    db.add(request)
    db.commit()
    notify_form_submission(
        "Education Loan Request",
        {
            "Name": payload.fullName,
            "Email": payload.email,
            "Phone": payload.phone,
            "Destination": payload.destination,
            "University": payload.university,
            "Course / Program": payload.courseProgram,
            "Study Level": payload.studyLevel,
            "Loan Type": payload.loanType,
            "Loan Amount": payload.loanAmount,
            "City": payload.city,
            "State": payload.state,
            "Co-applicant": payload.coApplicantName,
            "Monthly Income": payload.monthlyIncome,
            "Message": payload.message,
        },
        submitter_email=str(payload.email),
    )
    return MessageResponse(
        message="Your education loan request has been submitted! Our loan counsellor will contact you within 24 hours."
    )
