# app/routes/endpoints.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
# from sqlalchemy import create_engine
from models.models_file import User, Base, engine, get_db
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

