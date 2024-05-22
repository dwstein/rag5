# app/langchain_stuff/langchain_services/basic_chat.py


# funtions needed for simple conversaiton with not RAG. Just chatting with Ollama.

from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    AIMessagePromptTemplate
)

# works on "app" containter which is the rag5 backend container 
llm = ChatOllama(model="phi3:3.8b", base_url="http://ollama:11434")

def chat_with_history(new_message, message_history):
    
    # Initialize message_history if it is None
    if message_history is None:
        message_history = [
            AIMessagePromptTemplate.from_template("You are a helpful assistant.")
        ]
    else:
        # Check if the message_history is empty
        if not message_history:
            # Add the initial AI message to the message history
            message_history.append(AIMessagePromptTemplate.from_template("You are a helpful assistant."))
    
    
    # Add the new message to the message history
    message_history.append(HumanMessagePromptTemplate.from_template(new_message))

    # Create a ChatPromptTemplate from the message history
    prompt = ChatPromptTemplate.from_messages(message_history)

    # Send the prompt to the LLM and get the response
    response = llm.invoke(prompt.format_messages()).content

    # Add the LLM's response to the message history
    message_history.append(AIMessagePromptTemplate.from_template(response))

    return response, message_history


# def basic_chat(topic):
#     prompt = ChatPromptTemplate.from_template("Tell me a short joke about {topic}")
#     chain = prompt | llm | StrOutputParser()
#     response = chain.invoke({"topic": topic})
#     print(response)
#     return response


if __name__ == "__main__":
    # basic_chat("Cats")
     # Example usage of chat_with_history
    message_history = None

    while True:
        user_input = input("User: ")
        if user_input.lower() == 'quit':
            break
        response, message_history = chat_with_history(user_input, message_history)
        print(f"Assistant: {response}")