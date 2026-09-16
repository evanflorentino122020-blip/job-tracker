from datetime import datetime
from enum import Enum

from pydantic import BaseModel, EmailStr, Field

class ApplicationStatus(str, Enum):
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    REJECT = "Rejected"
    OFFER = "Offer"
    ACCEPTED = "Accepted"

class ApplicationCreate(BaseModel):
    company: str = Field(min_length=1, max_length=100)
    position: str = Field(min_length=1, max_length=100)
    status: str
    date_applied: datetime
    interview_date: datetime | None = None
    notes: str | None = Field(default=None, max_length=500)

class ApplicationUpdate(BaseModel):
    company: str = Field(min_length=1, max_length=100)
    position: str = Field(min_length=1, max_length=100)
    status: ApplicationStatus
    date_applied: datetime
    interview_date: datetime | None = None
    notes: str | None = Field(default=None, max_length=500)

class ApplicationResponse(BaseModel):
    id: int
    company: str
    position: str
    status: str
    date_applied: datetime | None
    interview_date: datetime | None
    notes: str | None

    model_config = {
        "from_attributes": True
    }
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)