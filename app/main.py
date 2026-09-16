from fastapi import FastAPI

from app.routes.applications import router as applications_router
from app.routes.auth import router as auth_router


app = FastAPI()


@app.get("/")
def home():
    return {"message": "Job Tracker API seems to be running!"}

app.include_router(applications_router)
app.include_router(auth_router)