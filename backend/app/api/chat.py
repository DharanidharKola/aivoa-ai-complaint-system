from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..ai.graph import analyze

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/")
async def chat(request: ChatRequest):

    try:

        result = analyze(request.message)

        return {

            "success": True,

            "reply": "Complaint analyzed successfully.",

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
                95
            ),

            "recommended_action": result.get(
                "recommended_action",
                "Pending QA Review"
            )

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )