from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Accreditation
from app.schemas import AccreditationResponse

router = APIRouter(prefix="/api", tags=["Accreditations"])


@router.get("/accreditations", response_model=list[AccreditationResponse])
def get_accreditations(db: Session = Depends(get_db)):
    return (
        db.query(Accreditation)
        .filter(Accreditation.is_active == True, Accreditation.image_url.isnot(None))
        .order_by(Accreditation.sort_order.asc(), Accreditation.id.asc())
        .all()
    )
