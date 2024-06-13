# app/routes/admin_endpoints.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from models.db import Conversation, get_async_session_endpoints, User
from models.user_schemas import UserResponseModel, UserCreate  # Import the Pydantic model
from sqlalchemy import select
from datetime import datetime

router = APIRouter()

@router.get("/users", response_model=list[UserResponseModel])
async def get_users():
    async with get_async_session_endpoints() as session:
        result = await session.execute(select(User))
        users = result.scalars().all()
        return users

@router.post("/users", response_model=UserResponseModel)
async def create_user(user_data: UserCreate):
    session = await get_async_session_endpoints()
    try:
        user = User(**user_data.dict())
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await session.close()


@router.get("/conversations")
async def list_conversations(session: AsyncSession = Depends(get_async_session_endpoints)):
    async with session as db_session:
        result = await db_session.execute(select(Conversation))
        conversations = result.scalars().all()

    conversation_list = []
    for conversation in conversations:
        conversation_data = {
            "conversation_id": conversation.id,
            "user_id": conversation.user_id,
            "date_created": conversation.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }
        conversation_list.append(conversation_data)

    return conversation_list