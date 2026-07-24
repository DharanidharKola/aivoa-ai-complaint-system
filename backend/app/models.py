from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Date,Float,DateTime

from .database import Base


class Complaint(Base):

    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    product_name = Column(String)
    batch_number = Column(String)
    product_strength = Column(String)
    affected_quantity = Column(String)

    manufacturing_date = Column(Date)
    expiry_date = Column(Date)

    originating_site_block = Column(String)
    impacted_npm = Column(String)

    complaint_source = Column(String)

    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)

    complaint_category = Column(String)

    complaint_description = Column(Text)

    structured_summary = Column(Text)

    risk = Column(String)

    confidence = Column(Float)

    recommended_action = Column(Text)

    processing_status = Column(String)

    created_at = Column(DateTime)