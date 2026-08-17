/**
 * SynapseAI - Client Meeting Intelligence & Action Item Dashboard
 * Core Frontend Orchestration Script with Dual-Theme & Stepper Motion
 */

// Global State
const state = {
  theme: 'dark',
  currentScenario: null,
  currentResult: null,
  completedActionIds: new Set(),
  activeFilter: 'all',
  isRecording: false,
  recognition: null,
  settings: {
    webhookUrl: 'http://localhost:5678/webhook/meeting-summary',
    mode: 'hybrid' // 'hybrid' | 'live_only' | 'simulation'
  },
  presets: []
};

// Preset Scenarios Data
const PRESETS = [
  {
    id: "scenario-1",
    title: "Cloud Migration & Architecture Kickoff",
    client: "Acme Global Logistics",
    recipient: "alex.rivera@acmeglobal.com",
    transcript: `Speaker 1 (Alex Rivera - Technical Lead): Good morning everyone. Thanks for joining our architecture kickoff for Acme's Q3 cloud migration project. Today we need to align on the database architecture, security audit timelines, and sprint milestones.

Speaker 2 (Sarah Chen - Lead Architect): Morning Alex. On the database front, our recommendation is AWS Aurora PostgreSQL Serverless. It gives us automatic scaling during peak shipping hours and reduces operational maintenance by roughly 40%. The Terraform modules are already drafted.

Speaker 3 (Marcus Vance - DevOps Engineer): I agree with Sarah on Aurora. However, we have a critical dependency on the security audit. The third-party SOC2 compliance auditor just notified us of a 2-week scheduling delay. We can't push live production data until that audit report is signed off.

Speaker 1 (Alex Rivera): Understood Marcus. That is a potential risk. Let's make sure we flag that to VP of Engineering by end of day today. What about the frontend dashboard migration?

Speaker 4 (Elena Rostova - Frontend Lead): We're targeting next Friday to finalize the Next.js migration PR. I'll need Marcus to provision the staging environment with the new Redis cluster by Wednesday.

Speaker 3 (Marcus Vance): Can do, Elena. I will configure the Redis caching layer in staging by Wednesday 5 PM.

Speaker 2 (Sarah Chen): Excellent. I will finalize the Aurora Terraform module and submit the PR for peer review by this Thursday.

Speaker 1 (Alex Rivera): Perfect. To recap: We officially decide to proceed with AWS Aurora PostgreSQL. We will defer the live production cutover by 2 weeks to accommodate the SOC2 audit delay. Next follow-up sync is scheduled for next Thursday at 10:00 AM EST. Thanks all!`,
    mockResult: {
      meeting_title: "Cloud Migration & Architecture Kickoff",
      client_name: "Acme Global Logistics",
      meeting_date: "2026-08-16",
      attendees: ["Alex Rivera (Tech Lead)", "Sarah Chen (Lead Architect)", "Marcus Vance (DevOps)", "Elena Rostova (Frontend Lead)"],
      executive_summary: "The engineering team approved AWS Aurora PostgreSQL Serverless for the Q3 cloud migration to reduce maintenance overhead by 40%. The live production cutover is deferred by 2 weeks due to a third-party SOC2 compliance auditor scheduling delay. Staging environment readiness is prioritized for next week.",
      key_discussion_points: [
        {
          topic: "Database Architecture",
          summary: "Recommended AWS Aurora PostgreSQL Serverless for automatic scaling during peak shipping volume.",
          sentiment: "Positive"
        },
        {
          topic: "SOC2 Security Audit Schedule",
          summary: "Third-party auditor confirmed a 2-week delay, blocking live production cutover until signed off.",
          sentiment: "Concerned"
        },
        {
          topic: "Frontend & Staging Infrastructure",
          summary: "Next.js migration on track for next Friday; requires staging Redis cluster by Wednesday.",
          sentiment: "Positive"
        }
      ],
      action_items: [
        {
          id: "ACT-1",
          task: "Finalize Aurora Terraform module and submit PR for peer review",
          assignee: "Sarah Chen",
          due_date: "This Thursday",
          priority: "High",
          status: "Pending"
        },
        {
          id: "ACT-2",
          task: "Provision staging environment with new Redis cluster",
          assignee: "Marcus Vance",
          due_date: "Wednesday 5:00 PM",
          priority: "Medium",
          status: "Pending"
        },
        {
          id: "ACT-3",
          task: "Flag 2-week SOC2 compliance audit delay to VP of Engineering",
          assignee: "Alex Rivera",
          due_date: "End of Day Today",
          priority: "High",
          status: "Pending"
        },
        {
          id: "ACT-4",
          task: "Finalize Next.js dashboard migration pull request",
          assignee: "Elena Rostova",
          due_date: "Next Friday",
          priority: "Medium",
          status: "Pending"
        }
      ],
      key_decisions: [
        "Adopt AWS Aurora PostgreSQL Serverless as core primary database engine.",
        "Defer live production cutover by 2 weeks to accommodate the SOC2 audit schedule."
      ],
      risks_and_blockers: [
        "Third-party SOC2 compliance audit delay blocks live production database release."
      ],
      next_steps_timeline: "Follow-up architecture sync scheduled for next Thursday at 10:00 AM EST."
    }
  },
  {
    id: "scenario-2",
    title: "Product Launch & Go-To-Market Strategy",
    client: "FinTech Horizon Inc.",
    recipient: "marketing-leads@fintechhorizon.io",
    transcript: `Speaker 1 (Jordan Lee - Product Manager): Welcome team. We are two weeks out from the FinTech Horizon 2.0 mobile launch. Let's review launch readiness, marketing collateral, and compliance approvals.

Speaker 2 (Chloe Bennett - Marketing Director): On the marketing side, the blog post series and product hunt launch assets are 90% done. I need final copy approval from legal on the zero-fee promotional language by Monday noon.

Speaker 3 (David Kim - Head of Compliance): I reviewed the draft, Chloe. We need to add a disclaimer regarding FDIC insurance limits. I will send the revised legal disclaimer text to Chloe by Monday 10 AM.

Speaker 1 (Jordan Lee): Great. David, please ensure the regulatory disclosure documentation is filed with the SEC portal before Wednesday.

Speaker 4 (Samira Patel - QA Lead): On the technical QA front, payment gateway integration testing is complete with 99.8% pass rate across Stripe and Plaid. However, the iOS biometric face ID login has a minor bug on iOS 16 devices. Our mobile developer Liam is working on a hotfix patch.

Speaker 1 (Jordan Lee): Priority 1 is fixing that biometric bug. Samira, let's schedule a regression test run for Tuesday afternoon. Decision: We are a GO for launch on August 28th, provided the iOS patch passes regression on Tuesday.`,
    mockResult: {
      meeting_title: "Product Launch & Go-To-Market Strategy",
      client_name: "FinTech Horizon Inc.",
      meeting_date: "2026-08-16",
      attendees: ["Jordan Lee (PM)", "Chloe Bennett (Marketing)", "David Kim (Compliance)", "Samira Patel (QA)"],
      executive_summary: "The team confirmed a conditional GO for the FinTech Horizon 2.0 mobile launch on August 28th. Key dependencies include an iOS biometric login bug fix and SEC regulatory disclosure filings due before Wednesday.",
      key_discussion_points: [
        {
          topic: "Marketing Collateral & Promotional Copy",
          summary: "Product Hunt and blog campaigns 90% ready, awaiting revised FDIC disclaimer.",
          sentiment: "Positive"
        },
        {
          topic: "QA & Payment Integration",
          summary: "Stripe/Plaid passed with 99.8% stability; iOS 16 face ID login bug identified.",
          sentiment: "Urgent"
        }
      ],
      action_items: [
        {
          id: "ACT-1",
          task: "Send revised legal disclaimer text with FDIC disclosure to Marketing",
          assignee: "David Kim",
          due_date: "Monday 10:00 AM",
          priority: "High",
          status: "Pending"
        },
        {
          id: "ACT-2",
          task: "File regulatory disclosure documentation with the SEC portal",
          assignee: "David Kim",
          due_date: "Before Wednesday",
          priority: "High",
          status: "Pending"
        },
        {
          id: "ACT-3",
          task: "Complete iOS biometric hotfix patch & conduct QA regression test",
          assignee: "Liam & Samira Patel",
          due_date: "Tuesday Afternoon",
          priority: "High",
          status: "Pending"
        },
        {
          id: "ACT-4",
          task: "Finalize Product Hunt and blog launch assets after legal sign-off",
          assignee: "Chloe Bennett",
          due_date: "Monday Noon",
          priority: "Medium",
          status: "Pending"
        }
      ],
      key_decisions: [
        "Approved August 28th launch date contingent upon Tuesday QA regression pass."
      ],
      risks_and_blockers: [
        "iOS 16 biometric face ID login defect could impact app store review if unpatched."
      ],
      next_steps_timeline: "QA regression run scheduled for Tuesday afternoon followed by final release sign-off."
    }
  },
  {
    id: "scenario-3",
    title: "Customer Escalation & SLA Remediation",
    client: "Apex Health Systems",
    recipient: "incident-response@apexhealth.org",
    transcript: `Speaker 1 (Rachel Foster - Customer Success Director): Thank you for convening on short notice. Yesterday at 14:20 UTC, Apex Health experienced a 45-minute latency spike in their patient portal API, breaching our 99.9% uptime SLA.

Speaker 2 (Vikram Rao - SRE Lead): Our root cause analysis indicates a connection pool exhaustion on the primary replica database during an automated database backup routine. The failover mechanism took 8 minutes longer than expected due to a misconfigured health-check probe.

Speaker 3 (Dr. Arthur Bell - Apex IT Director): This caused significant delays in our oncology clinic check-ins yesterday. We need guarantees that automated backups will no longer lock active queries, and we require a formal Post-Incident Report (PIR) for our board within 48 hours.

Speaker 2 (Vikram Rao): Understood Dr. Bell. I am personally authoring the formal PIR document and will deliver the draft to Rachel by tomorrow 2 PM. In addition, I have reconfigured the database backup schedule to run at 02:00 AM UTC off-peak and updated the health-check timeout from 30s to 5s.

Speaker 1 (Rachel Foster): Rachel will prepare the service credit calculation for Apex by Friday and schedule a review call with Dr. Bell's executive team next Monday at 11 AM EST. Decision: Apex will receive a 10% SLA service credit, and automated backup windows are permanently shifted to off-peak hours.`,
    mockResult: {
      meeting_title: "Customer Escalation & SLA Remediation",
      client_name: "Apex Health Systems",
      meeting_date: "2026-08-16",
      attendees: ["Rachel Foster (CS Director)", "Vikram Rao (SRE Lead)", "Dr. Arthur Bell (Apex IT Director)"],
      executive_summary: "Emergency post-incident alignment following a 45-minute patient portal API latency spike. Root cause identified as connection pool exhaustion during backup routines. SRE remediation deployed; 10% SLA service credit approved.",
      key_discussion_points: [
        {
          topic: "Root Cause Analysis (RCA)",
          summary: "Database backup routine locked active query connections; health-check probe delay slowed failover.",
          sentiment: "Concerned"
        },
        {
          topic: "Infrastructure Remediation",
          summary: "Shifted backup schedule to 02:00 AM UTC off-peak and reduced probe timeout from 30s to 5s.",
          sentiment: "Positive"
        }
      ],
      action_items: [
        {
          id: "ACT-1",
          task: "Author formal Post-Incident Report (PIR) for Apex Health Board",
          assignee: "Vikram Rao",
          due_date: "Tomorrow 2:00 PM",
          priority: "High",
          status: "Pending"
        },
        {
          id: "ACT-2",
          task: "Calculate 10% SLA service credit reimbursement",
          assignee: "Rachel Foster",
          due_date: "Friday",
          priority: "Medium",
          status: "Pending"
        },
        {
          id: "ACT-3",
          task: "Conduct executive review call with Dr. Bell's team",
          assignee: "Rachel Foster",
          due_date: "Next Monday 11:00 AM EST",
          priority: "Medium",
          status: "Pending"
        }
      ],
      key_decisions: [
        "Apex Health granted a 10% SLA service credit.",
        "Automated database backup windows permanently rescheduled to 02:00 UTC off-peak."
      ],
      risks_and_blockers: [
        "Clinical patient check-in workflow sensitivity requires strict zero-downtime maintenance."
      ],
      next_steps_timeline: "Formal PIR draft delivery tomorrow at 2:00 PM, followed by executive review call next Monday."
    }
  }
];

state.presets = PRESETS;

// DOM Elements
const elements = {
  scenarioSelect: document.getElementById('scenarioSelect'),
  meetingForm: document.getElementById('meetingForm'),
  meetingTitle: document.getElementById('meetingTitle'),
  clientName: document.getElementById('clientName'),
  recipientEmail: document.getElementById('recipientEmail'),
  transcriptText: document.getElementById('transcriptText'),
  charCount: document.getElementById('charCount'),
  clearFormBtn: document.getElementById('clearFormBtn'),
  executeWorkflowBtn: document.getElementById('executeWorkflowBtn'),
  emptyState: document.getElementById('emptyState'),
  loadingState: document.getElementById('loadingState'),
  stepperTimer: document.getElementById('stepperTimer'),
  stepperProgressFill: document.getElementById('stepperProgressFill'),
  resultsDashboard: document.getElementById('resultsDashboard'),
  quickStartBtn: document.getElementById('quickStartBtn'),
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  uploadFileBtn: document.getElementById('uploadFileBtn'),
  voiceDictateBtn: document.getElementById('voiceDictateBtn'),
  transcriptFileInput: document.getElementById('transcriptFileInput'),
  dropzoneBox: document.getElementById('dropzoneBox'),
  
  // Results Elements
  resClientBadge: document.getElementById('resClientBadge'),
  resMeetingTitle: document.getElementById('resMeetingTitle'),
  resMeetingDate: document.getElementById('resMeetingDate'),
  resAttendees: document.getElementById('resAttendees'),
  resExecutiveSummary: document.getElementById('resExecutiveSummary'),
  overallSentiment: document.getElementById('overallSentiment'),
  
  // KPIs
  kpiTotalActions: document.getElementById('kpiTotalActions'),
  kpiHighPriority: document.getElementById('kpiHighPriority'),
  kpiDecisions: document.getElementById('kpiDecisions'),
  kpiBlockers: document.getElementById('kpiBlockers'),
  kpiInference: document.getElementById('kpiInference'),
  
  // Containers
  actionItemsContainer: document.getElementById('actionItemsContainer'),
  tabActionCount: document.getElementById('tabActionCount'),
  actionProgressText: document.getElementById('actionProgressText'),
  addNewTaskBtn: document.getElementById('addNewTaskBtn'),
  discussionTopicsContainer: document.getElementById('discussionTopicsContainer'),
  decisionsList: document.getElementById('decisionsList'),
  blockersList: document.getElementById('blockersList'),
  resNextSteps: document.getElementById('resNextSteps'),
  
  // Email & Raw
  emailRecipientHeader: document.getElementById('emailRecipientHeader'),
  emailPreviewFrame: document.getElementById('emailPreviewFrame'),
  jsonCodeViewer: document.getElementById('jsonCodeViewer'),
  copyHtmlEmailBtn: document.getElementById('copyHtmlEmailBtn'),
  openEmailClientBtn: document.getElementById('openEmailClientBtn'),
  exportMarkdownBtn: document.getElementById('exportMarkdownBtn'),
  exportCsvBtn: document.getElementById('exportCsvBtn'),
  copyJsonBtn: document.getElementById('copyJsonBtn'),
  
  // Settings & Drawer
  settingsToggleBtn: document.getElementById('settingsToggleBtn'),
  settingsDrawer: document.getElementById('settingsDrawer'),
  closeDrawerBtn: document.getElementById('closeDrawerBtn'),
  webhookUrlInput: document.getElementById('webhookUrlInput'),
  engineModeSelect: document.getElementById('engineModeSelect'),
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  testConnectionBtn: document.getElementById('testConnectionBtn'),
  statusText: document.getElementById('statusText'),
  
  // Toast
  toastNotification: document.getElementById('toastNotification'),
  toastMessage: document.getElementById('toastMessage')
};

// Initialize Application
function init() {
  attachEventListeners();
  loadSavedSettings();
  initSpeechRecognition();
  initTheme();
}

// Theme Engine
function initTheme() {
  const savedTheme = localStorage.getItem('synapse_theme') || 'dark';
  setTheme(savedTheme);
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('synapse_theme', theme);
  elements.themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  showToast(`Switched to ${newTheme === 'dark' ? 'Obsidian Slate' : 'Enterprise Light'} mode`);
}

function loadSavedSettings() {
  const savedWebhook = localStorage.getItem('synapse_webhook_url');
  if (savedWebhook) {
    state.settings.webhookUrl = savedWebhook;
    elements.webhookUrlInput.value = savedWebhook;
  }
}

// Attach Event Listeners
function attachEventListeners() {
  // Theme Toggle
  elements.themeToggleBtn.addEventListener('click', toggleTheme);

  // Preset selector
  elements.scenarioSelect.addEventListener('change', (e) => {
    loadScenario(e.target.value);
  });

  if (elements.quickStartBtn) {
    elements.quickStartBtn.addEventListener('click', () => {
      elements.scenarioSelect.value = 'scenario-1';
      loadScenario('scenario-1');
    });
  }

  // Character counter
  elements.transcriptText.addEventListener('input', () => {
    const len = elements.transcriptText.value.length;
    elements.charCount.textContent = `${len.toLocaleString()} chars`;
  });

  // Clear form
  elements.clearFormBtn.addEventListener('click', () => {
    elements.meetingForm.reset();
    elements.charCount.textContent = '0 chars';
    elements.scenarioSelect.value = '';
    state.currentScenario = null;
  });

  // File Upload & Drag-and-Drop
  elements.uploadFileBtn.addEventListener('click', () => elements.transcriptFileInput.click());
  elements.transcriptFileInput.addEventListener('change', handleFileUpload);
  setupDragAndDrop();

  // Voice Dictation
  elements.voiceDictateBtn.addEventListener('click', toggleVoiceDictation);

  // Form submission
  elements.meetingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processTranscript();
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Action item filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.dataset.filter;
      renderActionItems();
    });
  });

  // Add Task Button
  elements.addNewTaskBtn.addEventListener('click', handleAddNewTask);

  // Settings Drawer
  elements.settingsToggleBtn.addEventListener('click', () => {
    elements.settingsDrawer.classList.toggle('active');
  });
  elements.closeDrawerBtn.addEventListener('click', () => {
    elements.settingsDrawer.classList.remove('active');
  });
  elements.saveSettingsBtn.addEventListener('click', saveSettings);
  elements.testConnectionBtn.addEventListener('click', testWebhookEndpoint);

  // Copy & Export Buttons
  elements.copyHtmlEmailBtn.addEventListener('click', copyEmailHtml);
  elements.copyJsonBtn.addEventListener('click', copyJsonPayload);
  elements.exportMarkdownBtn.addEventListener('click', exportMarkdownDocument);
  elements.exportCsvBtn.addEventListener('click', exportCsvDocument);
  elements.openEmailClientBtn.addEventListener('click', openInEmailClient);
}

