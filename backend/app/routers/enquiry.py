from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Enquiry
from app.schemas import EnquiryCreate, EnquiryResponse, MessageResponse

router = APIRouter(prefix="/api", tags=["Enquiry"])


@router.post("/enquiry", response_model=MessageResponse, status_code=201)
def submit_enquiry(payload: EnquiryCreate, db: Session = Depends(get_db)):
    enquiry = Enquiry(
        first_name=payload.firstName,
        last_name=payload.lastName,
        email=payload.email,
        phone=payload.phone,
        destination=payload.destination,
        study_level=payload.studyLevel,
        intake=payload.intake,
        counselling_mode=payload.counsellingMode,
        funding_source=payload.fundingSource,
        accept_terms=bool(payload.acceptTerms),
        contact_permission=bool(payload.contactPermission),
    )
    db.add(enquiry)
    db.commit()
    return MessageResponse(
        message="Enquiry submitted successfully. Our counsellor will contact you within 24 hours."
    )
