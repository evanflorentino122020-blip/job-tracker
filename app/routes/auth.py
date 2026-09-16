from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import bcrypt

from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserLogin
from app.security import create_access_token, get_current_user_id

router = APIRouter()

def verify_password(password: str, password_hash: str):
    return bcrypt.checkpw(
        password.encode("utf-8"),
        password_hash.encode("utf-8")
    )

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    password_hash = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    new_user = User(
        email=user.email,
        password_hash=password_hash

    )

    db.add(new_user)

    try:
        db.commit()
        db.refresh(new_user)
    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=409,
            detail="Email already registered"
        )

    return{
        "message": "User created successfully",
        "user_id": new_user.id
    }

@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"

        )
    if not verify_password(
        user.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    access_token = create_access_token(existing_user.id)
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
}

@router.get("/me")
def get_me(user_id: int = Depends(get_current_user_id)):
    return {
        "user_id": user_id
    }