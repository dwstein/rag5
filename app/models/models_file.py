import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()

class User(Base):
    """
    User model for storing user information.
    """
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)
    notes = Column(String)

    def __repr__(self) -> str:
        return f"User(email='{self.email}', password='{self.password}', notes='{self.notes}')"

# Create the database engine
engine = sqlalchemy.create_engine('sqlite:////database/app.db')

# Create the database tables (if they don't exist)
Base.metadata.create_all(engine)
