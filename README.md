### RAG5 - Ollama, Docker, FastAPI, & Langchain

This is a project for me to learn serveral thing at once
- python
- Docker
- FastAPI
- Langchain
- SQLite
- Vector databses
- Project archetecture

Feel free to jump in with suggestions and/or observations.  I'm learning as I go.

### FastAPI-Users
- https://fastapi-users.github.io/fastapi-users/latest/installation/
- https://fastapi-users.github.io/fastapi-users/latest/configuration/full-example/#__tabbed_1_2
- https://github.com/fastapi-users/fastapi-users/tree/master/examples/sqlalchemy


## Project Description

Create an API that can deployed on Docker that offers private use of Ollama models. The Ollama models will be stored on a volume and the API will be run on a separate container with the following features:

- User accounts - simple email and password
- Conversation Tracker
- Employ Langchain to use the LLMs
- Employ some combination of databases to store documents and the vector files
