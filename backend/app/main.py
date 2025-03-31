from fastapi import FastAPI
from app.database import engine, Base
from app.routes import auth, users, attendance

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Face Recognition Attendance API")

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])

@app.get("/")
def root():
    return {"message": "Welcome to Face Recognition Attendance System API"}
