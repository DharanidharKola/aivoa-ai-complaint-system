import json
import re

from .groq_client import invoke_llm
from .prompts import (
    EXTRACTION_PROMPT,
    RISK_PROMPT,
    SUMMARY_PROMPT,
    ACTION_PROMPT,
    CONFIDENCE_PROMPT
)


def clean_json(text: str):

    text = text.strip()

    text = re.sub(r"```json", "", text)

    text = re.sub(r"```", "", text)

    text = text.strip()

    return text


def extract_fields(state):

    prompt = EXTRACTION_PROMPT

    prompt += "\n\nComplaint:\n\n"

    prompt += state["complaint_text"]

    result = invoke_llm(prompt)

    print("\n===== GROQ EXTRACTION =====")

    print(result)

    print("===========================\n")

    result = clean_json(result)

    try:

        state["extracted_json"] = json.loads(result)

    except Exception as e:

        print(e)

        state["extracted_json"] = {

            "error": "JSON Parsing Failed",

            "raw_response": result

        }

    return state


def classify_risk(state):

    prompt = RISK_PROMPT

    prompt += "\n\n"

    prompt += state["complaint_text"]

    risk = invoke_llm(prompt)

    state["risk"] = risk.strip()

    # Temporary confidence score
    state["confidence"] = 95

    return state


def summarize(state):

    prompt = SUMMARY_PROMPT

    prompt += "\n\n"

    prompt += state["complaint_text"]

    summary = invoke_llm(prompt)

    state["summary"] = summary

    return state

def recommend_action(state):

    prompt = ACTION_PROMPT

    prompt += "\n\n"

    prompt += state["complaint_text"]

    action = invoke_llm(prompt)

    state["recommended_action"] = action.strip()

    return state

def estimate_confidence(state):

    prompt = CONFIDENCE_PROMPT

    prompt += "\n\nComplaint:\n\n"

    prompt += state["complaint_text"]

    prompt += "\n\nExtracted JSON:\n"

    prompt += json.dumps(state["extracted_json"], indent=2)

    result = invoke_llm(prompt)

    try:
        state["confidence"] = int(result.strip())
    except:
        state["confidence"] = 80

    return state