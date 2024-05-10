# app/routes/endpoints.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from models.models_file import User, Base, engine

# Create the database engine
# engine = create_engine('sqlite:////database/app.db')

# Create the database tables (if they don't exist)
# Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()

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
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single user from the database by ID.
    """
    user = db.query(User).get(user_id)
    if user:
        return {
            "id": user.id,
            "email": user.email,
            "password": user.password,
            "notes": user.notes,
        }
    else:
        return {"error": "User not found"}