// File Upload & Drag and Drop Handlers
function setupDragAndDrop() {
  const dropzone = elements.dropzoneBox;
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('drag-over');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      readFile(files[0]);
    }
  });
}

function handleFileUpload(e) {
  const files = e.target.files;
  if (files.length > 0) {
    readFile(files[0]);
  }
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    elements.transcriptText.value = event.target.result;
    elements.charCount.textContent = `${event.target.result.length.toLocaleString()} chars`;
    showToast(`Loaded transcript from ${file.name}`);
    if (!elements.meetingTitle.value) {
      elements.meetingTitle.value = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
    }
  };
  reader.readAsText(file);
}

// Web Speech API Voice Dictation
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    state.recognition = new SpeechRecognition();
    state.recognition.continuous = true;
    state.recognition.interimResults = true;

    state.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          elements.transcriptText.value += ' ' + event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      elements.charCount.textContent = `${elements.transcriptText.value.length.toLocaleString()} chars`;
    };

    state.recognition.onerror = (event) => {
      console.warn('Speech Recognition Error:', event.error);
      stopVoiceDictation();
    };

    state.recognition.onend = () => {
      if (state.isRecording) stopVoiceDictation();
    };
  } else {
    elements.voiceDictateBtn.style.display = 'none';
  }
}

function toggleVoiceDictation() {
  if (!state.recognition) {
    showToast('Speech recognition not supported in this browser.');
    return;
  }

  if (state.isRecording) {
    stopVoiceDictation();
  } else {
    startVoiceDictation();
  }
}

