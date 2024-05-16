# app/models/users.py


import uuid
from typing import Optional
import os
from dotenv import load_dotenv

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase

from models.db import User, get_user_db


dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
print("Resolved .env path:", dotenv_path)  # This should point to the correct .env file location
load_dotenv(dotenv_path=dotenv_path)


SECRET = os.getenv("SECRET_KEY")
print(f"SECRET is {SECRET}")


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


# provides a dependency that creates and yields an instance of UserManager, 
# configured with the user database interface. This manager handles the creation, 
# updating, and verification of user accounts.
async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])


# dependency is defined to be used in route functions to ensure 
# that only authenticated and active users can access certain API endpoints.
current_active_user = fastapi_users.current_user(active=True)