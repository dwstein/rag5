# app/langchain/local_test.py


# 5/21/24 - this works from local environmetn hitting the ollama container at localhost:8500

from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

# works on local environemtn
# llm = ChatOllama(model="phi3:3.8b", base_url="http://localhost:8500")

# works on "app" containter which is the rag5 backend container 
llm = ChatOllama(model="phi3:3.8b", base_url="http://ollama:11434")


prompt = ChatPromptTemplate.from_template("Tell me a short joke about {topic}")


chain = prompt | llm | StrOutputParser()


print(chain.invoke({"topic": "Space travel"}))




