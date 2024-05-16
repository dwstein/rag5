# app/routes/home_endpoints.py

from fastapi import APIRouter
from fastapi.responses import HTMLResponse
import os

router = APIRouter()

@router.get("/", response_class=HTMLResponse)
def home():
    # Assuming your FastAPI app is structured with the 'templates' folder at the root
    current_directory = os.path.dirname(os.path.realpath(__file__))
    html_file_path = os.path.join(current_directory, '..', 'templates', 'home.html')
    
    with open(html_file_path, 'r', encoding='utf-8') as html_file:
        html_content = html_file.read()
    
    return HTMLResponse(content=html_content)
