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
    media_type: Optional[str] = None
    media_url: Optional[str] = None


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
    media_type: Optional[str] = None
    media_url: Optional[str] = None


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
    media_type: Optional[str] = None
    media_url: Optional[str] = None
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class MediaUploadResponse(BaseModel):
    media_type: str
    media_url: str
    message: str


class MessageResponse(BaseModel):
    message: str


# ─── News & Blog ───────────────────────────────────────────────────────────────

class ContentPostCreate(BaseModel):
    content_type: str = Field(..., pattern="^(news|blog)$")
    title: str = Field(..., min_length=3, max_length=250)
    slug: Optional[str] = Field(None, max_length=280)
    excerpt: Optional[str] = Field(None, max_length=500)
    body: str = Field(..., min_length=10)
    cover_image_url: Optional[str] = Field(None, max_length=500)
    author: str = Field(default="Vision Team", max_length=120)
    category: Optional[str] = Field(None, max_length=100)
    is_published: bool = False
    is_featured: bool = False


class ContentPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=250)
    slug: Optional[str] = Field(None, max_length=280)
    excerpt: Optional[str] = Field(None, max_length=500)
    body: Optional[str] = Field(None, min_length=10)
    cover_image_url: Optional[str] = Field(None, max_length=500)
    author: Optional[str] = Field(None, max_length=120)
    category: Optional[str] = Field(None, max_length=100)
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None


class ContentPostResponse(BaseModel):
    id: int
    content_type: str
    title: str
    slug: str
    excerpt: Optional[str]
    body: str
    cover_image_url: Optional[str]
    author: str
    category: Optional[str]
    is_published: bool
    is_featured: bool
    published_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ContentPostPublicResponse(BaseModel):
    id: int
    content_type: str
    title: str
    slug: str
    excerpt: Optional[str]
    body: str
    cover_image_url: Optional[str]
    author: str
    category: Optional[str]
    is_featured: bool
    published_at: Optional[datetime]
    created_at: datetime

    model_config = {"from_attributes": True}


# ─── Offers ────────────────────────────────────────────────────────────────────

OFFER_TYPES = ("laptop", "scholarship", "test_prep", "visa", "gadget", "financial", "other")


class OfferCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    slug: Optional[str] = Field(None, max_length=220)
    description: str = Field(..., min_length=10)
    offer_type: str = Field(..., pattern="^(laptop|scholarship|test_prep|visa|gadget|financial|other)$")
    badge_text: Optional[str] = Field(None, max_length=50)
    image_url: Optional[str] = Field(None, max_length=500)
    media_type: Optional[str] = Field(None, max_length=10)
    terms: Optional[str] = None
    cta_label: str = Field(default="Claim Offer", max_length=80)
    cta_link: str = Field(default="/contact-us", max_length=300)
    is_active: bool = True
    is_featured: bool = False
    sort_order: int = 0
    valid_until: Optional[str] = Field(None, max_length=30)


class OfferUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=200)
    slug: Optional[str] = Field(None, max_length=220)
    description: Optional[str] = Field(None, min_length=10)
    offer_type: Optional[str] = Field(None, pattern="^(laptop|scholarship|test_prep|visa|gadget|financial|other)$")
    badge_text: Optional[str] = Field(None, max_length=50)
    image_url: Optional[str] = Field(None, max_length=500)
    media_type: Optional[str] = Field(None, max_length=10)
    terms: Optional[str] = None
    cta_label: Optional[str] = Field(None, max_length=80)
    cta_link: Optional[str] = Field(None, max_length=300)
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    sort_order: Optional[int] = None
    valid_until: Optional[str] = Field(None, max_length=30)


class OfferResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    offer_type: str
    badge_text: Optional[str]
    image_url: Optional[str]
    media_type: Optional[str] = None
    terms: Optional[str]
    cta_label: str
    cta_link: str
    is_active: bool
    is_featured: bool
    sort_order: int
    valid_until: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class OfferPublicResponse(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    offer_type: str
    badge_text: Optional[str]
    image_url: Optional[str]
    media_type: Optional[str] = None
    terms: Optional[str]
    cta_label: str
    cta_link: str
    is_featured: bool
    sort_order: int
    valid_until: Optional[str]

    model_config = {"from_attributes": True}


class ImageUploadResponse(BaseModel):
    image_url: str
    message: str


# ─── Careers ─────────────────────────────────────────────────────────────────────

JOB_TYPES = (
    "counselling",
    "sales",
    "marketing",
    "operations",
    "finance",
    "hr",
    "it",
    "test_prep",
    "visa",
    "management",
    "other",
)

EMPLOYMENT_TYPES = ("full_time", "part_time", "contract", "internship")


class JobPostingCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    slug: Optional[str] = Field(None, max_length=220)
    job_type: str = Field(
        ...,
        pattern="^(counselling|sales|marketing|operations|finance|hr|it|test_prep|visa|management|other)$",
    )
    employment_type: str = Field(default="full_time", pattern="^(full_time|part_time|contract|internship)$")
    location: str = Field(..., min_length=2, max_length=150)
    experience_required: Optional[str] = Field(None, max_length=100)
    salary_range: Optional[str] = Field(None, max_length=100)
    description: str = Field(..., min_length=20)
    requirements: str = Field(..., min_length=10)
    responsibilities: Optional[str] = None
    is_active: bool = True
    sort_order: int = 0


class JobPostingUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=200)
    slug: Optional[str] = Field(None, max_length=220)
    job_type: Optional[str] = Field(
        None,
        pattern="^(counselling|sales|marketing|operations|finance|hr|it|test_prep|visa|management|other)$",
    )
    employment_type: Optional[str] = Field(None, pattern="^(full_time|part_time|contract|internship)$")
    location: Optional[str] = Field(None, min_length=2, max_length=150)
    experience_required: Optional[str] = Field(None, max_length=100)
    salary_range: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = Field(None, min_length=20)
    requirements: Optional[str] = Field(None, min_length=10)
    responsibilities: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class JobPostingResponse(BaseModel):
    id: int
    title: str
    slug: str
    job_type: str
    employment_type: str
    location: str
    experience_required: Optional[str]
    salary_range: Optional[str]
    description: str
    requirements: str
    responsibilities: Optional[str]
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class JobPostingPublicResponse(BaseModel):
    id: int
    title: str
    slug: str
    job_type: str
    employment_type: str
    location: str
    experience_required: Optional[str]
    salary_range: Optional[str]
    description: str
    requirements: str
    responsibilities: Optional[str]
    sort_order: int

    model_config = {"from_attributes": True}


class JobApplicationResponse(BaseModel):
    id: int
    job_id: int
    job_title: str
    full_name: str
    email: str
    phone: str
    current_city: Optional[str]
    current_role: Optional[str]
    experience_years: Optional[str]
    linkedin_url: Optional[str]
    cover_message: Optional[str]
    resume_url: str
    resume_filename: Optional[str]
    status: str
    admin_notes: Optional[str]
    status_updated_at: Optional[datetime]
    created_at: datetime

    model_config = {"from_attributes": True}


class ResumeUploadResponse(BaseModel):
    resume_url: str
    resume_filename: str
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
