# app/langchain_stuff/langchain_services/basic_stream_chat.py

# as of 7/0/24 - working on creating streaming chat. i.e. stream responses from the llm

import os
import sys

current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
app_dir = os.path.dirname(parent_dir)
sys.path.append(app_dir)



# funtions needed for simple conversaiton with not RAG. Just chatting with Ollama.
import asyncio
from uuid import UUID

from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate,
    SystemMessagePromptTemplate
)

from models.db import Message, get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select










# works on "app" containter which is the rag5 backend container 
# *** used by conversation_endpoints.py ***
llm = ChatOllama(model="phi3:3.8b", base_url="http://ollama:11434")






async def chat_with_history_stream(new_message, user_id, conversation_id, db: AsyncSession, message_history=None):
    
     # Ensure conversation_id is a UUID
    if isinstance(conversation_id, str):
        conversation_id = UUID(conversation_id)
    
    
    # Initialize message_history if it is None
    if message_history is None:
        # Retrieve the message history from the database based on the conversation_id
        messages = await db.execute(
            select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)
        )
        message_history = [
            SystemMessagePromptTemplate.from_template("You are a helpful assistant.")
        ]
        for message in messages.scalars():
            if message.role == "user":
                message_history.append(HumanMessagePromptTemplate.from_template(message.content))
            elif message.role == "assistant":
                message_history.append(AIMessagePromptTemplate.from_template(message.content))
 
    # Add the new message to the message history
    message_history.append(HumanMessagePromptTemplate.from_template(new_message))

    # Create a new Message object for the user's message and add it to the database
    user_message = Message(
        conversation_id=conversation_id,
        role="user",
        content=new_message,
        user_id=user_id
    )
    db.add(user_message)
    await db.commit()
    await db.refresh(user_message)



    # Create a ChatPromptTemplate from the message history
    prompt = ChatPromptTemplate.from_messages(message_history)

    # Send the prompt to the LLM and get the response
    response = llm.invoke(prompt.format_messages()).content

    # Add the LLM's response to the message history
    message_history.append(AIMessagePromptTemplate.from_template(response))

    # Create a new Message object for the LLM's response and add it to the database
    assistant_message = Message(
        conversation_id=conversation_id,
        role="assistant",
        content=response,
        user_id=user_id
    )
    db.add(assistant_message)
    await db.commit()
    await db.refresh(assistant_message)

    return response, message_history


# this is for running from within the container itself to test
# the chat_with_history function
async def local_test_func():
    # Example user ID and conversation ID
    user_id = UUID("5f6239dc-9d1d-419f-b8d3-feeb4e8af16d")  # Replace with a valid user ID
    conversation_id = UUID("2211eb3a-ae84-4fa2-a58c-275508feaafc")  # Replace with a valid conversation ID

    # Start the conversation
    message_history = None
    while True:
        user_input = input("User: ")
        if user_input.lower() == 'quit':
            break

        # Call the chat_with_history function
        async for db in get_async_session():
            response, message_history = await chat_with_history_stream(
                new_message=user_input,
                user_id=user_id,
                conversation_id=conversation_id,
                db=db,
                message_history=message_history
            )
            print(f"Assistant: {response}")



if __name__ == "__main__":

    asyncio.run(local_test_func())