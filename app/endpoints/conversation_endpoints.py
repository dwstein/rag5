# app/endpoints/conversation_endpoints.py


from typing import List
from pydantic import UUID4
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging

from models.db import Conversation, Message, get_async_session
from models.conversation_schemas import (
    MessageCreate,
    MessageResponse,
    SafeMessageResponse,
    ConversationCreate,
    ConversationResponse
)


logger = logging.getLogger(__name__)


router = APIRouter()


# CONVERSATION ENDPOINTS (MESSAGES BELOW)

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



# MESSAGE ENDPOINTS


# 5/21/24 thi works. it returns an answer.
from langchain_stuff.simple_convo import joke_chain

@router.post("/conversations/{conversation_id}/messages/")
async def create_message(conversation_id: UUID4, message_data: MessageCreate, session: AsyncSession = Depends(get_async_session)):
    conversation = await session.get(Conversation, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    response = joke_chain(message_data.content)
    new_message = Message(role="assistant", content=response, conversation_id=conversation_id)
    
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









# READ MESSAGES ADMIN ENDPOINT
        
@router.get("/safe-messages/", response_model=List[SafeMessageResponse])
async def read_all_messages(session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Message))
    messages = result.scalars().all()
    return messages