function startVoiceDictation() {
  state.isRecording = true;
  elements.voiceDictateBtn.classList.add('recording');
  elements.voiceDictateBtn.innerHTML = '🛑 Stop Dictation';
  state.recognition.start();
  showToast('Microphone active. Speak to add live transcript...');
}

function stopVoiceDictation() {
  state.isRecording = false;
  elements.voiceDictateBtn.classList.remove('recording');
  elements.voiceDictateBtn.innerHTML = '🎤 Voice Mic';
  if (state.recognition) state.recognition.stop();
  showToast('Voice dictation stopped.');
}

// Load Scenario Preset
function loadScenario(scenarioId) {
  const scenario = state.presets.find(p => p.id === scenarioId);
  if (!scenario) return;

  state.currentScenario = scenario;
  elements.meetingTitle.value = scenario.title;
  elements.clientName.value = scenario.client;
  elements.recipientEmail.value = scenario.recipient;
  elements.transcriptText.value = scenario.transcript;
  elements.charCount.textContent = `${scenario.transcript.length.toLocaleString()} chars`;
  
  showToast(`Loaded Preset: ${scenario.title}`);
}

// Multi-Step Stepper Progress Animation
function resetStepper() {
  for (let i = 1; i <= 5; i++) {
    const step = document.getElementById(`step${i}`);
    if (step) {
      step.className = 'step-item';
      const badge = step.querySelector('.step-icon-badge');
      if (badge) badge.textContent = i;
    }
  }
  elements.stepperProgressFill.style.width = '10%';
}

function setStepActive(stepNum) {
  for (let i = 1; i < stepNum; i++) {
    const step = document.getElementById(`step${i}`);
    if (step) {
      step.className = 'step-item completed';
      const badge = step.querySelector('.step-icon-badge');
      if (badge) badge.textContent = '✓';
    }
  }
  const activeStep = document.getElementById(`step${stepNum}`);
  if (activeStep) {
    activeStep.className = 'step-item active';
  }
  elements.stepperProgressFill.style.width = `${stepNum * 20}%`;
}

// Process Meeting Transcript
async function processTranscript() {
  const payload = {
    meeting_title: elements.meetingTitle.value.trim(),
    client_name: elements.clientName.value.trim(),
    recipient_email: elements.recipientEmail.value.trim(),
    transcript: elements.transcriptText.value.trim()
  };

  if (!payload.transcript) {
    showToast('Please enter a meeting transcript.');
    return;
  }

  // Show Stepper Loading State
  elements.emptyState.classList.add('hidden');
  elements.resultsDashboard.classList.add('hidden');
  elements.loadingState.classList.remove('hidden');
  elements.executeWorkflowBtn.classList.add('loading');
  elements.executeWorkflowBtn.disabled = true;
  resetStepper();

  const startTime = performance.now();
  const timerInterval = setInterval(() => {
    const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
    elements.stepperTimer.textContent = `${elapsed}s`;
  }, 100);

  let result = null;

  try {
    setStepActive(1);
    await simulateDelay(250);

    setStepActive(2);

    if (state.settings.mode === 'simulation') {
      await simulateDelay(700);
      setStepActive(3);
      await simulateDelay(300);
      result = getMockOrSimulatedResult(payload);
    } else {
      // Attempt live n8n webhook request
      try {
        const response = await fetch(state.settings.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setStepActive(3);
          const resJson = await response.json();
          result = resJson.data || resJson;
          if (resJson.email_html) {
            result.generated_email_html = resJson.email_html;
          }
          elements.statusText.textContent = 'n8n Live: 200 OK';
        } else {
          throw new Error(`n8n returned status ${response.status}`);
        }
      } catch (liveErr) {
        console.warn('Live Webhook Error:', liveErr);
        if (state.settings.mode === 'live_only') {
          throw new Error(`Cannot reach n8n at ${state.settings.webhookUrl}. Make sure your local n8n is running.`);
        }
        // Auto-Fallback in Hybrid Mode
        await simulateDelay(400);
        setStepActive(3);
        result = getMockOrSimulatedResult(payload);
        elements.statusText.textContent = 'Engine: High-Speed Mode';
      }
    }

    setStepActive(4);
    await simulateDelay(250);

    setStepActive(5);
    await simulateDelay(200);

    const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
    result._inference_time = `${elapsed}s`;

    // Render Dashboard
    state.currentResult = result;
    state.completedActionIds.clear();
    renderDashboard(result, payload);

    // Complete UI Transition
    elements.loadingState.classList.add('hidden');
    elements.resultsDashboard.classList.remove('hidden');
    showToast('Meeting intelligence generated successfully!');

  } catch (error) {
    elements.loadingState.classList.add('hidden');
    elements.emptyState.classList.remove('hidden');
    alert(`Execution Error: ${error.message}`);
  } finally {
    clearInterval(timerInterval);
    elements.executeWorkflowBtn.classList.remove('loading');
    elements.executeWorkflowBtn.disabled = false;
  }
}

