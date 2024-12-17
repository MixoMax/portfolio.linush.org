from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn


app = FastAPI()



@app.get("/")
async def read_root():
    return FileResponse("index.html")

@app.get("/{path:path}")
async def read_file(path: str):
    return FileResponse(f"./{path}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)