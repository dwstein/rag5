# app/routes/admin_endpoints.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from models.db import get_async_session_endpoints, User
from models.schemas import UserResponseModel, UserCreate  # Import the Pydantic model
from sqlalchemy import select

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

