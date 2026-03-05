from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
async def test():
    return {"status": "minimalny backend działa", "test": "2026-03-05"}

@app.get("/")
async def root():
    return {"message": "Python root OK – routing działa"}

print("[MIN TEST] Backend wystartował – jeśli widzisz to w logach, sukces")