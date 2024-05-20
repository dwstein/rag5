import uuid
import asyncio
from models.db import User, Conversation, Message, get_async_session_endpoints
# from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone


async def populate_data():
    # Check if the user exists
    # Directly get the session using your session factory or specific function
    async with get_async_session_endpoints() as session:  # Adjust this line based on your actual session factory
        user_id = uuid.UUID("9e35373c-8cb3-4f5d-859d-a1a8ba94f10b")  # Convert string to UUID object
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
        message1 = Message(conversation_id=conversation1.id, user_id=user_id, role="user", content="Hello, how are you?", created_at=now_utc, updated_at=now_utc)
        message2 = Message(conversation_id=conversation1.id, user_id=user_id, role="assistant", content="I'm doing well, thank you for asking! I am an AI", created_at=now_utc, updated_at=now_utc)
        message3 = Message(conversation_id=conversation2.id, user_id=user_id, role="user", content="Can you help me with a travel problem?", created_at=now_utc, updated_at=now_utc)
        message4 = Message(conversation_id=conversation2.id, user_id=user_id, role="assistant", content="Sure, I'd be happy to hel with that.  Please provide more details about your problem.", created_at=now_utc, updated_at=now_utc)
        session.add_all([message1, message2, message3, message4])
        await session.commit()

        print("Test data populated successfully!")

if __name__ == "__main__":
    import asyncio
    asyncio.run(populate_data())
