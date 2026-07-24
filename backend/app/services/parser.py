from fastapi import UploadFile
from pypdf import PdfReader
import tempfile
import os


class PDFParser:

    @staticmethod
    def extract(upload_file: UploadFile):

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp:

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