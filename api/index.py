import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

# =========================
# FASTAPI APP
# =========================

app = FastAPI(title="Chatbot Backend")

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# OPENAI CLIENT
# =========================

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# =========================
# REQUEST MODEL
# =========================

class Message(BaseModel):
    text: str

# =========================
# TEST ENDPOINT
# =========================

@app.get("/")
async def root():
    return {"status": "Backend działa 🚀"}

# =========================
# CHAT ENDPOINT
# =========================

@app.post("/api/chat")
async def chat(message: Message):

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "Jesteś pomocnym chatbotem."
                },
                {
                    "role": "user",
                    "content": message.text
                }
            ]
        )

        reply = response.choices[0].message.content

        return {
            "reply": reply
        }

    except Exception as e:
        return {
            "error": str(e)
        }
