# app/routes/admin_endpoints.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from models.db import get_async_session, User
from models.schemas import UserResponseModel  # Import the Pydantic model
from sqlalchemy import select

router = APIRouter()

@router.get("/users", response_model=list[UserResponseModel])
async def get_users(session: AsyncSession = Depends(get_async_session)):
    async with session as db:
        result = await db.execute(select(User))
        users = result.scalars().all()
        return users


@router.post("/users", response_model=UserResponseModel)
async def get_users(session: AsyncSession = Depends(get_async_session)):
    try:
        async with session:
            user = User(**user_data.dict())  # Create a new User instance from the Pydantic UserCreate model
            session.add(user)
            await session.commit()
            await session.refresh(user)
            return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# Add these lines to app/main.py
# app.include_router(admin_endpoints.router, prefix="/admin", tags=["admin"])

# No changes needed in app/models/db.py
