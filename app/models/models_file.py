# app/models/models_file.py

import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from sqlalchemy.dialects.postgresql import UUID
import uuid

# Create the database engine
engine = sqlalchemy.create_engine('sqlite:////database/app.db')

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








# Create the database tables (if they don't exist)
Base.metadata.create_all(engine)
