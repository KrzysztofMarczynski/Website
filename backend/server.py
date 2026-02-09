from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from dotenv import load_dotenv
import os

# ===== Wczytanie klucza z .env =====
load_dotenv()  # automatycznie ładuje plik .env z folderu projektu
OPENAI_KEY = os.getenv("OPENAI_KEY")
print("OPENAI_KEY LOADED =", bool(OPENAI_KEY))

client = OpenAI(api_key=OPENAI_KEY)

# ===== FastAPI =====
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    input: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": request.input}]
    )
    return {"response": response.choices[0].message.content}