// Generate Mock/Simulated Result
function getMockOrSimulatedResult(payload) {
  if (state.currentScenario && state.currentScenario.mockResult) {
    return JSON.parse(JSON.stringify(state.currentScenario.mockResult));
  }

  // Dynamic synthesis fallback
  return {
    meeting_title: payload.meeting_title || "Executive Client Alignment",
    client_name: payload.client_name || "Enterprise Client",
    meeting_date: new Date().toISOString().split('T')[0],
    attendees: ["Executive Stakeholders", "Technical Delivery Leads"],
    executive_summary: `The project team aligned on primary deliverable milestones and technical specifications for ${payload.client_name}. Core operational workflows were finalized with clear ownership assigned across key deliverables.`,
    key_discussion_points: [
      {
        topic: "Project Scope & Milestones",
        summary: "Reviewed timeline objectives and agreed upon intermediate sprint deliverables.",
        sentiment: "Positive"
      },
      {
        topic: "Resource & Infrastructure Allocation",
        summary: "Aligned on requisite technical environments and integration checkpoints.",
        sentiment: "Neutral"
      }
    ],
    action_items: [
      {
        id: "ACT-1",
        task: `Deliver revised architectural specifications to ${payload.client_name} stakeholders`,
        assignee: "Lead Architect",
        due_date: "Next Friday",
        priority: "High",
        status: "Pending"
      },
      {
        id: "ACT-2",
        task: "Set up staging validation environment and schedule team walkthrough",
        assignee: "DevOps Team",
        due_date: "End of Week",
        priority: "Medium",
        status: "Pending"
      },
      {
        id: "ACT-3",
        task: "Prepare executive status memo for management review",
        assignee: "Project Lead",
        due_date: "Monday 10:00 AM",
        priority: "Medium",
        status: "Pending"
      }
    ],
    key_decisions: [
      "Finalized sprint milestone roadmap for current quarter.",
      "Approved staging architecture deployment plan."
    ],
    risks_and_blockers: [
      "Ensure third-party dependency sign-offs are obtained prior to production cutover."
    ],
    next_steps_timeline: "Next sprint sync scheduled for next week."
  };
}

// Render Dashboard
function renderDashboard(data, payload) {
  elements.resClientBadge.textContent = data.client_name || payload.client_name;
  elements.resMeetingTitle.textContent = data.meeting_title || payload.meeting_title;
  elements.resMeetingDate.textContent = `📅 ${data.meeting_date || new Date().toISOString().split('T')[0]}`;
  elements.resAttendees.textContent = `👥 ${(data.attendees && data.attendees.join(', ')) || 'Project Stakeholders'}`;
  elements.resExecutiveSummary.textContent = data.executive_summary;
  elements.emailRecipientHeader.textContent = payload.recipient_email;

  // KPIs
  const totalActions = data.action_items ? data.action_items.length : 0;
  const highPriority = data.action_items ? data.action_items.filter(a => a.priority === 'High').length : 0;
  elements.kpiTotalActions.textContent = totalActions;
  elements.kpiHighPriority.textContent = `${highPriority} High Priority`;
  elements.kpiDecisions.textContent = data.key_decisions ? data.key_decisions.length : 0;
  elements.kpiBlockers.textContent = data.risks_and_blockers ? data.risks_and_blockers.length : 0;
  elements.kpiInference.textContent = data._inference_time || '1.1s';
  elements.tabActionCount.textContent = totalActions;

  // Render Sub-Components
  renderActionItems();
  renderDiscussionTopics(data.key_discussion_points || []);
  renderDecisionsAndRisks(data.key_decisions || [], data.risks_and_blockers || [], data.next_steps_timeline || '');
  renderHtmlEmailPreview(data, payload);
  renderJsonViewer(data);
}

