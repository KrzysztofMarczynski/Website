from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test")
async def test():
    return {"status": "Backend żyje bez OpenAI! 😎"}

@app.post("/chat")
async def chat():
    return {"response": "Testowa odpowiedź – OpenAI wyłączone"}

handler = app