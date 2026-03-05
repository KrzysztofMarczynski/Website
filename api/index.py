from fastapi import FastAPI

app = FastAPI()

@app.get("/test")
def test():
    return {"message": "Backend minimalny działa!"}

handler = app  # obowiązkowe