# app/routes/endpoints.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
# from sqlalchemy import create_engine
from models.models_file import User, Conversation, Message, Base, engine, get_db
from uuid import UUID


router = APIRouter()

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    """
    Retrieve a list of all users from the database.
    """
    users = db.query(User).all()
    return [
        {
            "id": user.id,
            "email": user.email,
            "password": user.password,
            "notes": user.notes,
        }
        for user in users
    ]

@router.get("/users/{user_id}")
def get_user(user_id: UUID, db: Session = Depends(get_db)):
    """
    Retrieve a single user from the database by ID.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        return {
            "id": str(user.id),
            "email": user.email,
            "password": user.password,
            "notes": user.notes,
        }
    else:
        return {"error": "User not found"}



@router.get("/conversations")
def get_conversations(db: Session = Depends(get_db)):
    """
    Retrieve a list of all conversations from the database.
    """
    conversations = db.query(Conversation).all()
    return [
        {
            "id": str(conversation.id),
            "user_id": str(conversation.user_id),
            "title": conversation.title,
            "created_at": conversation.created_at.isoformat(),
            "updated_at": conversation.updated_at.isoformat(),
        }
        for conversation in conversations
    ]

@router.get("/messages")
def get_messages(db: Session = Depends(get_db)):
    """
    Retrieve a list of all messages from the database.
    """
    messages = db.query(Message).all()
    return [
        {
            "id": str(message.id),
            "conversation_id": str(message.conversation_id),
            "role": message.role,
            "content": message.content,
            "model": message.model,
            "images": message.images,
            "created_at": message.created_at.isoformat(),
        }
        for message in messages
    ]