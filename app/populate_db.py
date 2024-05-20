# app/populate_db.py


# populate_db.py

import asyncio
from models.db import get_async_session, create_db_and_tables, User
from models.users import get_user_manager
from app.models.user_schemas import UserCreate  # Import the UserCreate schema
from fastapi_users.db import SQLAlchemyUserDatabase

async def create_test_users():
    async with get_async_session() as session:
        user_db = SQLAlchemyUserDatabase(session, User)
        async for user_manager in get_user_manager(user_db):
            # Define test user data
            test_users = [
                UserCreate(email="testuser1@example.com", password="password123"),  # Use UserCreate schema
                UserCreate(email="testuser2@example.com", password="password123"),
                UserCreate(email="testuser3@example.com", password="password123")
            ]

            # Create and save test users
            for user_data in test_users:
                user = await user_manager.create(user_data)  # Pass the schema instance
                print(f"Created user {user.id} with email {user.email}")
            break  # Exit after processing, since we only need one instance

async def main():
    await create_db_and_tables()
    await create_test_users()

if __name__ == "__main__":
    asyncio.run(main())
