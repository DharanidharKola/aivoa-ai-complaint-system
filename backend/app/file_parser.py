from pypdf import PdfReader
from fastapi import UploadFile
import tempfile
import os


def extract_text_from_pdf(upload_file: UploadFile) -> str:
    """
    Extract text from uploaded PDF.
    """

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:

        temp.write(upload_file.file.read())

        temp_path = temp.name

    reader = PdfReader(temp_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    os.remove(temp_path)

    return text