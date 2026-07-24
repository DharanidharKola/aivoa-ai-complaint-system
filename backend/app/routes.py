from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import UploadFile, File
from .file_parser import extract_text_from_pdf
from .ai.graph import analyze_complaint

from .database import get_db
from . import crud, schemas

router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.post("/", response_model=schemas.ComplaintResponse)
def create_complaint(
    complaint: schemas.ComplaintCreate,
    db: Session = Depends(get_db)
):
    return crud.create_complaint(db, complaint)


@router.get("/", response_model=list[schemas.ComplaintResponse])
def get_complaints(db: Session = Depends(get_db)):
    return crud.get_all_complaints(db)


@router.get("/{complaint_id}", response_model=schemas.ComplaintResponse)
def get_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = crud.get_complaint(db, complaint_id)

    if complaint is None:
        raise HTTPException(status_code=404, detail="Complaint not found")

    return complaint


@router.put("/{complaint_id}", response_model=schemas.ComplaintResponse)
def update_complaint(
    complaint_id: int,
    complaint: schemas.ComplaintCreate,
    db: Session = Depends(get_db)
):
    updated = crud.update_complaint(db, complaint_id, complaint)

    if updated is None:
        raise HTTPException(status_code=404, detail="Complaint not found")

    return updated


@router.delete("/{complaint_id}")
def delete_complaint(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    deleted = crud.delete_complaint(db, complaint_id)

    if deleted is None:
        raise HTTPException(status_code=404, detail="Complaint not found")

    return {"message": "Complaint deleted successfully"}


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file)

    ai_result = analyze_complaint(text)

    return {
        "raw_text": text,
        "analysis": ai_result
    }