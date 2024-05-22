# app/endpoints/conversation_endpoints.py


from typing import List
from pydantic import UUID4
from typing import Optional
from fastapi import (
    APIRouter, 
    Depends, 
    HTTPException, 
    Request, 
    Response
)
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
from models.users import current_active_user, User
import uuid

logger = logging.getLogger(__name__)


router = APIRouter()


# CONVERSATION ENDPOINTS (MESSAGES BELOW)

@router.post("/conversations")
async def create_conversation(
    conversation_data: ConversationCreate, 
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_active_user)
):
    if current_user:
         # logged-in user
         conversation = Conversation(
            title=conversation_data.title,
            user_id=current_user.id
        )
    else:
        # non-logged-in user
        conversation_id = str(uuid.uuid4())
        conversation = Conversation(
            id=conversation_id,
            title=conversation_data.title
        )
        response.set_cookie("conversation_id", value=conversation_id)
    
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    return conversation

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

# from langchain_stuff.lanchain_services.simple_convo import hajoke_chain

@router.post("/conversations/{conversation_id}/messages/")
async def create_message(
    conversation_id: str, 
    message_data: MessageCreate,
    request: Request,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_active_user)
):
    conversation = await db.get(Conversation, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if current_user:
        # logged-in user
        message = Message(
            conversation_id=conversation_id,
            user_id=current_user.id,
            role=message_data.role,
            content=message_data.content
        )
    else:
        # non-logged-in-ser
        cookie_conversation_id = request.cookies.get("conversation_id")
        if cookie_conversation_id!= conversation_id:
            raise HTTPException(status_code=403, detail="Invalid conversation ID")
    
        message = Message(
            conversation_id=conversation_id,
            role=message_data.role,
            content=message_data.content
        )
    
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return message




    


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