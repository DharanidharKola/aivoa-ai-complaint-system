from datetime import date

from typing import Optional

from pydantic import BaseModel
from pydantic import EmailStr



class ComplaintBase(BaseModel):

    complaint_source: Optional[str] = None

    customer_name: Optional[str] = None

    customer_email: Optional[EmailStr] = None

    product_name: Optional[str] = None

    product_strength: Optional[str] = None

    batch_number: Optional[str] = None

    manufacturing_date: Optional[date] = None

    expiry_date: Optional[date] = None

    complaint_description: Optional[str] = None

    affected_quantity: Optional[int] = None

    risk: Optional[str] = None
class ComplaintBase(BaseModel):

    complaint_source: Optional[str] = None

    customer_name: Optional[str] = None

    customer_email: Optional[EmailStr] = None

    customer_phone: Optional[str] = None

    product_name: Optional[str] = None

    product_strength: Optional[str] = None

    batch_number: Optional[str] = None

    affected_quantity: Optional[str] = None

    manufacturing_date: Optional[date] = None

    expiry_date: Optional[date] = None

    originating_site_block: Optional[str] = None

    impacted_npm: Optional[str] = None

    complaint_category: Optional[str] = None

    complaint_description: Optional[str] = None

    structured_summary: Optional[str] = None

    risk: Optional[str] = None

    confidence: Optional[float] = None

    recommended_action: Optional[str] = None

    processing_status: Optional[str] = "Pending Triage"


class ComplaintCreate(ComplaintBase):
    pass


class ComplaintResponse(ComplaintBase):

    id: int

    class Config:

        from_attributes = True