# Live Screenshare Walkthrough & Presentation Script

**Role:** IT Internship Candidate  
**Assessment Topic:** AI & Workflow Automation Strategy (Option 3 — Client Meeting Summaries & Action Items)  
**Target Score:** 100% across Functional Execution (40%), Verbal Explanation (30%), Technical Logic (15%), and AI Prompt Engineering (15%).

---

## 1. Executive Opening & Problem Statement (1 Minute)

> *"Good morning. Today I am presenting **SynapseAI**, an automated meeting intelligence and workflow dispatch system built using **n8n** and **Groq AI (Llama 3.3 70B)**."*
>
> *"In fast-paced client-facing environments, long meeting transcripts contain critical action items, risks, and client agreements that frequently get lost in messy notes. Our objective is to automate post-meeting synthesis end-to-end: taking raw, unformatted transcripts and returning a structured JSON payload, an interactive task dashboard, and an executive-ready HTML email in under 2 seconds."*

---

## 2. Live Interactive Demonstration (2–3 Minutes)

### Step 1: Multiple Ways to Ingest Transcripts
- **Preset Scenarios:** Show the dropdown with pre-configured scenarios (e.g., *Cloud Migration Kickoff*, *Product Launch GTM*, *SLA Remediation*).
- **📂 File Drag-and-Drop:** Demonstrate dropping a `.txt` or `.vtt` meeting transcript directly into the console.
- **🎤 Live Voice Dictation:** Click **"Voice Mic"**, speak a 10-second live sentence into the microphone (*"Sarah will finalize the API security review by next Tuesday"*), and show it instantly transcribing.

### Step 2: Live Multi-Step Execution Stepper
- Click **"Process Transcript with Groq AI"**.
- Point out the **Real-Time Pipeline Stepper**:
  1. Ingesting & Sanitizing Context
  2. Groq AI Agent Inference (Llama 3.3 70B)
  3. Validating Structured Schema
  4. Compiling Responsive HTML Email
  5. Synchronizing Dashboard

### Step 3: Interactive Dashboard Highlights
- **Executive Summary:** Highlight the 3-sentence synthesis and positive/urgent sentiment pill.
- **Action Items Table:**
  - Demonstrate clicking checkboxes to track completion progress (`1 / 4 Completed`).
  - Demonstrate **In-line Task Editing** (click any task text to modify it live) and the **`+ Add Task`** button.
  - Filter tasks by priority (`High`, `Medium`, `Low`).
- **Decisions & Blockers Grid:** Highlight explicit agreements and compliance risks.
- **HTML Email Preview Tab:** Switch to the email tab to show the rendered corporate email template with inline styles, ready for Gmail/SMTP.
- **Export Options:** Demonstrate **Export CSV** (for Jira/Asana) and **Export Markdown Report**.
- **☀️/🌙 Theme Switcher:** Click the top-right button to toggle between **Enterprise Light Mode** and **Obsidian Slate Dark Mode**.

---

## 3. n8n Technical Architecture Deep-Dive (2 Minutes)

Switch screen to your **n8n Canvas** and explain the node pipeline:

```
[Webhook Node] ──> [Sanitize & Prepare Prompt] ──> [AI Agent + Groq Llama 3.3] ──> [Parse & Validate Schema] ──> [Generate HTML Email] ──> [Respond to Webhook]
```

1. **Webhook Trigger Node:**
   - Ingests payload via POST `/webhook/meeting-summary` configured for synchronous response.
2. **Sanitize & Prepare Prompt Node (JavaScript):**
   - Sanitizes raw transcript, validates length, and constructs the structured user prompt.
3. **LangChain AI Agent + Groq Chat Model Node:**
   - Leverages `llama-3.3-70b-versatile` with low temperature (`0.1`) and system extraction prompt for deterministic, zero-shot structured outputs.
4. **Parse & Validate Schema Node:**
   - Parses the Agent's `$json.output`, strips any markdown fences, and verifies all required schema keys exist.
5. **Generate HTML Email Template Node:**
   - Dynamically builds a responsive, client-compatible HTML email with priority color badges.
6. **Respond to Webhook Node:**
   - Returns the complete intelligence DTO with HTTP 200 back to the web dashboard in ~1.9s.

---

## 4. Closing & Q&A
> *"This system bridges automated backend execution with an executive-grade frontend interface, eliminating manual administrative work while ensuring zero missed client commitments. I'd love to answer any questions!"*
