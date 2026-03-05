# api/index.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

print("[DEBUG] api/index.py – moduł załadowany")
print("[DEBUG] OPENAI_API_KEY obecny?", "TAK" if "OPENAI_API_KEY" in os.environ else "NIE")
print("[DEBUG] Długość klucza:", len(os.environ.get("OPENAI_API_KEY", "")))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # w produkcji zmień na ["https://www.krzysztof-marczyński.pl"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    input: str

@app.get("/test")
async def test():
    key_present = "OPENAI_API_KEY" in os.environ
    key_len = len(os.environ.get("OPENAI_API_KEY", ""))
    return {
        "status": "backend działa",
        "key_present": key_present,
        "key_length": key_len
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.environ.get("OPENAI_API_KEY")
    
    if not api_key or len(api_key) < 20:
        return {"error": "Brak poprawnego klucza OPENAI_API_KEY w zmiennych środowiskowych"}

    try:
        client = OpenAI(api_key=api_key)
        
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": request.input}],
            temperature=0.7,
            max_tokens=600,
        )
        
        return {"response": response.choices[0].message.content.strip()}
    
    except Exception as e:
        return {"error": f"Błąd OpenAI: {str(e)}"}

# Konieczne dla Vercel
handler = app

print("[DEBUG] handler ustawiony – moduł gotowy")