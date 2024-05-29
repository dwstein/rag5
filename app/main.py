# app/main.py

import logging
from datetime import datetime
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from models.users import auth_backend, fastapi_users
from models.db import create_db_and_tables
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
    for route in app.routes:
        print(f"route.path: {route.path}")

    return app

app = create_app()

@app.get("/")
def read_root():
    logger.info("Received request for root endpoint")
    return {"Hello": "World from app/main.py on port 9000 with FastAPI", "datetime": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

@app.get("/health")
def health_check():
    return {"status": "ok"}

from typing import List
from models.conversation_schemas import (
    MessageCreate,
    MessageResponse,
    SafeMessageResponse,
    ConversationCreate,
    ConversationResponse
)
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from models.db import Message, get_async_session
from sqlalchemy import select


@app.get("/safe-messages", response_model=List[SafeMessageResponse])
async def read_all_messages(session: AsyncSession = Depends(get_async_session)):
    logger.info("Received request for all messages")
    result = await session.execute(select(Message))
    messages = result.scalars().all()
    return messages

if __name__ == "__main__":
    logger.info("Starting the FastAPI application")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)
