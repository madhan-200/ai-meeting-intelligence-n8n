# Frontend Design System & UI Specification

## 1. Design Philosophy: "Executive Glassmorphism & High-Density Clarity"
The UI is engineered for executive-level demonstration: clean, modern, vibrant dark-mode aesthetics with subtle neon highlights, crystal-clear typography, smooth transitions, and intuitive data interaction.

---

## 2. Color Palette & Design Tokens (CSS Variables)

```css
:root {
  /* Surface & Backgrounds */
  --bg-primary: #0a0d14;
  --bg-secondary: #121826;
  --bg-card: rgba(22, 30, 46, 0.7);
  --bg-card-hover: rgba(30, 41, 64, 0.85);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-glow: rgba(99, 102, 241, 0.35);

  /* Primary Accent & Brand */
  --accent-primary: #6366f1;       /* Indigo / Electric Violet */
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  --accent-hover: #4f46e5;
  --accent-glow: rgba(99, 102, 241, 0.25);

  /* Semantic State Colors */
  --status-high: #f43f5e;          /* High Priority / Urgent Red */
  --status-medium: #f59e0b;        /* Medium Priority Amber */
  --status-low: #10b981;           /* Low Priority Emerald */
  --status-info: #06b6d4;          /* Cyan Information */

  /* Typography Colors */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-inverse: #0f172a;

  /* Elevation & Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 0 20px var(--accent-glow);
  
  /* Radii & Timing */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 3. Component Hierarchy & Layout

### 3.1 Header Navigation
- **Branding Badge:** AI Meeting Intelligence Engine (Option 3 Prototype).
- **Status Indicator:** Live n8n Webhook connection pill (`Online / Local:5678` vs `Mock Mode`).
- **Quick Preset Selector:** Dropdown to instantly load pre-crafted scenarios (Client Kickoff, Incident Postmortem, Architecture Review).

### 3.2 Main Workspace (Split View)
- **Left Column: Input & Orchestration Console**
  - Meeting Metadata inputs (Title, Client, Target Email).
  - Raw Transcript Textarea with line-number guides and character counter.
  - "Process Transcript with Groq AI" CTA button with animated glowing gradient state.
  - Configuration Drawer: Local Webhook URL input & API Mode toggle.

- **Right Column: Intelligence & Real-time Dashboard**
  - **Summary Banner:** Executive Overview with Sentiment & Key Metrics cards.
  - **Interactive Action Items:** Checklist with Assignee tags, Priority badges, Due Dates, and completion toggles.
  - **Key Decisions & Risk Alerts:** Two-column grid highlighting agreements and potential blockers.
  - **Live Email Dispatch Preview:** Embedded iframe / rendered HTML view with "Copy HTML" and "Send Email" action triggers.
  - **Raw JSON Payload Inspector:** Collapsible code viewer formatted with syntax highlighting for technical screenshare inspection.

---

## 4. Micro-Interactions & UX Polish
- **Pulse Loading Skeleton:** Displays animated glassmorphic shimmer during LLM processing.
- **Copy Notification Toast:** Instant floating feedback when copying summaries or email HTML.
- **Filterable Action Item Tabs:** Filter tasks by `All`, `High Priority`, `Assigned to Me`, or `Completed`.
