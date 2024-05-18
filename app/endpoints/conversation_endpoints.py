# app/endpoints/conversation_endpoints.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from models.db import Conversation, Message, get_async_session_endpoints
from uuid import UUID

from typing import List
from pydantic import BaseModel, UUID4
from datetime import datetime 

router = APIRouter()



from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from models.db import Conversation, get_async_session
from typing import List
from pydantic import BaseModel, UUID4

router = APIRouter()

class ConversationCreate(BaseModel):
    title: str

class ConversationResponse(BaseModel):
    id: UUID4
    title: str
    user_id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

@router.post("/conversations/", response_model=ConversationResponse)
async def create_conversation(conversation_data: ConversationCreate, session: AsyncSession = Depends(get_async_session)):
    new_conversation = Conversation(title=conversation_data.title)
    session.add(new_conversation)
    await session.commit()
    await session.refresh(new_conversation)
    return new_conversation

@router.get("/conversations/", response_model=List[ConversationResponse])
async def read_conversations(session: AsyncSession = Depends(get_async_session)):
    conversations = await session.execute(select(Conversation))
    return conversations.scalars().all()

@router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
async def read_conversation(conversation_id: UUID4, session: AsyncSession = Depends(get_async_session)):
    conversation = await session.get(Conversation, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation

@router.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: UUID4, session: AsyncSession = Depends(get_async_session)):
    conversation = await session.get(Conversation, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    await session.delete(conversation)
    await session.commit()
    return {"ok": True}
