from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
async def test():
    return {"status": "SUKCES - endpoint /test działa", "czas": "2026-03-05", "klucz_length": len(os.environ.get("OPENAI_API_KEY", ""))}

@app.get("/")
async def root():
    return {"message": "Python root OK – jeśli widzisz to, routing działa idealnie"}

print("[MIN TEST] Backend wystartował – jeśli widzisz to w logach, sukces")