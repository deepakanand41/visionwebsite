from datetime import datetime, timezone

from app.database import SessionLocal
from app.models import ContentPost

SEED_CONTENT = [
    {
        "content_type": "news",
        "title": "Canada Announces Extended PGWP Rules for 2026 Intake",
        "slug": "canada-pgwp-rules-2026",
        "excerpt": "New post-graduation work permit guidelines offer more flexibility for international students planning to study in Canada.",
        "body": """Canada continues to strengthen its position as a top study destination for Indian students. The updated PGWP framework for 2026 provides clearer pathways for graduates seeking Canadian work experience.

**Key highlights:**
- Extended eligibility for selected diploma and degree programs
- Streamlined processing for students with valid study permits
- Strong demand for healthcare, IT, and engineering graduates

Vision International counsellors can help you choose programs that align with the latest PGWP criteria and plan your intake accordingly.""",
        "category": "Visa Updates",
        "author": "Vision Editorial",
        "is_published": True,
        "is_featured": True,
        "published_at": datetime(2026, 3, 1, tzinfo=timezone.utc),
    },
    {
        "content_type": "news",
        "title": "UK Graduate Route: What Indian Students Should Know",
        "slug": "uk-graduate-route-indian-students",
        "excerpt": "Essential updates on the UK Graduate Route visa and how to maximise your post-study work opportunities.",
        "body": """The UK remains one of the most popular destinations for Indian students pursuing master's degrees. The Graduate Route allows eligible graduates to stay and work in the UK for up to two years (three years for PhD graduates).

Our team recommends applying early, maintaining full-time enrolment, and keeping documentation ready for a smooth transition from student visa to Graduate Route.""",
        "category": "Study Abroad",
        "author": "Vision Editorial",
        "is_published": True,
        "is_featured": False,
        "published_at": datetime(2026, 2, 15, tzinfo=timezone.utc),
    },
    {
        "content_type": "news",
        "title": "Australia Increases Student Visa Processing Capacity",
        "slug": "australia-visa-processing-2026",
        "excerpt": "Faster turnaround times expected for genuine students applying to Australian universities this year.",
        "body": """Australian universities are welcoming international students with improved processing timelines for Subclass 500 visas. Students with complete financial and academic documentation are seeing faster outcomes.

Book a free counselling session with Vision International to shortlist universities and prepare a strong visa application.""",
        "category": "Visa Updates",
        "author": "Vision Editorial",
        "is_published": True,
        "is_featured": False,
        "published_at": datetime(2026, 2, 1, tzinfo=timezone.utc),
    },
    {
        "content_type": "blog",
        "title": "How to Choose the Right Country for Your Study Abroad Journey",
        "slug": "choose-right-study-abroad-country",
        "excerpt": "A practical guide comparing tuition, work rights, PR pathways, and lifestyle across top destinations.",
        "body": """Choosing where to study abroad is one of the biggest decisions you'll make. Beyond university rankings, consider:

**1. Budget & ROI** — Tuition, living costs, scholarships, and part-time work rules vary widely. Germany and some EU countries offer low tuition; the UK and US may have higher fees but strong career outcomes.

**2. Post-study work** — Canada, Australia, the UK, and New Zealand offer structured post-study work visas. Align your program with long-term career goals.

**3. PR pathways** — If settlement matters, research country-specific immigration policies early.

**4. Course fit** — Match your academic background and career plans to programs with strong industry links.

Vision International offers free counselling to help you compare destinations and build a personalised roadmap.""",
        "category": "Guides",
        "author": "Vision Counselling Team",
        "cover_image_url": "/images/hero-students.png",
        "is_published": True,
        "is_featured": True,
        "published_at": datetime(2026, 1, 20, tzinfo=timezone.utc),
    },
    {
        "content_type": "blog",
        "title": "IELTS vs PTE: Which Exam Is Right for You?",
        "slug": "ielts-vs-pte-which-exam",
        "excerpt": "Compare format, scoring, acceptance, and preparation timelines for India's most popular English tests.",
        "body": """Both IELTS and PTE are widely accepted for study abroad applications. Here's a quick comparison:

| Factor | IELTS | PTE |
|--------|-------|-----|
| Format | Paper or computer | Computer only |
| Speaking | In-person examiner | Recorded responses |
| Results | 3–5 days (computer) | Usually 48 hours |
| Acceptance | Global | Growing rapidly |

Students who prefer typing and faster results often choose PTE. Those comfortable with traditional formats may prefer IELTS. Vision International offers coaching for both — book a free demo class to find your best fit.""",
        "category": "Test Prep",
        "author": "Vision Training Team",
        "is_published": True,
        "is_featured": False,
        "published_at": datetime(2026, 1, 10, tzinfo=timezone.utc),
    },
]


def seed_content():
    db = SessionLocal()
    try:
        if db.query(ContentPost).count() > 0:
            return
        for item in SEED_CONTENT:
            db.add(ContentPost(**item))
        db.commit()
    finally:
        db.close()
