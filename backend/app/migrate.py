from sqlalchemy import inspect, text

from app.database import engine


MIGRATIONS = [
    ("enquiries", "status", "VARCHAR(30) NOT NULL DEFAULT 'pending'"),
    ("enquiries", "admin_notes", "TEXT"),
    ("enquiries", "status_updated_at", "TIMESTAMP WITH TIME ZONE"),
    ("demo_class_bookings", "status", "VARCHAR(30) NOT NULL DEFAULT 'pending'"),
    ("demo_class_bookings", "admin_notes", "TEXT"),
    ("demo_class_bookings", "status_updated_at", "TIMESTAMP WITH TIME ZONE"),
    ("referral_applications", "status", "VARCHAR(30) NOT NULL DEFAULT 'pending'"),
    ("referral_applications", "admin_notes", "TEXT"),
    ("referral_applications", "status_updated_at", "TIMESTAMP WITH TIME ZONE"),
    ("testimonials", "media_type", "VARCHAR(10)"),
    ("testimonials", "media_url", "VARCHAR(500)"),
    ("offers", "media_type", "VARCHAR(10)"),
]


def run_migrations():
    inspector = inspect(engine)
    with engine.begin() as conn:
        for table, column, col_type in MIGRATIONS:
            if table not in inspector.get_table_names():
                continue
            existing = [c["name"] for c in inspector.get_columns(table)]
            if column not in existing:
                conn.execute(text(f'ALTER TABLE "{table}" ADD COLUMN {column} {col_type}'))
