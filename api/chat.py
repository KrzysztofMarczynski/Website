from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from mangum import Mangum  # adapter FastAPI -> serverless

client = OpenAI()

app = FastAPI()

class ChatRequest(BaseModel):
    input: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": request.input}]
    )
    return {"response": response.choices[0].message.content}

handler = Mangum(app)  # Vercel serverless handler
