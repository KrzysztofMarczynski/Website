from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
async def test():
    return {
        "status": "minimalny backend działa",
        "test": "2026-03-05",
        "klucz_length": len(os.environ.get("OPENAI_API_KEY", ""))
    }

print("[MIN TEST] Backend wystartował – jeśli widzisz to w logach, sukces")