from datetime import datetime

from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

class Application(Base):
    __tablename__ = "applications" 

    id: Mapped[int] = mapped_column(primary_key=True)
    company: Mapped[str] = mapped_column(String(100))
    position: Mapped[str] = mapped_column(String(100))
    status: Mapped[str] = mapped_column(String(50))

    date_applied: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )
    interview_date: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )
    notes: Mapped[str | None] = mapped_column(
        String(500),
        nullable = True
    )
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False
    )
    user: Mapped["User"] = relationship(
        back_populates="applications"
    )

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))

    applications: Mapped[list["Application"]] = relationship(
        back_populates="user"
    )
    