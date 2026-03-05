from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "Python root działa – jeśli widzisz to, routing OK"}

@app.get("/test")
async def test():
    return {"status": "minimalny backend działa", "test": "2026-03-05"}

@app.get("/")
async def root():
    return {"message": "API root OK"}