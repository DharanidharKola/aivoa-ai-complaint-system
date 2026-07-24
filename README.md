# 🧪 AIVOA AI Complaint Management System

An AI-powered Pharmaceutical Customer Complaint Management System that automates complaint analysis using **FastAPI, React, LangGraph, Google Gemini, and PostgreSQL**.

The system extracts complaint information from uploaded documents, classifies complaint risk, generates structured summaries, recommends CAPA actions, estimates AI confidence, and stores complaint records in PostgreSQL for Quality Assurance workflows.

---

# 📌 Project Overview

Pharmaceutical companies receive customer complaints in various formats such as PDFs, DOCX files, emails, or manually entered text. Processing these complaints manually is time-consuming and prone to inconsistencies.

This project provides an AI-powered solution that automatically:

- Extracts complaint information
- Classifies complaint risk
- Generates structured defect summaries
- Recommends CAPA (Corrective and Preventive Action)
- Estimates extraction confidence
- Stores complaint records in PostgreSQL

---

# ✨ Features

## 🤖 AI Complaint Analysis

- Upload PDF, DOCX, or TXT complaints
- Automatic field extraction using Google Gemini
- Intelligent complaint categorization

---

## 📄 Structured Information Extraction

Automatically extracts:

- Product Name
- Batch Number
- Product Strength
- Manufacturing Date
- Expiry Date
- Affected Quantity
- Originating Site
- Impacted Non-Product Material
- Complaint Source
- Customer Details
- Complaint Category
- Complaint Description

---

## ⚠️ AI Risk Assessment

Automatically classifies complaints into:

- Low
- Medium
- High
- Critical

using AI-based reasoning.

---

## 📝 AI Summary Generation

Generates a concise pharmaceutical complaint summary including:

- Defect
- Customer Impact
- Product Impact

---

## 🛠 Recommended CAPA Action

Generates intelligent corrective action recommendations such as:

- Investigate Manufacturing
- Recall Product
- Replace Product
- Quarantine Batch
- Root Cause Analysis

---

## 📊 Confidence Score

Displays an AI confidence score (0–100%) indicating the reliability of extracted information.

---

## 💾 Complaint Management

Stores complaint information in PostgreSQL including:

- Complaint Details
- Risk
- Structured Summary
- Recommended Action
- Confidence Score

---

# 🏗 System Architecture

```
                React Frontend
                       │
                       ▼
              FastAPI REST APIs
                       │
                       ▼
             LangGraph AI Workflow
                       │
      ┌──────────┬──────────┬─────────┬──────────┐
      ▼          ▼          ▼         ▼
 Extraction   Summary    Risk      CAPA
     │                       │
     └──────────────┬────────┘
                    ▼
            Confidence Estimation
                    │
                    ▼
              PostgreSQL Database
```

---

# 🧠 LangGraph Workflow

```
Complaint Document
        │
        ▼
Extract Complaint Fields
        │
        ▼
Generate AI Summary
        │
        ▼
Classify Risk
        │
        ▼
Recommend CAPA
        │
        ▼
Estimate Confidence
        │
        ▼
Return Final Response
```

---

# 🛠 Technology Stack

## Frontend

- React.js
- Material UI (MUI)
- Redux Toolkit
- Axios
- Vite

---

## Backend

- FastAPI
- SQLAlchemy
- Pydantic

---

## AI

- Google Gemini
- LangGraph

---

## Database

- PostgreSQL

---

# 📁 Project Structure

```
AIVOA-AI-COMPLAINT-SYSTEM

│
├── backend
│   ├── app
│   │   ├── ai
│   │   │   ├── graph.py
│   │   │   ├── nodes.py
│   │   │   ├── prompts.py
│   │   │   ├── state.py
│   │   │   └── groq_client.py
│   │   │
│   │   ├── api
│   │   │   ├── complaint.py
│   │   │   ├── upload.py
│   │   │   └── chat.py
│   │   │
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── main.py
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── redux
│   │   ├── services
│   │   ├── pages
│   │   └── theme
│
└── README.md
```

---

# 🚀 Installation

## 1. Clone Repository

```bash
git clone https://github.com/DharanidharKola/aivoa-ai-complaint-system.git
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file and add your Gemini/Groq API credentials.

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend:

```
http://localhost:8000
```

Swagger API:

```
http://localhost:8000/docs
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 🗄 Database

Database:

```
PostgreSQL
```

Tables:

```
complaints
```

Stored Information:

- Complaint Details
- Customer Information
- Product Information
- AI Summary
- Risk Level
- CAPA Recommendation
- Confidence Score

---

# 📷 Application Screenshots

Add screenshots of:

- Dashboard
- Complaint Form
- AI Copilot
- Risk Assessment
- PostgreSQL Database

Example:

```
screenshots/
    dashboard.png
    upload.png
    database.png
```

---

# 🔮 Future Enhancements

- User Authentication
- Complaint Search & Filters
- Dashboard Analytics
- Complaint Trends
- Email Notifications
- PDF Report Generation
- Audit Trail
- Multi-language Complaint Support

---

# 👨‍💻 Developer

**Dharanidhar Kola**

GitHub:
https://github.com/DharanidharKola

LinkedIn:
https://www.linkedin.com/in/dharanidharkola

---

# 📄 License

This project was developed as part of an AI engineering assignment for educational and demonstration purposes.

---

# ⭐ Acknowledgements

- FastAPI
- React
- Material UI
- LangGraph
- Google Gemini
- PostgreSQL
