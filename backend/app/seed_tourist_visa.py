from app.database import SessionLocal
from app.models import TouristVisaCountry

SEED_COUNTRIES = [
    {"country_slug": "canada", "country_name": "Canada", "flag": "🇨🇦", "sort_order": 1},
    {"country_slug": "australia", "country_name": "Australia", "flag": "🇦🇺", "sort_order": 2},
    {"country_slug": "united-kingdom", "country_name": "United Kingdom", "flag": "🇬🇧", "sort_order": 3},
    {"country_slug": "united-states", "country_name": "United States", "flag": "🇺🇸", "sort_order": 4},
    {"country_slug": "new-zealand", "country_name": "New Zealand", "flag": "🇳🇿", "sort_order": 5},
    {"country_slug": "france", "country_name": "France", "flag": "🇫🇷", "sort_order": 6},
    {"country_slug": "germany", "country_name": "Germany", "flag": "🇩🇪", "sort_order": 7},
    {"country_slug": "denmark", "country_name": "Denmark", "flag": "🇩🇰", "sort_order": 8},
    {"country_slug": "sweden", "country_name": "Sweden", "flag": "🇸🇪", "sort_order": 9},
    {"country_slug": "finland", "country_name": "Finland", "flag": "🇫🇮", "sort_order": 10},
    {"country_slug": "latvia", "country_name": "Latvia", "flag": "🇱🇻", "sort_order": 11},
    {"country_slug": "lithuania", "country_name": "Lithuania", "flag": "🇱🇹", "sort_order": 12},
    {"country_slug": "singapore", "country_name": "Singapore", "flag": "🇸🇬", "sort_order": 13},
    {"country_slug": "cyprus", "country_name": "Cyprus", "flag": "🇨🇾", "sort_order": 14},
    {"country_slug": "malta", "country_name": "Malta", "flag": "🇲🇹", "sort_order": 15},
    {"country_slug": "mauritius", "country_name": "Mauritius", "flag": "🇲🇺", "sort_order": 16},
]


def _default_content(name: str) -> dict:
    return {
        "hero_title": f"Tourist Visa for {name}",
        "hero_subtitle": f"Plan your holiday to {name} with expert visa guidance from Vision International. We help with documentation, application filing, and interview preparation.",
        "visa_process": (
            f"<h2>Visa Application Process for {name}</h2>"
            "<ol>"
            "<li><strong>Consultation</strong> — Share your travel dates, purpose, and documents with our visa experts.</li>"
            "<li><strong>Document Checklist</strong> — We provide a country-specific checklist (passport, photos, bank statements, itinerary, etc.).</li>"
            "<li><strong>Application Filing</strong> — Complete the online/offline visa form with accurate details.</li>"
            "<li><strong>Biometrics &amp; Interview</strong> — Book and prepare for biometrics or embassy interview if required.</li>"
            "<li><strong>Visa Decision</strong> — Track your application and receive your visa before travel.</li>"
            "</ol>"
        ),
        "visa_eligibility": (
            f"<h2>Eligibility Requirements for {name} Tourist Visa</h2>"
            "<ul>"
            "<li>Valid passport with minimum 6 months validity beyond intended stay</li>"
            "<li>Proof of sufficient funds for travel and stay</li>"
            "<li>Confirmed return/onward travel tickets</li>"
            "<li>Accommodation proof (hotel booking or invitation letter)</li>"
            "<li>Travel insurance (where applicable)</li>"
            "<li>Clear travel purpose — tourism, family visit, or short business trip</li>"
            "<li>No immigration violations or serious criminal record</li>"
            "</ul>"
            "<p><em>Requirements may vary by nationality and visa type. Our counsellors will confirm the exact checklist for your profile.</em></p>"
        ),
        "faqs": [
            {
                "question": f"How long does a tourist visa for {name} take?",
                "answer": "Processing times vary by season and embassy workload, typically from a few days to several weeks. Apply at least 4–6 weeks before your planned travel date.",
            },
            {
                "question": "What documents do I need for a tourist visa?",
                "answer": "Generally you need a valid passport, recent photographs, bank statements, travel itinerary, accommodation proof, and employment/income documents. We provide a tailored checklist for your case.",
            },
            {
                "question": "Can Vision International help with my visa application?",
                "answer": "Yes. Our visa team assists with document review, form filling, appointment booking, and interview preparation for tourist visas to major destinations.",
            },
            {
                "question": "What if my visa application is refused?",
                "answer": "We review the refusal reason, advise on reapplication or appeal options where available, and help strengthen your next application.",
            },
        ],
        "is_active": True,
    }


def seed_tourist_visa():
    db = SessionLocal()
    try:
        existing = {row.country_slug for row in db.query(TouristVisaCountry.country_slug).all()}
        added = 0
        for item in SEED_COUNTRIES:
            if item["country_slug"] in existing:
                continue
            defaults = _default_content(item["country_name"])
            db.add(TouristVisaCountry(**item, **defaults))
            added += 1
        if added:
            db.commit()
    finally:
        db.close()
