from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.crud.blog import create_blog, delete_blog, get_blog, list_blogs, update_blog
from app.models.user import User
from app.schemas.blog import BlogCreate, BlogRead, BlogUpdate

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


@router.post("", response_model=BlogRead, status_code=status.HTTP_201_CREATED)
def create_blog_post(
    payload: BlogCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> BlogRead:
    blog = create_blog(db, payload)
    return blog


@router.get("", response_model=list[BlogRead])
def get_blog_posts(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
) -> list[BlogRead]:
    return list_blogs(db, skip=skip, limit=limit)


@router.get("/{blog_id}", response_model=BlogRead)
def get_blog_post(blog_id: int, db: Session = Depends(get_db)) -> BlogRead:
    blog = get_blog(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return blog


@router.put("/{blog_id}", response_model=BlogRead)
def update_blog_post(
    blog_id: int,
    payload: BlogUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> BlogRead:
    blog = get_blog(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    return update_blog(db, blog, payload)


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog_post(
    blog_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> None:
    blog = get_blog(db, blog_id)
    if blog is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    delete_blog(db, blog)

