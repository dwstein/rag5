FROM python:3.11-slim

# set the working directory
WORKDIR /app

# install dependencies
COPY ../requirements.txt /app
RUN pip install --no-cache-dir --upgrade -r requirements.txt