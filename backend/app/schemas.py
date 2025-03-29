from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    is_admin: bool

    class Config:
        orm_mode = True

class AttendanceCreate(BaseModel):
    user_id: int

class AttendanceResponse(BaseModel):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        orm_mode = True
