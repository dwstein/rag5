# app/langchain_stuff/simple_convo.py



from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate



# works on "app" containter which is the rag5 backend container 
llm = ChatOllama(model="phi3:3.8b", base_url="http://ollama:11434")

def joke_chain(topic):
   
    prompt = ChatPromptTemplate.from_template("Tell me a short joke about {topic}")
    chain = prompt | llm | StrOutputParser()
    response = chain.invoke({"topic": topic})
    print(response)
    return response


if __name__ == "__main__":
    joke_chain("Cats")