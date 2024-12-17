from fastapi import FastAPI
from fastapi.responses import FileResponse
import uvicorn
import sys

app = FastAPI()



@app.get("/")
async def read_root():
    return FileResponse("index.html")

@app.get("/{path:path}")
async def read_file(path: str):
    return FileResponse(f"./{path}")


if __name__ == "__main__":
    argv = sys.argv
    argc = len(argv)
    if argc == 2:
        port_num = int(argv[1])
    else:
        port_num = 8000

    uvicorn.run(app, host="0.0.0.0", port=port_num)