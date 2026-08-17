# SynapseAI &bull; Executive Meeting Intelligence Platform

> **IT Internship Assessment:** AI & Workflow Automation Strategy (Option 3 — Client Meeting Summaries & Action Items)  
> High-performance automation pipeline powered by **n8n (AI Agent Architecture)** and **Groq AI (Llama 3.3 70B)** with a dual-theme executive web dashboard.

---

## ✨ Features Overview

### 🎨 Frontend Web App (`web-app/`)
- **Dual-Theme Engine:** 1-click switcher between **Enterprise Light Mode** (Stripe/Linear crisp aesthetic) and **Obsidian Slate Dark Mode** with theme persistence.
- **Multiple Ingestion Methods:**
  - ⚡ **Preset Scenarios:** Pre-loaded test cases for Cloud Architecture, Product Launch, and SLA Remediation.
  - 📂 **Drag-and-Drop & File Upload:** Ingest `.txt`, `.vtt`, `.srt`, or `.json` files.
  - 🎤 **Live Voice Microphone Dictation:** Dictate live transcripts via Web Speech API.
- **Live Pipeline Stepper:** Real-time multi-step progress motion and timer during AI extraction.
- **Interactive Action Item Manager:**
  - Live checkboxes with progress counter (`Completed / Total`).
  - **In-line Task Editing** & **`+ Add Task`** quick button.
  - Priority filtering (`All`, `High`, `Medium`, `Low`).
- **Multi-Channel HTML Email Preview:** Rendered executive email template with 1-click HTML copy and mailto launcher.
- **Export Capabilities:** Export to **CSV** (for Jira/Asana/Notion), **Markdown Report**, and **JSON Payload**.

---

### ⚙️ n8n Backend Workflow (`n8n-workflows/`)
- **LangChain AI Agent Node:** Native AI Agent architecture connected to **Groq Chat Model** (`llama-3.3-70b-versatile`).
- **Sub-2-Second Inference:** Ultra-fast LPU inference at `temperature: 0.1`.
- **Deterministic Schema Enforcement:** Sanitization and auto-cleansing of markdown code fences.
- **Responsive HTML Template Builder:** Dynamically compiled inline CSS email with priority badges.
- **Synchronous Response:** Delivers full payload directly to the frontend webhook caller.

---

## 📁 Repository Structure

```
├── docs/
│   ├── PRD.md                         # Product Requirements Document
│   ├── ARCHITECTURE.md                # System Architecture, Flow & Sequence Diagrams
│   ├── FRONTEND_DESIGN_SYSTEM.md      # UI Tokens & Component Specifications
│   ├── PROMPT_ENGINEERING.md          # Groq System Prompts & Schema Specification
│   └── DEMO_WALKTHROUGH_SCRIPT.md     # 30% Verbal Review screenshare guide
├── n8n-workflows/
│   ├── client_meeting_summary_groq.json  # Importable n8n workflow file (AI Agent)
│   └── sample_transcripts.json          # Pre-configured scenario transcripts
├── web-app/
│   ├── index.html                     # Semantic HTML5 Executive Dashboard
│   ├── styles.css                     # Dual-theme stylesheet (Light & Dark)
│   └── app.js                         # State machine, voice mic, drag-and-drop & API connector
├── netlify.toml                       # Netlify hosting configuration
├── render.yaml                        # Render static service configuration
└── README.md                          # Quickstart guide
```

---

## 🚀 Quickstart Guide

### 1. Run the Web Dashboard
```bash
# With python
cd web-app
python -m http.server 3000

# Or with npx serve
npx -y serve web-app -p 3000
```
Open `http://localhost:3000` in your browser.

### 2. Connect to Local n8n
1. Open n8n (`http://localhost:5678`).
2. Import [`n8n-workflows/client_meeting_summary_groq.json`](file:///c:/Users/rockm/Downloads/AI%20&%20Workflow%20Automation%20Strategy/n8n-workflows/client_meeting_summary_groq.json).
3. Connect your **Groq API credential** in the Groq Chat Model node.
4. Test or activate the workflow!
