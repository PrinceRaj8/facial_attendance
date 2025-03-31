from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, auth, face_recognition
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer

# Database Initialization
models.Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to Get DB Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Secure API with OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Home Route
@app.get("/")
def read_root():
    return {"message": "Welcome to AI Face Recognition Attendance System!"}

# User Authentication
@app.post("/auth/login")
def login(user_data: schemas.LoginRequest, db: Session = Depends(get_db)):
    return auth.authenticate_user(user_data, db)

# Register User
@app.post("/auth/register")
def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    return auth.register_user(user_data, db)

# Face Recognition & Mark Attendance
@app.post("/attendance/mark")
def mark_attendance(request: schemas.FaceRecognitionRequest, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user_id = auth.get_current_user(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    attendance_status = face_recognition.process_face_recognition(request.image, db)
    return {"status": attendance_status, "timestamp": datetime.utcnow()}

# Get Attendance Records
@app.get("/attendance/")
def get_attendance(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    auth.get_current_user(token)
    records = db.query(models.Attendance).all()
    return records
