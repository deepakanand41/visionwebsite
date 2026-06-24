from fastapi import APIRouter, Request
from fastapi.responses import Response

from app.services.media_stream import media_head_response, media_stream_response

router = APIRouter(prefix="/api", tags=["Media"])


@router.head("/media/{key:path}")
def head_media(key: str):
    return media_head_response(key)


@router.get("/media/{key:path}")
def stream_media(key: str, request: Request):
    range_header = request.headers.get("range")
    return media_stream_response(key, range_header)
