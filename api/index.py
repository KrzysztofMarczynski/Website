# api/index.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

print("[DEBUG] api/index.py loaded")
print("[DEBUG] OPENAI_API_KEY present?", "YES" if "OPENAI_API_KEY" in os.environ else "NO")
print("[DEBUG] Key length:", len(os.environ.get("OPENAI_API_KEY", "")))

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
        "status": "alive",
        "key_present": "OPENAI_API_KEY" in os.environ,
        "key_length": len(os.environ.get("OPENAI_API_KEY", ""))
    }

@app.post("/chat")
async def chat(request: ChatRequest):
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        return {"error": "No OPENAI_API_KEY set"}

    client = OpenAI(api_key=key)
    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": request.input}],
        )
        return {"response": resp.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}
