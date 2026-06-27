"""Job designation slugs and labels for career postings."""

# Legacy department types (existing records may still use these)
LEGACY_JOB_TYPES: dict[str, str] = {
    "counselling": "Counselling",
    "sales": "Sales",
    "marketing": "Marketing",
    "operations": "Operations",
    "finance": "Finance",
    "hr": "HR",
    "it": "IT & Technology",
    "test_prep": "Test Prep",
    "visa": "Visa & Documentation",
    "management": "Management",
    "other": "Other",
}

# Vision International job designations
JOB_DESIGNATIONS: dict[str, str] = {
    "seo_expert": "SEO Expert",
    "smo_expert": "SMO Expert",
    "graphic_designer": "Graphic Designer",
    "digital_marketing_head": "Digital Marketing Head",
    "sales_executive": "Sales Executive",
    "sr_sales_executive": "Sr. Sales Executive",
    "sales_head": "Sales Head",
    "sales_director": "Sales Director",
    "operation_executive": "Operation Executive",
    "operation_head": "Operation Head",
    "operation_director": "Operation Director",
    "visa_filler": "Visa Filler",
    "tourist_visa_counsellor": "Tourist Visa Counsellor",
    "study_visa_counsellor": "Study Visa Counsellor",
    "education_loan_expert": "Education Loan Expert",
    "receptionist": "Receptionist",
    "accountant": "Accountant",
    "hr_assistant": "HR Assistant",
    "hr_head": "HR Head",
    "academic_counsellor": "Academic Counsellor",
}

ALL_JOB_TYPES: dict[str, str] = {**LEGACY_JOB_TYPES, **JOB_DESIGNATIONS}

JOB_TYPE_SLUGS: tuple[str, ...] = tuple(ALL_JOB_TYPES.keys())


def job_type_label(slug: str) -> str:
    return ALL_JOB_TYPES.get(slug, slug.replace("_", " ").title())


def is_valid_job_type(slug: str) -> bool:
    return slug in ALL_JOB_TYPES
