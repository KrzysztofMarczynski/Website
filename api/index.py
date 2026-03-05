from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

@app.get("/api/test")
async def test():
    return {"status": "ok"}

@app.post("/chat")
async def chat(request: ChatRequest):
    return {"response": f"Echo: {request.input}"}