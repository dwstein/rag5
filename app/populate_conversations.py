import uuid
import asyncio
from models.db import User, Conversation, Message, get_async_session_endpoints
# from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone


async def populate_data():
    # Check if the user exists
    # Directly get the session using your session factory or specific function
    async with get_async_session_endpoints() as session:  # Adjust this line based on your actual session factory
        user_id = uuid.UUID("8cede4d2-1dd2-43c6-b188-01cd76d42749")  # Convert string to UUID object
        user = await session.get(User, user_id)
        if not user:
            print(f"No user found with ID {user_id}")
            return  # Exit if user does not exist

        # Add conversations
        now_utc = datetime.now(timezone.utc)
        conversation1 = Conversation(title="Conversation 1", user_id=user_id, created_at=now_utc, updated_at=now_utc)
        conversation2 = Conversation(title="Conversation 2", user_id=user_id, created_at=now_utc, updated_at=now_utc)
        session.add_all([conversation1, conversation2])
        await session.commit()

        # Add messages
        message1 = Message(conversation_id=conversation1.id, role="user", content="Hello, how are you?", created_at=datetime.utcnow(), user_id=user_id)
        message2 = Message(conversation_id=conversation1.id, role="assistant", content="I'm doing well, thank you for asking!", created_at=datetime.utcnow(), user_id=user_id)
        message3 = Message(conversation_id=conversation2.id, role="user", content="Can you help me with a coding problem?", created_at=datetime.utcnow(), user_id=user_id)
        message4 = Message(conversation_id=conversation2.id, role="assistant", content="Sure, I'd be happy to help. Please provide more details about your problem.", created_at=datetime.utcnow(), user_id=user_id)
        session.add_all([message1, message2, message3, message4])
        await session.commit()

        print("Test data populated successfully!")

if __name__ == "__main__":
    import asyncio
    asyncio.run(populate_data())
