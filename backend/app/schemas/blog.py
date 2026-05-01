from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class BlogBase(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    content: str = Field(min_length=1)
    published: bool = False


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BlogBase):
    pass


class BlogRead(BlogBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

