from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("[DEBUG] api/index.py załadowany")
print("[DEBUG] OPENAI_API_KEY obecny?", "TAK" if "OPENAI_API_KEY" in os.environ else "NIE")
print("[DEBUG] Długość klucza:", len(os.environ.get("OPENAI_API_KEY", "")))

class ChatRequest(BaseModel):
    message: str

@app.get("/test")
async def test():
    return {"status": "test endpoint działa", "klucz_length": len(os.environ.get("OPENAI_API_KEY", ""))}

@app.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or len(api_key) < 40:
        return {"error": "Brak klucza OPENAI_API_KEY"}

    try:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Jesteś pomocnym AI asystentem."},
                {"role": "user", "content": request.message}
            ]
        )
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
async def root():
    return {"status": "backend działa"}