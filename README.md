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


### Front End
- using react
- webpack.confif.js - the devServer has a proxy to the backend where context has the variouls routes that match the routes in config/routes.py. e.g. `context: ['/api', '/auth', '/users', '/admin', '/home', '/convo'], // Proxy all backend routes`

## FastAPI-Users
- https://fastapi-users.github.io/fastapi-users/latest/installation/
- https://fastapi-users.github.io/fastapi-users/latest/configuration/full-example/#__tabbed_1_2
- https://github.com/fastapi-users/fastapi-users/tree/master/examples/sqlalchemy

## Langchain
- Conceptual Guide:  https://python.langchain.com/v0.2/docs/concepts/#langgraph
- https://python.langchain.com/v0.1/docs/use_cases/question_answering/chat_history/#setup
- https://python.langchain.com/v0.1/docs/expression_language/how_to/message_history/
- https://python.langchain.com/v0.2/docs/concepts/#prompt-templates
- https://api.python.langchain.com/en/latest/prompts/langchain_core.prompts.chat.ChatPromptTemplate.html

## SQLAlchemy
- DeclaritiveBase - https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.DeclarativeBase

- registry - https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.registry


## Project Description

Create an API that can deployed on Docker that offers private use of Ollama models. The Ollama models will be stored on a volume and the API will be run on a separate container with the following features:

- User accounts - simple email and password
- Conversation Tracker
- Employ Langchain to use the LLMs
- Employ some combination of databases to store documents and the vector files
