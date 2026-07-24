from sqlalchemy.orm import Session
from .models import Complaint
from .schemas import ComplaintCreate


def create_complaint(db: Session, complaint: ComplaintCreate):
    db_complaint = Complaint(**complaint.model_dump())

    db.add(db_complaint)
    db.commit()
    db.refresh(db_complaint)

    return db_complaint


def get_all_complaints(db: Session):
    return db.query(Complaint).all()


def get_complaint(db: Session, complaint_id: int):
    return (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )


def update_complaint(db: Session, complaint_id: int, complaint: ComplaintCreate):

    db_obj = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if not db_obj:
        return None

    for key, value in complaint.model_dump().items():
        setattr(db_obj, key, value)

    db.commit()
    db.refresh(db_obj)

    return db_obj


def delete_complaint(db: Session, complaint_id: int):

    db_obj = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if not db_obj:
        return None

    db.delete(db_obj)
    db.commit()

    return db_obj