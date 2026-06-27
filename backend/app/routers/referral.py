from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ReferralApplication
from app.schemas import ReferralCreate, MessageResponse
from app.services.email_service import notify_form_submission

router = APIRouter(prefix="/api", tags=["Referral"])


@router.post("/referral", response_model=MessageResponse, status_code=201)
def submit_referral(payload: ReferralCreate, db: Session = Depends(get_db)):
    application = ReferralApplication(
        full_name=payload.fullName,
        mobile=payload.mobile,
        whatsapp=payload.whatsapp,
        email=payload.email,
        date_of_birth=payload.dob,
        city=payload.city,
        state=payload.state,
        country=payload.country,
        occupation=payload.occupation,
        organization=payload.organization,
        experience=payload.experience,
        referral_methods=payload.referralMethods,
        monthly_referrals=payload.monthlyReferrals,
        account_holder=payload.accountHolder,
        bank_name=payload.bankName,
        upi_id=payload.upiId,
        accept_terms=bool(payload.decAccurate and payload.decTerms),
        contact_permission=bool(payload.decContact),
    )
    db.add(application)
    db.commit()
    notify_form_submission(
        "Refer & Earn Application",
        {
            "Name": payload.fullName,
            "Email": payload.email,
            "Mobile": payload.mobile,
            "WhatsApp": payload.whatsapp,
            "Date of Birth": payload.dob,
            "City": payload.city,
            "State": payload.state,
            "Country": payload.country,
            "Occupation": payload.occupation,
            "Organization": payload.organization,
            "Experience": payload.experience,
            "Referral Methods": ", ".join(payload.referralMethods or []),
            "Monthly Referrals": payload.monthlyReferrals,
            "Account Holder": payload.accountHolder,
            "Bank Name": payload.bankName,
            "UPI ID": payload.upiId,
            "Contact Permission": payload.decContact,
        },
        submitter_email=str(payload.email),
    )
    return MessageResponse(
        message="Application submitted successfully! Our team will contact you within 24-48 hours."
    )
