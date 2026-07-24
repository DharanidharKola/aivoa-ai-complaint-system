import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_groq(prompt):

    response = client.chat.completions.create(

        model="gemma2-9b-it",

        messages=[

            {
                "role": "user",
                "content": prompt
            }

        ],

        temperature=0

    )

    return response.choices[0].message.content