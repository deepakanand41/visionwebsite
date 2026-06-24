from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Offer
from app.schemas import OfferPublicResponse

router = APIRouter(prefix="/api", tags=["Offers"])


@router.get("/offers", response_model=list[OfferPublicResponse])
def list_offers(
    offer_type: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Offer).filter(Offer.is_active == True)
    if offer_type:
        query = query.filter(Offer.offer_type == offer_type)
    return query.order_by(Offer.sort_order.asc(), Offer.id.desc()).all()


@router.get("/offers/{slug}", response_model=OfferPublicResponse)
def get_offer(slug: str, db: Session = Depends(get_db)):
    offer = (
        db.query(Offer)
        .filter(Offer.slug == slug, Offer.is_active == True)
        .first()
    )
    if not offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    return offer
