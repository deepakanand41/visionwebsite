from app.database import SessionLocal
from app.models import Testimonial

SEED_TESTIMONIALS = [
    {
        "name": "Priya Sharma",
        "destination": "Canada 🇨🇦",
        "university": "University of Toronto",
        "course": "MSc Data Science",
        "review": "Vision Overseas made my dream of studying in Canada a reality. Their counsellors were incredibly supportive throughout the entire process — from shortlisting universities to visa approval.",
        "rating": 5,
        "avatar_color": "#fde9d1",
        "initial": "PS",
        "highlight": "Visa approved in 3 weeks",
        "sort_order": 1,
    },
    {
        "name": "Rahul Verma",
        "destination": "Australia 🇦🇺",
        "university": "University of Melbourne",
        "course": "MBA",
        "review": "The IELTS coaching at Vision Overseas was exceptional. I scored 8.0 bands on my first attempt! Their personalized study plans and mock tests really helped.",
        "rating": 5,
        "avatar_color": "#d4e8ff",
        "initial": "RV",
        "highlight": "IELTS 8.0 on first attempt",
        "sort_order": 2,
    },
    {
        "name": "Anjali Patel",
        "destination": "United Kingdom 🇬🇧",
        "university": "University of Manchester",
        "course": "LLM International Law",
        "review": "What sets Vision apart is their genuine care for students. My visa was rejected once, but they helped me reapply with stronger documentation and I got my UK visa within 3 weeks!",
        "rating": 5,
        "avatar_color": "#ffd9b3",
        "initial": "AP",
        "highlight": "Visa reapproved after rejection",
        "sort_order": 3,
    },
    {
        "name": "Karthik Nair",
        "destination": "Germany 🇩🇪",
        "university": "TU Munich",
        "course": "MS Mechanical Engineering",
        "review": "I wanted to study in Germany with minimal tuition fees. Vision Overseas guided me through blocked account setup, health insurance and accommodation.",
        "rating": 5,
        "avatar_color": "#c8e6c9",
        "initial": "KN",
        "highlight": "Tuition-free admission secured",
        "sort_order": 4,
    },
    {
        "name": "Sneha Reddy",
        "destination": "United States 🇺🇸",
        "university": "Northeastern University",
        "course": "MS Computer Science",
        "review": "From F-1 visa to OPT extension guidance, Vision Overseas was with me every step. Their scholarship team helped me secure a $15,000 merit scholarship.",
        "rating": 5,
        "avatar_color": "#e8d4ff",
        "initial": "SR",
        "highlight": "$15,000 scholarship won",
        "sort_order": 5,
    },
    {
        "name": "Amit Kumar",
        "destination": "New Zealand 🇳🇿",
        "university": "University of Auckland",
        "course": "BEng Civil Engineering",
        "review": "They got me conditional offer letters from 3 universities within a week! Their education loan assistance helped me secure funding at a low interest rate.",
        "rating": 5,
        "avatar_color": "#ffd4d4",
        "initial": "AK",
        "highlight": "3 offer letters in 1 week",
        "sort_order": 6,
    },
]


def seed_testimonials():
    db = SessionLocal()
    try:
        if db.query(Testimonial).count() == 0:
            for item in SEED_TESTIMONIALS:
                db.add(Testimonial(**item))
            db.commit()
    finally:
        db.close()
