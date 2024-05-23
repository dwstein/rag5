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
from langchain_stuff.langchain_services.basic_chat import chat_with_history
import uuid
from uuid import UUID

logger = logging.getLogger(__name__)


router = APIRouter()


# CONVERSATION ENDPOINTS (MESSAGES BELOW)

@router.post("/conversations/new")
async def create_new_conversation(
    response: Response,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_active_user)
):
    conversation_id = uuid.uuid4()
    
    if current_user:
        # If the user is authenticated, associate the user_id with the conversation
        conversation = Conversation(id=conversation_id, user_id=current_user.id)
    else:
        # If the user is not authenticated, create the conversation without user_id
        conversation = Conversation(id=conversation_id)
    
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    
    # Store the conversation_id in a cookie
    response.set_cookie(key="conversation_id", value=conversation_id)
    
    return {"conversation_id": conversation_id}






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

# @router.get("/conversations/", response_model=List[ConversationResponse])
# async def read_conversations(session: AsyncSession = Depends(get_async_session)):
#     conversations = await session.execute(select(Conversation))
#     return conversations.scalars().all()

# @router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
# async def read_conversation(conversation_id: UUID4, session: AsyncSession = Depends(get_async_session)):
#     conversation = await session.get(Conversation, conversation_id)
#     if not conversation:
#         raise HTTPException(status_code=404, detail="Conversation not found")
#     return conversation

# @router.delete("/conversations/{conversation_id}")
# async def delete_conversation(conversation_id: UUID4, session: AsyncSession = Depends(get_async_session)):
#     conversation = await session.get(Conversation, conversation_id)
#     if not conversation:
#         raise HTTPException(status_code=404, detail="Conversation not found")
#     await session.delete(conversation)
#     await session.commit()
#     return {"ok": True}



# MESSAGE ENDPOINTS

# from langchain_stuff.lanchain_services.simple_convo import hajoke_chain

@router.post("/conversations/{conversation_id}/messages/")
async def create_message(
    conversation_id: UUID,
    message_data: MessageCreate,
    request: Request,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_active_user)
):
    conversation = await db.get(Conversation, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    user_id = current_user.id if current_user else None
        
    response, message_history = await chat_with_history(
        new_message=message_data.content,
        user_id=user_id,
        conversation_id=str(conversation_id),
        db=db
    )
        
    return {"response": response}







# @router.get("/messages/", response_model=List[MessageResponse])
# async def read_messages(session: AsyncSession = Depends(get_async_session)):
#     messages = await session.execute(select(Message))
#     return messages.scalars().all()

# @router.get("/messages/{message_id}", response_model=MessageResponse)
# async def read_message(message_id: UUID4, session: AsyncSession = Depends(get_async_session)):
#     message = await session.get(Message, message_id)
#     if not message:
#         raise HTTPException(status_code=404, detail="Message not found")
#     return message

# @router.delete("/messages/{message_id}")
# async def delete_message(message_id: UUID4, session: AsyncSession = Depends(get_async_session)):
#     message = await session.get(Message, message_id)
#     if not message:
#         raise HTTPException(status_code=404, detail="Message not found")
#     await session.delete(message)
#     await session.commit()
#     return {"ok": True}









# READ MESSAGES ADMIN ENDPOINT
        
@router.get("/safe-messages/", response_model=List[SafeMessageResponse])
async def read_all_messages(session: AsyncSession = Depends(get_async_session)):
    result = await session.execute(select(Message))
    messages = result.scalars().all()
    return messages