from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.applications import router as applications_router
from app.routes.auth import router as auth_router


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Job Tracker API seems to be running!"}

app.include_router(applications_router)
app.include_router(auth_router)