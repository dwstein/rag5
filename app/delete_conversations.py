# app/delete_conversations.py

import asyncio
from models.db import Conversation, get_async_session_endpoints
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

async def delete_conversations_without_user():
    async with get_async_session_endpoints() as session:
        # Select conversations where user_id is null
        conversations_without_user = await session.execute(
            select(Conversation).where(Conversation.user_id.is_(None))
        )
        conversations_to_delete = conversations_without_user.scalars().all()

        if conversations_to_delete:
            # Delete the conversations
            for conversation in conversations_to_delete:
                await session.delete(conversation)
            await session.commit()
            print(f"Deleted {len(conversations_to_delete)} conversations without a user_id.")
        else:
            print("No conversations found without a user_id.")

if __name__ == "__main__":
    asyncio.run(delete_conversations_without_user())
