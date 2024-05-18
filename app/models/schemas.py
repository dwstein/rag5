# app/models/schemas.py

import uuid

from pydantic import BaseModel
from uuid import UUID

from fastapi_users import schemas
from datetime import datetime

class UserRead(schemas.BaseUser[uuid.UUID]):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass


class UserResponseModel(BaseModel):
    id: UUID
    email: str

    class Config:
        orm_mode = True
        

