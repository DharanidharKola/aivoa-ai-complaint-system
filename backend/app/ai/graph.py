from langgraph.graph import StateGraph
from langgraph.graph import END

from .state import ComplaintState
from .nodes import (
    extract_fields,
    classify_risk,
    summarize,
    recommend_action,
    estimate_confidence
)

workflow = StateGraph(ComplaintState)

workflow.add_node(
    "extract",
    extract_fields
)

workflow.add_node(
    "risk",
    classify_risk
)

workflow.add_node(
    "summary",
    summarize
)

workflow.add_node(
    "action",
    recommend_action
)

workflow.add_node(
    "confidence",
    estimate_confidence
)

workflow.set_entry_point("extract")

workflow.add_edge(
    "extract",
    "risk"
)

workflow.add_edge(
    "risk",
    "summary"
)

workflow.add_edge(
    "summary",
    "action"
)
workflow.add_edge(
    "action",
    "confidence"
)

workflow.add_edge(
    "confidence",
    END
)

graph = workflow.compile()


def analyze(text):

    state = {

        "complaint_text": text,

        "extracted_json": {},

        "risk": "",

        "summary": "",

        "recommended_action": "",

        "confidence": 0,

        "processing_status": "Processing"

    }

    result = graph.invoke(state)

    print("\n========== GRAPH RESULT ==========")
    print(result)
    print("==================================\n")

    return result