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

from sqlalchemy import select



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


class MessageCreate(BaseModel):
    content: str
    conversation_id: UUID4

class MessageResponse(BaseModel):
    id: UUID4
    content: str
    conversation_id: UUID4
    user_id: UUID4
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


@router.post("/messages/", response_model=MessageResponse)
async def create_message(message_data: MessageCreate, session: AsyncSession = Depends(get_async_session)):
    new_message = Message(content=message_data.content, conversation_id=message_data.conversation_id)
    session.add(new_message)
    await session.commit()
    await session.refresh(new_message)
    return new_message

@router.get("/messages/", response_model=List[MessageResponse])
async def read_messages(session: AsyncSession = Depends(get_async_session)):
    messages = await session.execute(select(Message))
    return messages.scalars().all()

@router.get("/messages/{message_id}", response_model=MessageResponse)
async def read_message(message_id: UUID4, session: AsyncSession = Depends(get_async_session)):
    message = await session.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.delete("/messages/{message_id}")
async def delete_message(message_id: UUID4, session: AsyncSession = Depends(get_async_session)):
    message = await session.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    await session.delete(message)
    await session.commit()
    return {"ok": True}
