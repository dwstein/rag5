# app/models/conversation_schemas.py


from pydantic import BaseModel, UUID4
from typing import Optional

from fastapi_users import schemas
from datetime import datetime


class ConversationCreate(BaseModel):
    title: str

class ConversationResponse(BaseModel):
    id: UUID4
    title: str | None = None
    user_id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        

class MessageCreate(BaseModel):
    content: str
    # conversation_id: UUID4

class MessageResponse(BaseModel):
    id: UUID4
    content: str
    conversation_id: UUID4
    role: str
    user_id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        
        
        
class SafeMessageResponse(BaseModel):
    id: UUID4
    content: Optional[str]
    conversation_id: Optional[UUID4]
    role: Optional[str]
    user_id: Optional[UUID4]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True