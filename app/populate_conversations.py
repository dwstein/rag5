# app/populate_conversations.py

import asyncio
from models.db import get_async_session, create_db_and_tables, User
from models.conversation_models import Conversation, Message
from uuid import UUID
from fastapi_users.db import SQLAlchemyUserDatabase

async def create_test_conversations():
    async with get_async_session() as session:
        user_db = SQLAlchemyUserDatabase(session, User)

        # Get a user for which you want to create test conversations
        user = await user_db.get(UUID("19decc4a-3f07-4fc9-ab19-d95cf304c333"))

        if user:
            # Create test conversations
            conversation1 = Conversation(user_id=user.id, title="Test Conversation 1")
            conversation2 = Conversation(user_id=user.id, title="Test Conversation 2")

            session.add(conversation1)
            session.add(conversation2)
            await session.commit()

            # Create test messages for each conversation
            message1 = Message(conversation_id=conversation1.id, role="user", content="Hello, how are you?", model="gpt-3.5-turbo")
            message2 = Message(conversation_id=conversation1.id, role="assistant", content="I'm doing well, thank you for asking!", model="gpt-3.5-turbo")
            message3 = Message(conversation_id=conversation2.id, role="user", content="Can you tell me about the history of AI?", model="gpt-3.5-turbo")
            message4 = Message(conversation_id=conversation2.id, role="assistant", content="Sure, the history of AI is fascinating...", model="gpt-3.5-turbo")

            session.add(message1)
            session.add(message2)
            session.add(message3)
            session.add(message4)
            await session.commit()

            print("Test conversations and messages created successfully!")
        else:
            print("User not found. Please provide a valid user ID.")

async def main():
    await create_db_and_tables()
    await create_test_conversations()

if __name__ == "__main__":
    asyncio.run(main())

