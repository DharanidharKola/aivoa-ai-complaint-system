from fastapi import APIRouter, UploadFile, File, HTTPException

from ..services.parser import PDFParser
from ..ai.graph import analyze

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        # Validate file
        if file.filename is None:
            raise HTTPException(
                status_code=400,
                detail="No file selected."
            )

        # Optional file type validation
        allowed_extensions = (".pdf", ".doc", ".docx", ".txt")

        if not file.filename.lower().endswith(allowed_extensions):
            raise HTTPException(
                status_code=400,
                detail="Only PDF, DOC, DOCX and TXT files are supported."
            )

        # Extract text
        text = PDFParser.extract(file)

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Unable to extract text from document."
            )

        # AI Analysis
        result = analyze(text)

        return {

            "success": True,

            "complaint": result.get(
                "extracted_json",
                {}
            ),

            "risk": result.get(
                "risk",
                "Unknown"
            ),

            "summary": result.get(
                "summary",
                ""
            ),

            "confidence": result.get(
                "confidence",
                0
            ),

            "recommended_action": result.get(
                "recommended_action",
                "Pending QA Review"
            ),

            "complaint_text": text

        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Document processing failed: {str(e)}"
        )