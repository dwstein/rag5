# app/main.py

import logging
from fastapi import FastAPI
from models.users import auth_backend, fastapi_users
from models.db import create_db_and_tables
from models.schemas import UserRead, UserCreate, UserUpdate
from routes.admin_endpoints import router
from contextlib import asynccontextmanager

# Create a logger instance
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
    app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])
    app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"])
    app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"])
    app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"])

    # dev admin
    app.include_router(router, prefix="/admin", tags=["admin"])
    return app

app = create_app()

@app.get("/")
def read_root():
    logger.info("Received request for root endpoint")
    return {"Hello": "World from app/main.py on port 9000! Adjusted! With a database!"}

if __name__ == "__main__":
    logger.info("Starting the FastAPI application")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
