from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

from .api.complaint import router as complaint_router
from .api.upload import router as upload_router
from .api.chat import router as chat_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AIVOA Complaint AI"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(complaint_router)
app.include_router(upload_router)
app.include_router(chat_router)


@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }