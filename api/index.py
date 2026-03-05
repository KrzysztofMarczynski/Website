# api/index.py – wersja minimalna + debug + OpenAI w funkcji
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

print("[DEBUG] api/index.py załadowany pomyślnie")
print("[DEBUG] OPENAI_API_KEY obecny?", "TAK" if "OPENAI_API_KEY" in os.environ else "NIE")
print("[DEBUG] Długość klucza:", len(os.environ.get("OPENAI_API_KEY", "")))

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

@app.get("/test")
async def test():
    return {
        "status": "backend żyje",
        "key_present": "OPENAI_API_KEY" in os.environ,
        "key_length": len(os.environ.get("OPENAI_API_KEY", "")),
        "message": "Jeśli widzisz ten JSON → backend działa"
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    print(f"[DEBUG] Otrzymano wiadomość: {request.input[:100]}...")
    
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or len(api_key) < 40:
        return {"error": "Brak poprawnego klucza OPENAI_API_KEY"}

    try:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": request.input}],
            temperature=0.7,
            max_tokens=600,
        )
        content = response.choices[0].message.content.strip()
        print("[DEBUG] Odpowiedź GPT:", content[:100] + "..." if len(content) > 100 else content)
        return {"response": content}
    except Exception as e:
        print(f"[ERROR] Błąd w /chat: {str(e)}")
        return {"error": f"Błąd OpenAI: {str(e)}"}