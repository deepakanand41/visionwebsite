from fastapi import Header, HTTPException, status

from app.config import settings


def verify_admin_secret(x_admin_secret: str = Header(..., alias="X-Admin-Secret")):
    if x_admin_secret != settings.admin_secret_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin secret key",
        )
    return True
