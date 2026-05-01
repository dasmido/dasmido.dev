from collections.abc import Generator
from secrets import compare_digest

from fastapi import Header, HTTPException, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.session import SessionLocal


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def require_blog_admin(x_admin_key: str | None = Header(default=None)) -> None:
    settings = get_settings()
    if not x_admin_key or not compare_digest(x_admin_key, settings.blog_admin_key):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin key",
        )


