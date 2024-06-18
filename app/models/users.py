# app/models/users.py


import uuid
from typing import Optional
import os
from dotenv import load_dotenv
import logging

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase

from models.db import User, get_user_db


logger=logging.getLogger(__name__)


dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
print("Resolved .env path:", dotenv_path)  # This should point to the correct .env file location
load_dotenv(dotenv_path=dotenv_path)


SECRET = os.getenv("SECRET_KEY")
# print(f"SECRET is {SECRET}")



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
    # print(f"get_user_manager: {user_db}")
    yield UserManager(user_db)


    """
    So, I'm trying to understand the FastAPIUsers dependency injection.
    
    bearer_transport -> 
    auth_backend -> 
    fastapi_users -> 
    current_active_user -> endpoint
    
    
    bearer_transport is a BearerTransport instance that is used 
    to actaully get the token and validate it.  It extracts the token
    from the Authorization header. 
    * (AuthenticationBackend) The token is passed to the JWT strategy to validate it.  
    * If the tokenn is valied, the user ID is extracted from the tokne.
    
    fastapi_users.current_user method uses the extracted user ID
    to fetch teh user from the database.
    * it checks teh uer's status (since active=True)
    * if the user is active, the user object is returned, otherwise
    an authenticaiton error is raised.
    
    current_active_user is a dependency that is used in the endpoint
    
    """

bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

# fastapi_users is an instance of FastAPIUsers that provides user management functionality
# It is initialized with the get_user_manager dependency and auth_backend for authentication

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])


# dependency is defined to be used in route functions to ensure 
# that only authenticated and active users can access certain API endpoints.
current_active_user = fastapi_users.current_user(active=True)


# Define a new dependency that allows unauthenticated access
async def get_current_user_optional(
    request: Request,
    user_db: SQLAlchemyUserDatabase = Depends(get_user_db),
    jwt_strategy: JWTStrategy = Depends(get_jwt_strategy),
) -> Optional[User]:
    token = request.cookies.get("Authorization") or request.headers.get("Authorization")
    if token:
        token = token.replace("Bearer ", "")
        try:
            user = await fastapi_users.get_current_user(token, user_db, jwt_strategy)
            return user
        except Exception:
            return None
    return None