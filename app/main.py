# app/main.py

import logging
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from models.users import auth_backend, fastapi_users
from models.db import create_db_and_tables
from models.schemas import UserRead, UserCreate, UserUpdate
from routes.admin_endpoints import router as admin_router
from routes.home_endpoints import router as home_router
from routes.account_endpoints import router as account_router
from config.routes import setup_routes


from contextlib import asynccontextmanager

# Create a logger instance
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

templates = Jinja2Templates(directory="templates")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app = setup_routes(app)
    # app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])
    # app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])
    # app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"])
    # app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"])
    # app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"])

    # # dev admin
    # app.include_router(admin_router, prefix="/admin", tags=["admin"])
    
    # # user pages
    # app.include_router(home_router, prefix="/home", tags=["home"])
    
    
    # app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])

  
    # app.include_router(account_router, prefix="/account", tags=["account"])
    
    return app

app = create_app()

@app.get("/")
def read_root():
    logger.info("Received request for root endpoint")
    return {"Hello": "World from app/main.py on port 9000 wiht FastAPI"}

if __name__ == "__main__":
    logger.info("Starting the FastAPI application")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
