from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# ─── Enquiry ───────────────────────────────────────────────────────────────────

class EnquiryCreate(BaseModel):
    firstName: str = Field(..., min_length=2, max_length=100)
    lastName: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    destination: str
    studyLevel: str
    intake: str
    counsellingMode: str
    fundingSource: str
    acceptTerms: Optional[bool] = True
    contactPermission: Optional[bool] = False


class EnquiryResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    destination: str
    study_level: str
    intake: str
    counselling_mode: str
    funding_source: str
    accept_terms: bool
    contact_permission: bool
    status: str
    admin_notes: Optional[str] = None
    status_updated_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Demo Class ────────────────────────────────────────────────────────────────

class DemoClassCreate(BaseModel):
    examType: str = Field(..., pattern="^(ielts|pte)$")
    fullName: str = Field(..., min_length=3, max_length=150)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    targetScore: str
    batch: str
    mode: str
    demoDate: str
    message: Optional[str] = None


class DemoClassResponse(BaseModel):
    id: int
    exam_type: str
    full_name: str
    email: str
    phone: str
    target_score: str
    batch: str
    mode: str
    demo_date: str
    message: Optional[str]
    status: str
    admin_notes: Optional[str] = None
    status_updated_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Referral ──────────────────────────────────────────────────────────────────

class ReferralCreate(BaseModel):
    fullName: str = Field(..., min_length=3, max_length=150)
    mobile: str = Field(..., min_length=8, max_length=20)
    whatsapp: Optional[str] = None
    email: EmailStr
    dob: Optional[str] = None
    city: str
    state: str
    country: str
    occupation: str
    organization: Optional[str] = None
    experience: Optional[str] = None
    referralMethods: list[str] = Field(..., min_length=1)
    monthlyReferrals: str
    accountHolder: Optional[str] = None
    bankName: Optional[str] = None
    upiId: Optional[str] = None
    decAccurate: Optional[bool] = True
    decTerms: Optional[bool] = True
    decContact: Optional[bool] = False


class ReferralResponse(BaseModel):
    id: int
    full_name: str
    mobile: str
    whatsapp: Optional[str]
    email: str
    date_of_birth: Optional[str]
    city: str
    state: str
    country: str
    occupation: str
    organization: Optional[str]
    experience: Optional[str]
    referral_methods: list
    monthly_referrals: str
    account_holder: Optional[str]
    bank_name: Optional[str]
    upi_id: Optional[str]
    accept_terms: bool
    contact_permission: bool
    status: str
    admin_notes: Optional[str] = None
    status_updated_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class StatusUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = None


# ─── Testimonials ──────────────────────────────────────────────────────────────

class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    destination: str
    university: str
    course: str
    review: str = Field(..., min_length=10)
    rating: int = Field(default=5, ge=1, le=5)
    avatar_color: str = "#fde9d1"
    initial: str = Field(..., min_length=1, max_length=5)
    highlight: Optional[str] = None
    is_active: bool = True
    sort_order: int = 0


class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    destination: Optional[str] = None
    university: Optional[str] = None
    course: Optional[str] = None
    review: Optional[str] = None
    rating: Optional[int] = Field(default=None, ge=1, le=5)
    avatar_color: Optional[str] = None
    initial: Optional[str] = None
    highlight: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class TestimonialResponse(BaseModel):
    id: int
    name: str
    destination: str
    university: str
    course: str
    review: str
    rating: int
    avatar_color: str
    initial: str
    highlight: Optional[str]
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class MessageResponse(BaseModel):
    message: str


# ─── Education Loan ────────────────────────────────────────────────────────────

class EducationLoanCreate(BaseModel):
    fullName: str = Field(..., min_length=3, max_length=150)
    email: EmailStr
    phone: str = Field(..., min_length=8, max_length=20)
    destination: str
    university: Optional[str] = None
    courseProgram: str = Field(..., min_length=2, max_length=200)
    studyLevel: str
    loanType: str
    loanAmount: str
    city: str = Field(..., min_length=2, max_length=100)
    state: str = Field(..., min_length=2, max_length=100)
    coApplicantName: Optional[str] = None
    monthlyIncome: Optional[str] = None
    message: Optional[str] = None


class EducationLoanResponse(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    destination: str
    university: Optional[str]
    course_program: str
    study_level: str
    loan_type: str
    loan_amount: str
    city: str
    state: str
    co_applicant_name: Optional[str]
    monthly_income: Optional[str]
    message: Optional[str]
    status: str
    admin_notes: Optional[str] = None
    status_updated_at: Optional[datetime] = None
    created_at: datetime

    model_config = {"from_attributes": True}
