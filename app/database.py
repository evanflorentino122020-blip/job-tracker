from sqlalchemy import create_engine, String
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = "postgresql+psycopg://jobtracker:jobtracker@db:5432/job_tracker"

engine = create_engine(DATABASE_URL)

class Base(DeclarativeBase):
    pass



SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()





