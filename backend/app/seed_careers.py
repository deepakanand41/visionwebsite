from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.job_designations import JOB_DESIGNATIONS
from app.models import JobPosting


SAMPLE_JOBS = [
    {
        "title": "Study Abroad Counsellor",
        "slug": "study-abroad-counsellor",
        "job_type": "counselling",
        "employment_type": "full_time",
        "location": "Karnal, Haryana",
        "experience_required": "1–3 years",
        "salary_range": "As per industry standards",
        "description": (
            "Guide students through university selection, applications, and visa planning. "
            "You will work with motivated learners and help them achieve their international education goals."
        ),
        "requirements": (
            "Bachelor's degree in any discipline\n"
            "Excellent communication and counselling skills\n"
            "Knowledge of study abroad destinations (Canada, UK, Australia preferred)\n"
            "Customer-first mindset with strong follow-up discipline"
        ),
        "responsibilities": (
            "Conduct student counselling sessions\n"
            "Prepare university shortlists and application timelines\n"
            "Coordinate with visa and documentation teams\n"
            "Meet monthly counselling and conversion targets"
        ),
        "sort_order": 1,
    },
    {
        "title": "Digital Marketing Executive",
        "slug": "digital-marketing-executive",
        "job_type": "marketing",
        "employment_type": "full_time",
        "location": "Karnal / Hybrid",
        "experience_required": "1–2 years",
        "salary_range": "Negotiable",
        "description": (
            "Drive brand visibility and lead generation for Vision International across digital channels "
            "including social media, SEO, and paid campaigns."
        ),
        "requirements": (
            "Experience with Meta Ads, Google Ads, or similar platforms\n"
            "Strong content and copywriting skills\n"
            "Basic graphic/video editing skills are a plus\n"
            "Education sector experience preferred"
        ),
        "responsibilities": (
            "Plan and execute digital campaigns\n"
            "Manage social media calendars and creatives\n"
            "Track leads, CPL, and campaign ROI\n"
            "Collaborate with sales and counselling teams"
        ),
        "sort_order": 2,
    },
    {
        "title": "IELTS / PTE Faculty",
        "slug": "ielts-pte-faculty",
        "job_type": "test_prep",
        "employment_type": "full_time",
        "location": "Karnal, Haryana",
        "experience_required": "2+ years teaching experience",
        "salary_range": "Based on experience",
        "description": (
            "Deliver high-quality IELTS and PTE training to students preparing for study abroad. "
            "Help learners achieve target band scores through structured coaching."
        ),
        "requirements": (
            "IELTS 7.5+ or PTE 79+ (or equivalent)\n"
            "Prior classroom or online teaching experience\n"
            "Strong grammar, speaking, and writing skills\n"
            "Ability to mentor students through mock tests"
        ),
        "responsibilities": (
            "Conduct daily batches and doubt sessions\n"
            "Design lesson plans and practice material\n"
            "Evaluate writing and speaking performance\n"
            "Maintain student progress reports"
        ),
        "sort_order": 3,
    },
]


def _designation_job_template(slug: str, label: str, sort_order: int) -> dict:
    return {
        "title": label,
        "slug": slug,
        "job_type": slug,
        "employment_type": "full_time",
        "location": "Karnal, Haryana",
        "experience_required": "As per role",
        "salary_range": "As per industry standards",
        "description": (
            f"Vision International Educational Consultants is hiring a {label}. "
            f"Join our team and contribute to helping students achieve their study abroad and visa goals."
        ),
        "requirements": (
            "Relevant experience in the role or education sector\n"
            "Strong communication and interpersonal skills\n"
            "Professional attitude with team collaboration\n"
            "Willingness to work from Karnal office (unless otherwise agreed)"
        ),
        "responsibilities": (
            f"Perform duties aligned with the {label} role\n"
            "Coordinate with internal teams as required\n"
            "Maintain quality standards and follow company processes\n"
            "Support Vision International's growth and student success mission"
        ),
        "sort_order": sort_order,
        "is_active": True,
    }


DESIGNATION_JOBS = [
    _designation_job_template(slug, label, idx + 10)
    for idx, (slug, label) in enumerate(JOB_DESIGNATIONS.items())
]


def seed_careers():
    db: Session = SessionLocal()
    try:
        added = 0
        if db.query(JobPosting).count() == 0:
            for item in SAMPLE_JOBS:
                db.add(JobPosting(**item, is_active=True))
            added += len(SAMPLE_JOBS)

        existing_slugs = {row.slug for row in db.query(JobPosting.slug).all()}
        for item in DESIGNATION_JOBS:
            if item["slug"] in existing_slugs:
                continue
            db.add(JobPosting(**item))
            added += 1

        if added:
            db.commit()
    finally:
        db.close()
