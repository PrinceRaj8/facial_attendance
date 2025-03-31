from fastapi import FastAPI
from app.routers import auth, attendance
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Routers
app.include_router(auth.router)
app.include_router(attendance.router)

@app.get("/")
def home():
    return {"message": "Face Recognition Attendance System API is running!"}
