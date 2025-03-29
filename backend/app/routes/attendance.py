from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database
from datetime import datetime

router = APIRouter()

@router.post("/", response_model=schemas.AttendanceResponse)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(database.get_db)):
    # Optional: Add logic to prevent duplicate attendance per day
    return crud.mark_attendance(db, attendance)
