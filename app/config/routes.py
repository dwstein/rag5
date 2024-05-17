# app/config/routes.py

from fastapi import FastAPI
from models.users import auth_backend, fastapi_users
from models.schemas import UserRead, UserCreate, UserUpdate
from endpoints.admin_endpoints import router as admin_router
from endpoints.home_endpoints import router as home_router



def setup_routes(app: FastAPI) -> FastAPI:
    app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
    app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])
    app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"])
    app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"])
    app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"])

    # dev admin
    app.include_router(admin_router, prefix="/admin", tags=["admin"])

    # user pages
    app.include_router(home_router, prefix="/home", tags=["home"])

    # app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])

    # removing this route, cured an error that wouldn't show http://localhost:9000/docs
    # app.include_router(account_router, prefix="/account", tags=["account"]) # account/signup
    
    # app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]) #account login


    return app
