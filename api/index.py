# api/index.py
import os
import sys
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI, OpenAIError

# ────────────────────────────────────────────────
# Debug – te linie pomogą nam zobaczyć, co się dzieje
# ────────────────────────────────────────────────
print("[START] api/index.py – loading module")
print(f"[DEBUG] Python version: {sys.version}")
print(f"[DEBUG] Current dir: {os.getcwd()}")
print(f"[DEBUG] OPENAI_API_KEY exists? {'YES' if 'OPENAI_API_KEY' in os.environ else 'NO!!!'}")
print(f"[DEBUG] OPENAI_API_KEY length: {len(os.environ.get('OPENAI_API_KEY', ''))}")

# ────────────────────────────────────────────────
# Inicjalizacja klienta OpenAI z obsługą błędów
# ────────────────────────────────────────────────
client = None
try:
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    print("[DEBUG] OpenAI client initialized successfully")
except OpenAIError as e:
    print(f"[CRITICAL] OpenAI authentication error: {str(e)}")
    raise
except Exception as e:
    print(f"[CRITICAL] Unexpected error during OpenAI init: {str(e)}")
    raise

# ────────────────────────────────────────────────
# Aplikacja FastAPI
# ────────────────────────────────────────────────
app = FastAPI(title="Simple Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],           # ← w produkcji lepiej ograniczyć do swojej domeny
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    input: str

@app.get("/test")
async def test_endpoint():
    """Prosty endpoint do sprawdzenia, czy backend żyje"""
    return {"status": "ok", "message": "Backend działa poprawnie 🚀"}

@app.post("/chat")
async def chat(request: ChatRequest):
    """Główny endpoint czatu – wysyła wiadomość do GPT-4o-mini"""
    if not client:
        return {"error": "OpenAI client not initialized – check logs"}

    try:
        print(f"[DEBUG] /chat called with: {request.input[:100]!r}")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "user", "content": request.input}
            ],
            temperature=0.7,
            max_tokens=1024,
        )

        content = response.choices[0].message.content.strip()
        print("[DEBUG] Odpowiedź od OpenAI:", content[:100] + "..." if len(content) > 100 else content)

        return {"response": content}

    except OpenAIError as e:
        error_msg = str(e)
        print(f"[ERROR] OpenAI API error: {error_msg}")
        return {"error": f"OpenAI error: {error_msg}"}

    except Exception as e:
        print(f"[ERROR] Unexpected error in /chat: {str(e)}")
        return {"error": "Internal server error – check Vercel logs"}

# ────────────────────────────────────────────────
# Wymagane przez Vercel dla Python serverless
# ────────────────────────────────────────────────
handler = app

print("[END] api/index.py loaded successfully")