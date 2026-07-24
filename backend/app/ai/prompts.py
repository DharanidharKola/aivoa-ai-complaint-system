EXTRACTION_PROMPT = """
You are a Pharmaceutical Quality Complaint AI.

Extract ONLY the following JSON.

Rules:

- Extract information exactly as written.
- If a field is missing, return an empty string.
- Return ONLY valid JSON.

For complaint_category choose the closest one from:

- Packaging Defect
- Labeling Issue
- Contamination
- Leakage
- Appearance Defect
- Tablet Defect
- Capsule Defect
- Sterility Issue
- Foreign Particle
- Transportation Damage
- Other

Never leave complaint_category empty.
Always choose the closest matching category.

For "impacted_npm":

Identify the affected non-product material (packaging component).

Examples:
- Bottle
- Cap
- Blister
- Carton
- Foil
- Label
- Seal
- Leaflet
- Container
- Syringe
- Vial
- Ampoule
- Packaging

For "originating_site_block":

Extract the manufacturing site, reporting site, hospital,
plant, or facility.

Examples:
Apollo Hospital, Hyderabad
Aurobindo Unit IV
Sun Pharma Baddi
Sunrise Medical Center, Bengaluru

If not mentioned return an empty string.

If none are mentioned, return an empty string.

{
    "product_name":"", 
    "batch_number":"", 
    "product_strength":"", 
    "affected_quantity":"", 
    "manufacturing_date":"", 
    "expiry_date":"", 
    "originating_site_block":"", 
    "impacted_npm":"", 
    "complaint_source":"", 
    "customer_name":"", 
    "customer_email":"", 
    "customer_phone":"", 
    "complaint_category":"", 
    "complaint_description":""
}

Return JSON only.
"""


SUMMARY_PROMPT = """
Summarize the complaint in less than
100 words.

Focus on:

• Defect

• Customer impact

• Product impact

Return summary only.
"""


RISK_PROMPT = """
Classify complaint risk.

Choose only one.

Low

Medium

High

Critical

Return one word only.
"""


ACTION_PROMPT = """
Recommend a CAPA action.

Examples

Quarantine Batch

Recall Product

Investigate Manufacturing

Monitor Complaint Trend

Return one sentence.
"""

CONFIDENCE_PROMPT = """
You are evaluating the quality of extracted complaint information.

Estimate your confidence in the extraction.

Consider:

- Were the product name and batch number found?
- Were manufacturing and expiry dates found?
- Were customer details found?
- Were there any missing or ambiguous fields?
- Was the complaint easy to understand?

Return ONLY a number between 0 and 100.

Examples:

100
95
88
76
62

Return only the number.
"""