from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
async def test():
    return {"status": "minimalny backend działa", "test": "2026-03-05"}

@app.get("/")
async def root():
    return {"message": "API root OK"}

@app.get("/api/index.py")
async def root():
    return {"message": "API root OK"}