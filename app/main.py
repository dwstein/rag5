# app/main.py

import logging

from fastapi import FastAPI
from routes import endpoints

# Create a logger instance
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Configure a handler to write log messages to the console
handler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)


app = FastAPI()

@app.get("/")
def read_root():
    logger.info("Received request for root endpoint")
    return {"Hello": "World from app/main.py on port 9000! Adjusted! With a database!"}

# Include the routes from endpoints.py
app.include_router(endpoints.router)


if __name__ == "__main__":
    logger.info("Starting the FastAPI application")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9000)