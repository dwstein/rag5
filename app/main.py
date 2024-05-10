# app/main.py

from fastapi import FastAPI
from routes import endpoints

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World from app/main.py on port 9000! Adjusted! With a database?"}

# Include the routes from endpoints.py
app.include_router(endpoints.router)