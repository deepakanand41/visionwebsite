from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Testimonial
from app.schemas import TestimonialResponse

router = APIRouter(prefix="/api", tags=["Testimonials"])


@router.get("/testimonials", response_model=list[TestimonialResponse])
def get_testimonials(db: Session = Depends(get_db)):
    return (
        db.query(Testimonial)
        .filter(Testimonial.is_active == True)
        .order_by(Testimonial.sort_order.asc(), Testimonial.id.desc())
        .all()
    )
