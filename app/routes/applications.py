from fastapi import APIRouter, Depends, HTTPException

from app.database import get_db
from app.models import Application
from app.schemas import (ApplicationCreate, ApplicationResponse, ApplicationUpdate)
from app.security import get_current_user_id

router = APIRouter()


@router.get("/applications", response_model=list[ApplicationResponse])
def get_applications(db = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    applications = db.query(Application).filter(
        Application.user_id == user_id
    ).all()

    return applications

@router.post("/applications", response_model=ApplicationResponse)
def create_application(application: ApplicationCreate, db = Depends(get_db), user_id: int = Depends(get_current_user_id)):
    new_application = Application(
        company=application.company,
        position=application.position,
        status=application.status,
        date_applied=application.date_applied,
        interview_date=application.interview_date,
        notes=application.notes
    )

    db.add(new_application)
    db.commit()
    db.refresh(new_application)

    return new_application


@router.put("/applications/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application: ApplicationUpdate,
    db=Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    

    existing_application = db.query(Application).filter(
        Application.id == application_id,
        Application.user_id == user_id
    ).first()

    if existing_application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found!"
        )
        

    existing_application.company = application.company
    existing_application.position = application.position
    existing_application.status = application.status
    existing_application.date_applied = application.date_applied
    existing_application.interview_date = application.interview_date
    existing_application.notes = application.notes
    db.commit()
    db.refresh(existing_application)

    return existing_application


@router.delete("/applications/{application_id}")
def delete_application(
    application_id: int,
    db=Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):

    existing_application = db.query(Application).filter(
        Application.id == application_id,
        Application.user_id == user_id
    ).first()

    if existing_application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found!"
        )

    db.delete(existing_application)
    db.commit()
    

    return {"message": "Application deleted"}