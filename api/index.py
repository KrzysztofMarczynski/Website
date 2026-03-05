import os
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"status": "backend działa"}

@app.post("/chat")
async def chat(req: ChatRequest):

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Jesteś pomocnym AI asystentem."},
            {"role": "user", "content": req.message}
        ]
    )

    return {"response": response.choices[0].message.content}