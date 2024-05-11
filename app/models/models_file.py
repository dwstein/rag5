# app/models/models_file.py

import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import Session, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

# Create the database engine
engine = sqlalchemy.create_engine('sqlite:////database/app.db')
print("This is the database url: " + str(engine.url))


# Create the declarative base
Base = declarative_base()

def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()

class User(Base):
    """
    User model for storing user information.
    """
    __tablename__ = 'users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String)
    password = Column(String)
    notes = Column(String)

    def __repr__(self) -> str:
        return f"User(email='{self.email}', password='{self.password}', notes='{self.notes}')"


class Conversation(Base):
    """
    Conversation model for storing conversations between users and LLMs.
    """
    __tablename__ = 'conversations'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    title = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    user = relationship('User', backref='conversations')
    messages = relationship('Message', backref='conversation')

    def __repr__(self) -> str:
        return f"Conversation(title='{self.title}', user_id='{self.user_id}')"

class Message(Base):
    """
    Message model for storing individual messages within a conversation.
    """
    __tablename__ = 'messages'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey('conversations.id'))
    role = Column(String)
    content = Column(Text)
    model = Column(String)
    images = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"Message(role='{self.role}', content='{self.content[:20]}...', model='{self.model}')"






# Create the database tables (if they don't exist)
Base.metadata.create_all(engine)
