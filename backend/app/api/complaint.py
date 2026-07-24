from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import ComplaintCreate, ComplaintResponse
from .. import crud

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)


@router.post("/", response_model=ComplaintResponse)
def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    return crud.create_complaint(db, complaint)


@router.get("/", response_model=list[ComplaintResponse])
def get_all(db: Session = Depends(get_db)):
    return crud.get_all_complaints(db)


@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_one(
    complaint_id: int,
    db: Session = Depends(get_db)
):

    complaint = crud.get_complaint(db, complaint_id)

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return complaint


@router.put("/{complaint_id}", response_model=ComplaintResponse)
def update(
    complaint_id: int,
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):

    updated = crud.update_complaint(
        db,
        complaint_id,
        complaint
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return updated


@router.delete("/{complaint_id}")
def delete(
    complaint_id: int,
    db: Session = Depends(get_db)
):

    deleted = crud.delete_complaint(
        db,
        complaint_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return {
        "message": "Complaint Deleted"
    }