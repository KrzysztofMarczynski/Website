from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from openai import OpenAI

app = FastAPI(title="Kolory Chat Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Message(BaseModel):
    text: str


@app.get("/api/test")
async def test():
    return {"status": "Backend działa 😎"}


@app.post("/api/chat")
async def chat(message: Message):

    user_text = message.text

    print("Otrzymano:", user_text)

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Jesteś pomocnym chatbotem."},
            {"role": "user", "content": user_text}
        ]
    )

    reply = completion.choices[0].message.content

    return {"reply": reply}