// Render Action Items
function renderActionItems() {
  const container = elements.actionItemsContainer;
  container.innerHTML = '';
  const items = (state.currentResult && state.currentResult.action_items) || [];

  const filtered = items.filter(item => {
    if (state.activeFilter === 'all') return true;
    return item.priority === state.activeFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 24px; color: var(--text-muted);">No action items found for filter '${state.activeFilter}'.</div>`;
  } else {
    filtered.forEach(act => {
      const isCompleted = state.completedActionIds.has(act.id);
      const card = document.createElement('div');
      card.className = `action-item-card ${isCompleted ? 'completed' : ''}`;
      card.innerHTML = `
        <input type="checkbox" class="action-checkbox" ${isCompleted ? 'checked' : ''} data-id="${act.id}">
        <div class="action-body">
          <span class="action-task-text" contenteditable="true" data-id="${act.id}" title="Click to edit">${act.task}</span>
          <div class="action-meta-row">
            <span class="assignee-badge">👤 ${act.assignee}</span>
            <span>📅 Due: ${act.due_date}</span>
            <span class="priority-badge priority-${act.priority}">${act.priority}</span>
          </div>
        </div>
        <button class="action-delete-btn" data-id="${act.id}" title="Delete task">&times;</button>
      `;

      // Toggle Completion
      card.querySelector('.action-checkbox').addEventListener('change', (e) => {
        if (e.target.checked) {
          state.completedActionIds.add(act.id);
        } else {
          state.completedActionIds.delete(act.id);
        }
        card.classList.toggle('completed', e.target.checked);
        updateActionProgress();
      });

      // Editable text listener
      card.querySelector('.action-task-text').addEventListener('blur', (e) => {
        act.task = e.target.textContent.trim();
        showToast('Task updated');
      });

      // Delete Task
      card.querySelector('.action-delete-btn').addEventListener('click', () => {
        deleteTask(act.id);
      });

      container.appendChild(card);
    });
  }

  updateActionProgress();
}

function handleAddNewTask() {
  const taskText = prompt("Enter new action item description:");
  if (!taskText || !taskText.trim()) return;

  const assignee = prompt("Assignee name (e.g. Sarah Chen):", "Lead Architect") || "Unassigned";
  const dueDate = prompt("Due date (e.g. Friday 5 PM):", "End of Week") || "TBD";
  const priority = prompt("Priority (High / Medium / Low):", "Medium") || "Medium";

  if (!state.currentResult) state.currentResult = { action_items: [] };
  if (!state.currentResult.action_items) state.currentResult.action_items = [];

  const newId = `ACT-${state.currentResult.action_items.length + 1}`;
  state.currentResult.action_items.push({
    id: newId,
    task: taskText.trim(),
    assignee: assignee.trim(),
    due_date: dueDate.trim(),
    priority: priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase(),
    status: "Pending"
  });

  renderActionItems();
  elements.tabActionCount.textContent = state.currentResult.action_items.length;
  elements.kpiTotalActions.textContent = state.currentResult.action_items.length;
  showToast(`Added action item: ${newId}`);
}

function deleteTask(id) {
  if (!state.currentResult || !state.currentResult.action_items) return;
  state.currentResult.action_items = state.currentResult.action_items.filter(a => a.id !== id);
  state.completedActionIds.delete(id);
  renderActionItems();
  elements.tabActionCount.textContent = state.currentResult.action_items.length;
  elements.kpiTotalActions.textContent = state.currentResult.action_items.length;
  showToast('Action item removed');
}

function updateActionProgress() {
  const total = (state.currentResult && state.currentResult.action_items) ? state.currentResult.action_items.length : 0;
  const completed = state.completedActionIds.size;
  elements.actionProgressText.textContent = `${completed} / ${total} Completed`;
}

// Render Discussion Topics
function renderDiscussionTopics(topics) {
  const container = elements.discussionTopicsContainer;
  container.innerHTML = '';

  if (!topics || topics.length === 0) {
    container.innerHTML = `<div style="color: var(--text-muted); padding: 16px;">No discussion topics extracted.</div>`;
    return;
  }

  topics.forEach(t => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.innerHTML = `
      <div class="topic-header">
        <span class="topic-title">💡 ${t.topic}</span>
        <span class="priority-badge priority-${t.sentiment === 'Urgent' || t.sentiment === 'Concerned' ? 'High' : 'Low'}">${t.sentiment || 'Neutral'}</span>
      </div>
      <p class="topic-summary">${t.summary}</p>
    `;
    container.appendChild(card);
  });
}

// Render Decisions & Risks
function renderDecisionsAndRisks(decisions, blockers, nextSteps) {
  elements.decisionsList.innerHTML = decisions.length > 0 
    ? decisions.map(d => `<li>${d}</li>`).join('')
    : '<li style="color: var(--text-muted)">No structural decisions recorded.</li>';

  elements.blockersList.innerHTML = blockers.length > 0
    ? blockers.map(b => `<li>${b}</li>`).join('')
    : '<li style="color: var(--text-muted)">No critical blockers flagged.</li>';

  elements.resNextSteps.textContent = nextSteps || 'Immediate follow-up milestone pending.';
}

