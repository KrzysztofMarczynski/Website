import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

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
    return {
        "status": "backend działa",
        "klucz_length": len(os.environ.get("OPENAI_API_KEY", ""))
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or len(api_key) < 40:
        return {"error": "Brak poprawnego klucza OPENAI_API_KEY"}

    try:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Jesteś pomocnym AI asystentem."},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=500,
        )
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}