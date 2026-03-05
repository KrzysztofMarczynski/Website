# api/index.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

print("[DEBUG START] api/index.py loading...")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # potem zmień na konkretną domenę
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    input: str

@app.post("/chat")
async def chat(request: ChatRequest):
    print(f"[DEBUG] Otrzymano wiadomość: {request.input}")
    return {"response": f"Echo twojej wiadomości: {request.input}. Backend działa bez OpenAI!"}

handler = app  # zostaje!

print("[DEBUG END] api/index.py loaded successfully")