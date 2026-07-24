from typing import TypedDict


class ComplaintState(TypedDict):

    complaint_text: str

    extracted_json: dict

    risk: str

    summary: str

    recommended_action: str

    confidence: float

    processing_status: str