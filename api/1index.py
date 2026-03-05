# api/index.py
import os
import sys

print("[DEBUG] Starting api/index.py - imports begin")
print(f"[DEBUG] Python version: {sys.version}")
print(f"[DEBUG] Current working dir: {os.getcwd()}")
print(f"[DEBUG] OPENAI_API_KEY exists? {'yes' if 'OPENAI_API_KEY' in os.environ else 'NO!!!'}")

try:
    from fastapi import FastAPI
    from pydantic import BaseModel
    from fastapi.middleware.cors import CORSMiddleware
    from openai import OpenAI
    print("[DEBUG] All imports successful")
except Exception as e:
    print(f"[DEBUG] IMPORT ERROR: {str(e)}")
    raise  # niech Vercel zobaczy błąd

client = OpenAI()  # tu może spaść jeśli brak klucza

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
    try:
        print("[DEBUG] /chat called with input:", request.input)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": request.input}],
        )
        return {"response": response.choices[0].message.content}
    except Exception as e:
        print(f"[ERROR] in /chat: {str(e)}")
        return {"error": str(e)}

# To jest CRUCIALNE dla Vercela!
handler = app

print("[DEBUG] File loaded successfully - handler set")