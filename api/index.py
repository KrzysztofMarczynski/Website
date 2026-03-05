# api/index.py
import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

print("[START] Loading api/index.py")
print(f"[DEBUG] OPENAI_API_KEY exists? {'YES' if 'OPENAI_API_KEY' in os.environ else 'NO!!!'}")
print(f"[DEBUG] OPENAI_API_KEY length: {len(os.environ.get('OPENAI_API_KEY', ''))}")

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
    return {"status": "backend alive", "key_present": 'OPENAI_API_KEY' in os.environ}

@app.post("/chat")
async def chat(request: ChatRequest):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return {"error": "OPENAI_API_KEY not set in environment variables"}

    try:
        client = OpenAI(api_key=api_key)
        print(f"[DEBUG] /chat input: {request.input[:80]}...")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": request.input}],
            temperature=0.7,
            max_tokens=800,
        )

        content = response.choices[0].message.content.strip()
        return {"response": content}

    except Exception as e:
        print(f"[ERROR] in /chat: {str(e)}")
        return {"error": str(e)}

handler = app

print("[END] Module loaded OK")