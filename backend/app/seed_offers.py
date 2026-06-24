from app.database import SessionLocal
from app.models import Offer

SEED_OFFERS = [
    {
        "title": "Free Laptop for Enrolled Students",
        "slug": "free-laptop-students",
        "description": "Enrol for study abroad counselling and receive a complimentary laptop when you confirm your university admission through Vision International.",
        "offer_type": "laptop",
        "badge_text": "FREE",
        "terms": "Valid for students who complete full application support and receive an offer letter via Vision counsellors. Laptop model subject to availability.",
        "cta_label": "Claim This Offer",
        "cta_link": "/contact-us",
        "is_active": True,
        "is_featured": True,
        "sort_order": 1,
        "valid_until": "31 Dec 2026",
    },
    {
        "title": "₹10,000 Scholarship Assistance",
        "slug": "scholarship-assistance-10000",
        "description": "Get expert help applying for university scholarships and bursaries — plus up to ₹10,000 application fee waiver support for eligible students.",
        "offer_type": "scholarship",
        "badge_text": "SAVE",
        "terms": "Scholarship eligibility depends on university and student profile. Waiver applied to Vision service fees.",
        "is_active": True,
        "is_featured": True,
        "sort_order": 2,
    },
    {
        "title": "Free IELTS Mock Test + Counselling",
        "slug": "free-ielts-mock-test",
        "description": "Book a free IELTS diagnostic mock test and 30-minute one-on-one counselling session with our certified trainers.",
        "offer_type": "test_prep",
        "badge_text": "FREE",
        "cta_label": "Book Free Demo",
        "cta_link": "/ielts-training",
        "is_active": True,
        "sort_order": 3,
    },
    {
        "title": "Priority Visa File Processing",
        "slug": "priority-visa-processing",
        "description": "Students applying through Vision get priority document review and visa file preparation support for faster submissions.",
        "offer_type": "visa",
        "badge_text": "FAST TRACK",
        "is_active": True,
        "sort_order": 4,
    },
    {
        "title": "Education Loan at Lowest Interest",
        "slug": "education-loan-low-interest",
        "description": "Partner bank education loans with competitive interest rates and end-to-end documentation support from our loan desk.",
        "offer_type": "financial",
        "badge_text": "LOW EMI",
        "cta_label": "Apply for Loan",
        "cta_link": "/education-loans",
        "is_active": True,
        "sort_order": 5,
    },
]


def seed_offers():
    db = SessionLocal()
    try:
        if db.query(Offer).count() > 0:
            return
        for item in SEED_OFFERS:
            db.add(Offer(**item))
        db.commit()
    finally:
        db.close()
