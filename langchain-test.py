from langchain_community.llms import Ollama

print("langchain-test.py running")

llm = Ollama(model="phi3:3.8b", base_url="http://localhost:8500")

print(f"llm is {llm}")

response = llm.invoke("what is a dog?")

print(f"response is {response}")

