# Product Requirements Document (PRD)
## Project: AI-Powered Client Meeting Summarizer & Action Item Dispatcher
**Use Case Option:** Option 3 — Client Meeting Summaries & Action Items  
**Evaluation Scope:** IT Internship Assessment — AI & Workflow Automation Strategy  
**Status:** MVP Specification  

---

## 1. Executive Summary & Problem Statement

### 1.1 Context
In professional services, client management, and technical delivery teams, dozens of client discovery sessions, status updates, and strategy meetings occur weekly. Meeting recordings generate hours of unstructured audio transcripts. 

### 1.2 The Problem
Manual post-meeting synthesis is time-consuming, prone to human error, and inconsistent. Crucial client commitments, deadlines, and action items are regularly overlooked, resulting in:
- Missed deliverables and project timeline slippage.
- Misaligned stakeholder expectations.
- High administrative cognitive load on consultants and project leads.

### 1.3 The Solution
An intelligent, automated meeting synthesis system comprising:
1. **Automated n8n Backend Workflow:** Ingests raw meeting transcripts via Webhook, passes sanitized content to high-performance LLMs (via Groq API), enforces structured JSON outputs, and automatically compiles executive summaries, categorized action items, key decisions, and formatted HTML email templates.
2. **Interactive Web App Frontend:** A modern, real-time control portal where project managers can paste/upload transcripts, select pre-built mock scenarios, trigger workflow execution, inspect extracted action items interactively, and preview/dispatch the generated executive email.

---

## 2. User Personas & Core Use Cases

| Persona | Role | Key Pain Point | Value Proposition |
| :--- | :--- | :--- | :--- |
| **Alex Rivera** | Technical Account Manager | Spends 45 mins after every call drafting recap emails and tracking down assignees. | Instant turnaround: 10-second recap generation with assignees and due dates ready to review. |
| **Priya Patel** | Lead Solutions Architect | Complex technical decisions get lost in long conversation transcripts. | Clear extraction of technical decisions, architecture agreements, and blockers. |
| **Marcus Vance** | Client Stakeholder / VP | Receives cluttered, unstructured email updates that are hard to skim. | Professional, beautifully styled executive email with TL;DR and prioritized next steps. |

---

## 3. System Requirements & Functional Specifications

### 3.1 Input Requirements
- **Raw Transcript Text:** Ingest conversational transcripts (speaker-labeled or raw unsegmented text).
- **Meeting Metadata (Optional / AI-Inferred):**
  - Meeting Title / Subject
  - Date & Time
  - Client / Account Name
  - Primary Attendees & Roles
  - Target Email Recipients

### 3.2 AI Extraction & Intelligence Engine (Groq / Llama 3.3 70B)
The AI processing layer must extract the following structured entities:

```json
{
  "meeting_title": "String",
  "client_name": "String",
  "meeting_date": "String",
  "attendees": ["String"],
  "executive_summary": "String (Concise 3-5 sentence high-level overview)",
  "key_discussion_points": [
    {
      "topic": "String",
      "summary": "String",
      "sentiment": "Positive | Neutral | Urgent | Concerned"
    }
  ],
  "action_items": [
    {
      "id": "String (e.g. ACT-1)",
      "task": "String",
      "assignee": "String (Identified person or Team)",
      "due_date": "String (Explicit or Inferred timeframe)",
      "priority": "High | Medium | Low",
      "status": "Pending"
    }
  ],
  "key_decisions": ["String"],
  "risks_and_blockers": ["String"],
  "next_steps_timeline": "String"
}
```

### 3.3 Output & Formatting Requirements
1. **Real-time Synchronous JSON:** The n8n workflow responds directly to the frontend Webhook caller with the complete structured object.
2. **HTML Email Template:** Formatted, responsive email ready for delivery via Gmail/SMTP with:
   - Header banner with meeting title, client badge, and date.
   - Executive Summary callout box.
   - Formatted Action Items table with priority badges and assignees.
   - Key Decisions & Next Meeting timeline.
   - Professional corporate signature footer.

---

## 4. Non-Functional & Evaluation Requirements

| Criteria | Assessment Requirement | Technical Implementation |
| :--- | :--- | :--- |
| **Functional Execution (40%)** | Workflow executes reliably and AI returns relevant, high-accuracy output. | Groq API with temperature 0.1 and strict JSON mode for 100% deterministic schema adherence. |
| **Verbal Explanation (30%)** | Clean node separation, intuitive data mappings, easy to walk through during screenshare. | Modular n8n design with labeled Sticky Notes, standard variable names (`$json.body`), and clear node titles. |
| **Technical Logic (15%)** | Sound data flow, error-handling fallbacks, and webhook response handling. | Try/catch error handlers, input sanitization, and fallback mock payloads for zero-failure demos. |
| **AI Prompt Engineering (15%)** | Effective system prompt with chain-of-thought instructions and negative constraints. | Zero-shot structured prompting with explicit schema definitions and role framing. |

---

## 5. Success Metrics
- **Processing Time:** < 5 seconds from submission to dashboard render.
- **Extraction Accuracy:** 100% extraction of explicitly stated action items and assigned owners.
- **Schema Compliance:** 0% JSON syntax failures (guaranteed by Groq JSON object mode).
- **Usability:** 1-click sample loading for instant live demonstration.
