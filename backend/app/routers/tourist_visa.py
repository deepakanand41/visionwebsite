from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import TouristVisaCountry, TouristVisaEnquiry
from app.schemas import (
    MessageResponse,
    TouristVisaCountryResponse,
    TouristVisaEnquiryCreate,
)
from app.services.email_service import notify_form_submission

router = APIRouter(prefix="/api", tags=["Tourist Visa"])


@router.get("/tourist-visa", response_model=list[TouristVisaCountryResponse])
def list_tourist_visa_countries(db: Session = Depends(get_db)):
    return (
        db.query(TouristVisaCountry)
        .filter(TouristVisaCountry.is_active == True)
        .order_by(TouristVisaCountry.sort_order.asc(), TouristVisaCountry.country_name.asc())
        .all()
    )


@router.get("/tourist-visa/{slug}", response_model=TouristVisaCountryResponse)
def get_tourist_visa_country(slug: str, db: Session = Depends(get_db)):
    country = (
        db.query(TouristVisaCountry)
        .filter(TouristVisaCountry.country_slug == slug, TouristVisaCountry.is_active == True)
        .first()
    )
    if not country:
        raise HTTPException(status_code=404, detail="Tourist visa country not found")
    return country


@router.post("/tourist-visa/enquiry", response_model=MessageResponse, status_code=201)
def submit_tourist_visa_enquiry(payload: TouristVisaEnquiryCreate, db: Session = Depends(get_db)):
    enquiry = TouristVisaEnquiry(
        country_slug=payload.countrySlug,
        country_name=payload.countryName,
        first_name=payload.firstName,
        last_name=payload.lastName,
        email=payload.email,
        phone=payload.phone,
        travel_date=payload.travelDate,
        purpose=payload.purpose,
        message=payload.message,
        accept_terms=bool(payload.acceptTerms),
        contact_permission=bool(payload.contactPermission),
    )
    db.add(enquiry)
    db.commit()

    notify_form_submission(
        f"Tourist Visa Enquiry — {payload.countryName}",
        {
            "Name": f"{payload.firstName} {payload.lastName}",
            "Email": payload.email,
            "Phone": payload.phone,
            "Country": payload.countryName,
            "Travel Date": payload.travelDate,
            "Purpose": payload.purpose,
            "Message": payload.message,
            "Contact Permission": payload.contactPermission,
        },
        submitter_email=str(payload.email),
    )

    return MessageResponse(
        message=f"Your tourist visa enquiry for {payload.countryName} has been submitted! Our team will contact you within 24 hours."
    )
