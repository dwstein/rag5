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
from datetime import datetime

from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import logging

from models.db import Conversation, Message, get_async_session
from models.conversation_schemas import (
    MessageCreate,
    MessageResponse,
    SafeMessageResponse,
    ConversationCreate,
    ConversationResponse,
    ConversationUpdate
)
from models.users import current_active_user, get_current_user_optional, User
from langchain_stuff.langchain_services.basic_chat import chat_with_history
import uuid
from uuid import UUID

logger = logging.getLogger(__name__)


router = APIRouter()


"""
Unauthenticated User: create_new_conversation() creates a conversation 
without a user ID and sets a cookie with the conversation ID.
Authenticated User: create_conversation() creates a conversation 
linked to the authenticated user.
 
"""



# CONVERSATION ENDPOINTS (MESSAGES BELOW)

def get_default_title():
    now = datetime.now()
    return f"Convo from: {now.strftime('%m/%d/%y %H:%M')}"

# # creates a conversation without a user ID and sets a cookie with the conversation ID.
# @router.post("/conversations/new")
# async def create_new_conversation(
#     response: Response,
#     conversation_data: ConversationCreate,
#     db: AsyncSession = Depends(get_async_session),
#     current_user: User = Depends(get_current_user_optional)
# ):
#     conversation_id = uuid.uuid4()
    
#     if current_user:
#         # If the user is authenticated, associate the user_id with the conversation
#         user_id = current_user.id
#     else:
#         # If the user is not authenticated, create the conversation without user_id
#         raise HTTPException(status_code=401, detail="Not authenticated")

#     title = conversation_data.title if conversation_data.title else get_default_title()
    
#     conversation = Conversation(
#         id=conversation_id,
#         title=title,
#         user_id=user_id
#     )

#     db.add(conversation)
#     await db.commit()
#     await db.refresh(conversation)
    
#     # Store the conversation_id in a cookie
#     response.set_cookie(key="conversation_id", value=str(conversation_id))
    
#     return {"conversation_id": conversation_id}





# creates a conversation linked to the authenticated user.
@router.post("/conversations")
async def create_conversation(
    conversation_data: ConversationCreate, 
    # request: Request,
    # response: Response,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(current_active_user)
):
    if current_user.id != conversation_data.user_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    title = conversation_data.title if conversation_data.title else get_default_title()
    
    conversation = Conversation(
        id = uuid.uuid4(),
        title = title,
        user_id = current_user.id
    )
    
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


@router.patch("/conversations/{conversation_id}", response_model=ConversationResponse)
async def update_conversation(
    conversation_id: UUID4,
    conversation_data: ConversationUpdate,
    session: AsyncSession = Depends(get_async_session),
):
    conversation = await session.get(Conversation, conversation_id)
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    if conversation_data.title is not None:
        conversation.title = conversation_data.title

    session.add(conversation)
    await session.commit()
    await session.refresh(conversation)

    return conversation




@router.get("/conversationslist/{user_id}", response_model=List[ConversationResponse])
async def read_user_conversations(user_id: UUID4, session: AsyncSession = Depends(get_async_session)):
    conversations = await session.execute(select(Conversation).where(Conversation.user_id == user_id).order_by(Conversation.created_at.desc()))
    return conversations.scalars().all()








# MESSAGE ENDPOINTS

# from langchain_stuff.lanchain_services.simple_convo import hajoke_chain

@router.post("/conversations/{conversation_id}/messages/")
async def create_message(
    conversation_id: UUID,
    message_data: MessageCreate,
    request: Request,
    db: AsyncSession = Depends(get_async_session),
    current_user: User = Depends(get_current_user_optional)
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



@router.get("/conversations/{conversation_id}/messages/", response_model=List[MessageResponse])
async def read_messages(conversation_id: UUID4, session: AsyncSession = Depends(get_async_session)):
    try:
        print("conversation_id", conversation_id)
        conversation = await session.get(Conversation, conversation_id)
        if not conversation:
            raise HTTPException(status_code=404, detail="Conversation not found")
        
        result = await session.execute(select(Message).where(Message.conversation_id == conversation_id))
        messages = result.scalars().all()
        
        logger.info(f"Retrieved {len(messages)} messages for conversation {conversation_id}")
        
        return messages
    except SQLAlchemyError as e:
        logger.exception("Database error occured")
        raise HTTPException(status_code=500, detail="Internal Server Error") from e
    except HTTPException as e:
        raise e
    
    except Exception as e:
        logger.exception("An unexpected error occurred")
     
        raise HTTPException(status_code=500, detail=f"Internal Server Error") from e



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




@router.get("/health_2")
async def health_check_2():
    return {"status": "ok-2"}




# READ MESSAGES ADMIN ENDPOINT
        
@router.get("/safe-messages_2/", response_model=List[SafeMessageResponse])
async def read_all_messages_2(session: AsyncSession = Depends(get_async_session)):
    logger.info("Received request for all messages from safe-messages_2")
    result = await session.execute(select(Message))
    messages = result.scalars().all()
    return messages