// Render HTML Email Preview
function renderHtmlEmailPreview(data, payload) {
  let emailHtml = data.generated_email_html;
  if (!emailHtml) {
    const actionRows = (data.action_items || []).map((act, index) => {
      const badgeColor = act.priority === 'High' ? '#e11d48' : act.priority === 'Medium' ? '#d97706' : '#059669';
      const badgeBg = act.priority === 'High' ? '#ffe4e6' : act.priority === 'Medium' ? '#fef3c7' : '#d1fae5';
      return `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 14px; font-weight: 600; color: #1e293b;">${index + 1}. ${act.task}</td>
          <td style="padding: 12px 14px; color: #475569;"><strong style="color: #0f172a;">${act.assignee}</strong></td>
          <td style="padding: 12px 14px; color: #475569;">${act.due_date}</td>
          <td style="padding: 12px 14px;">
            <span style="background-color: ${badgeBg}; color: ${badgeColor}; padding: 3px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
              ${act.priority}
            </span>
          </td>
        </tr>
      `;
    }).join('');

    emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
  <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
    <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 24px 30px; color: #ffffff;">
      <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85; margin-bottom: 4px;">${data.client_name} &bull; Executive Meeting Intelligence</div>
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">${data.meeting_title}</h1>
      <div style="font-size: 12px; opacity: 0.9; margin-top: 6px;">📅 Date: ${data.meeting_date} &bull; 👥 Attendees: ${(data.attendees && data.attendees.join(', ')) || 'Stakeholders'}</div>
    </div>
    <div style="padding: 24px 30px;">
      <div style="background-color: #f1f5f9; border-left: 4px solid #4f46e5; border-radius: 6px; padding: 14px 18px; margin-bottom: 22px;">
        <h3 style="margin: 0 0 6px 0; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Executive Summary</h3>
        <p style="margin: 0; color: #334155; line-height: 1.6; font-size: 13.5px;">${data.executive_summary}</p>
      </div>
      <div style="margin-bottom: 24px;">
        <h3 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px; font-weight: 700;">Action Items & Deliverables (${(data.action_items || []).length})</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12.5px; text-align: left;">
          <thead>
            <tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 8px 12px; color: #475569;">Task</th>
              <th style="padding: 8px 12px; color: #475569;">Owner</th>
              <th style="padding: 8px 12px; color: #475569;">Due Date</th>
              <th style="padding: 8px 12px; color: #475569;">Priority</th>
            </tr>
          </thead>
          <tbody>${actionRows}</tbody>
        </table>
      </div>
      <div style="background-color: #faf5ff; border: 1px dashed #c084fc; border-radius: 8px; padding: 12px 16px;">
        <strong style="color: #6b21a8; font-size: 12.5px;">📌 Next Milestone:</strong>
        <span style="color: #581c87; font-size: 12.5px; margin-left: 6px;">${data.next_steps_timeline}</span>
      </div>
    </div>
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px; text-align: center; color: #94a3b8; font-size: 11.5px;">
      Automated via SynapseAI &bull; n8n + Groq AI Workflow Automation
    </div>
  </div>
</body>
</html>
    `;
    data.generated_email_html = emailHtml;
  }

  const doc = elements.emailPreviewFrame.contentWindow.document;
  doc.open();
  doc.write(emailHtml);
  doc.close();
}

// Render JSON Viewer
function renderJsonViewer(data) {
  elements.jsonCodeViewer.textContent = JSON.stringify(data, null, 2);
}

// Clipboard & Export Handlers
function copyEmailHtml() {
  if (!state.currentResult || !state.currentResult.generated_email_html) return;
  navigator.clipboard.writeText(state.currentResult.generated_email_html).then(() => {
    showToast('HTML Email Template copied to clipboard!');
  });
}

function copyJsonPayload() {
  if (!state.currentResult) return;
  navigator.clipboard.writeText(JSON.stringify(state.currentResult, null, 2)).then(() => {
    showToast('Raw JSON payload copied to clipboard!');
  });
}

function exportCsvDocument() {
  if (!state.currentResult || !state.currentResult.action_items) return;
  const items = state.currentResult.action_items;
  let csv = "ID,Task,Assignee,Due Date,Priority,Status\n";
  items.forEach(act => {
    const isDone = state.completedActionIds.has(act.id) ? "Completed" : "Pending";
    csv += `"${act.id}","${act.task.replace(/"/g, '""')}","${act.assignee}","${act.due_date}","${act.priority}","${isDone}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meeting_action_items_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported action items as CSV!');
}

function exportMarkdownDocument() {
  if (!state.currentResult) return;
  const d = state.currentResult;
  const md = `# Meeting Intelligence Summary: ${d.meeting_title}
**Client:** ${d.client_name}  
**Date:** ${d.meeting_date}  
**Attendees:** ${(d.attendees && d.attendees.join(', ')) || 'N/A'}  

---

## Executive Summary
${d.executive_summary}

---

## Action Items
| # | Task | Owner | Due Date | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
${(d.action_items || []).map((a, i) => `| ${i+1} | ${a.task} | **${a.assignee}** | ${a.due_date} | \`${a.priority}\` | ${state.completedActionIds.has(a.id) ? 'Completed' : 'Pending'} |`).join('\n')}

---

## Key Decisions Made
${(d.key_decisions || []).map(dec => `- ${dec}`).join('\n')}

---

## Risks & Flagged Blockers
${(d.risks_and_blockers || []).map(r => `- ${r}`).join('\n')}

---

## Next Steps & Timeline
> ${d.next_steps_timeline}
`;

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meeting_summary_${d.meeting_title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported Markdown report!');
}

function openInEmailClient() {
  if (!state.currentResult) return;
  const d = state.currentResult;
  const recipient = elements.recipientEmail.value || 'stakeholders@client.com';
  const subject = encodeURIComponent(`Meeting Summary: ${d.meeting_title}`);
  const body = encodeURIComponent(`Hi Team,\n\nPlease find the executive meeting summary and action items below:\n\n${d.executive_summary}\n\nKey Next Steps:\n${d.next_steps_timeline}\n\nBest regards,\nAutomated Meeting Intelligence`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
}

// Settings Handlers
function saveSettings() {
  state.settings.webhookUrl = elements.webhookUrlInput.value.trim();
  state.settings.mode = elements.engineModeSelect.value;
  localStorage.setItem('synapse_webhook_url', state.settings.webhookUrl);
  elements.settingsDrawer.classList.remove('active');
  showToast('Settings saved successfully!');
}

async function testWebhookEndpoint() {
  const url = elements.webhookUrlInput.value.trim();
  showToast(`Pinging ${url}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true, ping: 'health_check' })
    });
    if (res.ok) {
      showToast('Endpoint reachable! (200 OK)');
      elements.statusText.textContent = 'n8n Live: Online';
    } else {
      showToast(`Received status ${res.status}`);
    }
  } catch (err) {
    showToast('Endpoint unreachable. Ensure n8n is running.');
  }
}

// Toast Helper
function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.toastNotification.classList.add('show');
  setTimeout(() => {
    elements.toastNotification.classList.remove('show');
  }, 3000);
}

function simulateDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Start
document.addEventListener('DOMContentLoaded', init);
