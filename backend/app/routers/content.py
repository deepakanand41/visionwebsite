from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContentPost
from app.schemas import ContentPostPublicResponse

router = APIRouter(prefix="/api", tags=["Content"])


def _published_query(db: Session, content_type: str):
    return (
        db.query(ContentPost)
        .filter(
            ContentPost.content_type == content_type,
            ContentPost.is_published == True,
        )
        .order_by(
            ContentPost.is_featured.desc(),
            ContentPost.published_at.desc().nullslast(),
            ContentPost.id.desc(),
        )
    )


@router.get("/news", response_model=list[ContentPostPublicResponse])
def list_news(db: Session = Depends(get_db)):
    return _published_query(db, "news").all()


@router.get("/news/{slug}", response_model=ContentPostPublicResponse)
def get_news(slug: str, db: Session = Depends(get_db)):
    post = (
        db.query(ContentPost)
        .filter(
            ContentPost.content_type == "news",
            ContentPost.slug == slug,
            ContentPost.is_published == True,
        )
        .first()
    )
    if not post:
        raise HTTPException(status_code=404, detail="Article not found")
    return post


@router.get("/blog", response_model=list[ContentPostPublicResponse])
def list_blog(
    category: str | None = Query(None),
    db: Session = Depends(get_db),
):
    query = _published_query(db, "blog")
    if category:
        query = query.filter(ContentPost.category.ilike(category))
    return query.all()


@router.get("/blog/{slug}", response_model=ContentPostPublicResponse)
def get_blog(slug: str, db: Session = Depends(get_db)):
    post = (
        db.query(ContentPost)
        .filter(
            ContentPost.content_type == "blog",
            ContentPost.slug == slug,
            ContentPost.is_published == True,
        )
        .first()
    )
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post
