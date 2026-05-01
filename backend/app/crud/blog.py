from sqlalchemy.orm import Session

from app.models.blog import Blog
from app.schemas.blog import BlogCreate, BlogUpdate


def create_blog(db: Session, payload: BlogCreate) -> Blog:
    blog = Blog(**payload.model_dump())
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


def get_blog(db: Session, blog_id: int) -> Blog | None:
    return db.query(Blog).filter(Blog.id == blog_id).first()


def list_blogs(db: Session, skip: int = 0, limit: int = 20) -> list[Blog]:
    return db.query(Blog).offset(skip).limit(limit).all()


def update_blog(db: Session, blog: Blog, payload: BlogUpdate) -> Blog:
    for key, value in payload.model_dump().items():
        setattr(blog, key, value)
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


def delete_blog(db: Session, blog: Blog) -> None:
    db.delete(blog)
    db.commit()

