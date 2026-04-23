import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI(title="Kolory Chat Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("[DEBUG] api/index.py załadowany")
print("[DEBUG] OPENAI_API_KEY obecny?", "TAK" if "OPENAI_API_KEY" in os.environ else "NIE")
print("[DEBUG] Długość klucza:", len(os.environ.get("OPENAI_API_KEY", "")))

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class Message(BaseModel):
    text: str


@app.get("/api/test")
async def test():
    print("[DEBUG] Endpoint /api/test wywołany")
    return {
        "status": "Backend działa 😎",
        "klucz_length": len(os.environ.get("OPENAI_API_KEY", ""))
    }


@app.post("/api/chat")
async def chat(message: Message):

    user_text = message.text

    print("[DEBUG] Endpoint /api/chat wywołany")
    print("[DEBUG] Otrzymano:", user_text[:100])

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or len(api_key) < 40:
        return {"error": "Brak poprawnego klucza OPENAI_API_KEY"}

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Jesteś pomocnym chatbotem."},
                {"role": "user", "content": user_text}
            ]
        )

        reply = completion.choices[0].message.content

        print("[DEBUG] Odpowiedź GPT:", reply[:100])

        return {"reply": reply}

    except Exception as e:
        print("[ERROR] Błąd w /api/chat:", str(e))
        return {"error": str(e)}