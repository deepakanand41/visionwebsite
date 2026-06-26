from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, Integer, String, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class Enquiry(Base):
    __tablename__ = "enquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(20))
    destination: Mapped[str] = mapped_column(String(100))
    study_level: Mapped[str] = mapped_column(String(100))
    intake: Mapped[str] = mapped_column(String(50))
    counselling_mode: Mapped[str] = mapped_column(String(100))
    funding_source: Mapped[str] = mapped_column(String(100))
    accept_terms: Mapped[bool] = mapped_column(Boolean, default=True)
    contact_permission: Mapped[bool] = mapped_column(Boolean, default=False)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class DemoClassBooking(Base):
    __tablename__ = "demo_class_bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    exam_type: Mapped[str] = mapped_column(String(10), index=True)  # ielts | pte
    full_name: Mapped[str] = mapped_column(String(150))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(20))
    target_score: Mapped[str] = mapped_column(String(50))
    batch: Mapped[str] = mapped_column(String(100))
    mode: Mapped[str] = mapped_column(String(50))
    demo_date: Mapped[str] = mapped_column(String(20))
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class ExamBooking(Base):
    __tablename__ = "exam_bookings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    exam_type: Mapped[str] = mapped_column(String(10), index=True)  # ielts | pte
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(20))
    exam_format: Mapped[str] = mapped_column(String(120))
    exam_date: Mapped[str] = mapped_column(String(20))
    preferred_city: Mapped[str] = mapped_column(String(100))
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    accept_terms: Mapped[bool] = mapped_column(Boolean, default=True)
    contact_permission: Mapped[bool] = mapped_column(Boolean, default=False)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class ReferralApplication(Base):
    __tablename__ = "referral_applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(150))
    mobile: Mapped[str] = mapped_column(String(20))
    whatsapp: Mapped[str | None] = mapped_column(String(20), nullable=True)
    email: Mapped[str] = mapped_column(String(255), index=True)
    date_of_birth: Mapped[str | None] = mapped_column(String(20), nullable=True)
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    country: Mapped[str] = mapped_column(String(100))
    occupation: Mapped[str] = mapped_column(String(100))
    organization: Mapped[str | None] = mapped_column(String(200), nullable=True)
    experience: Mapped[str | None] = mapped_column(String(50), nullable=True)
    referral_methods: Mapped[list] = mapped_column(JSON, default=list)
    monthly_referrals: Mapped[str] = mapped_column(String(20))
    account_holder: Mapped[str | None] = mapped_column(String(150), nullable=True)
    bank_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    upi_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    accept_terms: Mapped[bool] = mapped_column(Boolean, default=True)
    contact_permission: Mapped[bool] = mapped_column(Boolean, default=False)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class EducationLoanRequest(Base):
    __tablename__ = "education_loan_requests"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(150))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(20))
    destination: Mapped[str] = mapped_column(String(100))
    university: Mapped[str | None] = mapped_column(String(200), nullable=True)
    course_program: Mapped[str] = mapped_column(String(200))
    study_level: Mapped[str] = mapped_column(String(100))
    loan_type: Mapped[str] = mapped_column(String(100))
    loan_amount: Mapped[str] = mapped_column(String(100))
    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str] = mapped_column(String(100))
    co_applicant_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    monthly_income: Mapped[str | None] = mapped_column(String(50), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class Testimonial(Base):
    __tablename__ = "testimonials"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(150))
    destination: Mapped[str] = mapped_column(String(100))
    university: Mapped[str] = mapped_column(String(200))
    course: Mapped[str] = mapped_column(String(150))
    review: Mapped[str] = mapped_column(Text)
    rating: Mapped[int] = mapped_column(Integer, default=5)
    avatar_color: Mapped[str] = mapped_column(String(20), default="#fde9d1")
    initial: Mapped[str] = mapped_column(String(5))
    highlight: Mapped[str | None] = mapped_column(String(200), nullable=True)
    media_type: Mapped[str | None] = mapped_column(String(10), nullable=True)
    media_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class ContentPost(Base):
    __tablename__ = "content_posts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    content_type: Mapped[str] = mapped_column(String(20), index=True)  # news | blog
    title: Mapped[str] = mapped_column(String(250))
    slug: Mapped[str] = mapped_column(String(280), unique=True, index=True)
    excerpt: Mapped[str | None] = mapped_column(String(500), nullable=True)
    body: Mapped[str] = mapped_column(Text)
    cover_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    author: Mapped[str] = mapped_column(String(120), default="Vision Team")
    category: Mapped[str | None] = mapped_column(String(100), nullable=True)
    meta_keywords: Mapped[str | None] = mapped_column(String(500), nullable=True)
    faqs: Mapped[list | None] = mapped_column(JSON, nullable=True)
    show_toc: Mapped[bool] = mapped_column(Boolean, default=True)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class Offer(Base):
    __tablename__ = "offers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True)
    description: Mapped[str] = mapped_column(Text)
    offer_type: Mapped[str] = mapped_column(String(50), index=True)
    badge_text: Mapped[str | None] = mapped_column(String(50), nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    media_type: Mapped[str | None] = mapped_column(String(10), nullable=True)  # image | video
    terms: Mapped[str | None] = mapped_column(Text, nullable=True)
    cta_label: Mapped[str] = mapped_column(String(80), default="Claim Offer")
    cta_link: Mapped[str] = mapped_column(String(300), default="/contact-us")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    valid_until: Mapped[str | None] = mapped_column(String(30), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class Accreditation(Base):
    __tablename__ = "accreditations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), default="Accreditation")
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class TouristVisaCountry(Base):
    __tablename__ = "tourist_visa_countries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    country_slug: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    country_name: Mapped[str] = mapped_column(String(120))
    flag: Mapped[str | None] = mapped_column(String(10), nullable=True)
    hero_title: Mapped[str | None] = mapped_column(String(250), nullable=True)
    hero_subtitle: Mapped[str | None] = mapped_column(String(500), nullable=True)
    hero_image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    visa_process: Mapped[str | None] = mapped_column(Text, nullable=True)
    visa_eligibility: Mapped[str | None] = mapped_column(Text, nullable=True)
    faqs: Mapped[list | None] = mapped_column(JSON, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class TouristVisaEnquiry(Base):
    __tablename__ = "tourist_visa_enquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    country_slug: Mapped[str] = mapped_column(String(80), index=True)
    country_name: Mapped[str] = mapped_column(String(120))
    first_name: Mapped[str] = mapped_column(String(100))
    last_name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(20))
    travel_date: Mapped[str | None] = mapped_column(String(20), nullable=True)
    purpose: Mapped[str | None] = mapped_column(String(200), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    accept_terms: Mapped[bool] = mapped_column(Boolean, default=True)
    contact_permission: Mapped[bool] = mapped_column(Boolean, default=False)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)


class JobPosting(Base):
    __tablename__ = "job_postings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    slug: Mapped[str] = mapped_column(String(220), unique=True, index=True)
    job_type: Mapped[str] = mapped_column(String(50), index=True)
    employment_type: Mapped[str] = mapped_column(String(30), default="full_time")
    location: Mapped[str] = mapped_column(String(150))
    experience_required: Mapped[str | None] = mapped_column(String(100), nullable=True)
    salary_range: Mapped[str | None] = mapped_column(String(100), nullable=True)
    description: Mapped[str] = mapped_column(Text)
    requirements: Mapped[str] = mapped_column(Text)
    responsibilities: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class JobApplication(Base):
    __tablename__ = "job_applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    job_id: Mapped[int] = mapped_column(Integer, index=True)
    job_title: Mapped[str] = mapped_column(String(200))
    full_name: Mapped[str] = mapped_column(String(150))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[str] = mapped_column(String(20))
    current_city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    current_role: Mapped[str | None] = mapped_column(String(150), nullable=True)
    experience_years: Mapped[str | None] = mapped_column(String(50), nullable=True)
    linkedin_url: Mapped[str | None] = mapped_column(String(300), nullable=True)
    cover_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    resume_url: Mapped[str] = mapped_column(String(500))
    resume_filename: Mapped[str | None] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="pending", index=True)
    admin_notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)
