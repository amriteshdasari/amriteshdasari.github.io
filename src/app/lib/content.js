// Single source of truth for the site's copy: contact links, skills, the
// experience timeline, and the project archive the home page features from.

export const EMAIL = 'dmamritesh@gmail.com';
export const RESUME_URL =
  'https://drive.google.com/file/d/1SrO4j8d-Np81Mh2x0hQdJNxvgmtxce3V/view?usp=sharing';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/amritesh-dasari';

// First day in a production role — the hero derives "years in production" from it.
export const CAREER_START = new Date('2024-02-01');

export const FOCUS_AREAS = [
  {
    title: 'Platform & backend',
    body: 'Multi-service systems on Azure: Next.js fronts, Python workers, Postgres as the system of record, and the schedulers, locks, and heartbeats that keep them honest.',
  },
  {
    title: 'Applied AI',
    body: 'Document intelligence and language models put to work: cloud extraction pipelines, on-device inference that never leaves the machine, and Copilot integrations.',
  },
  {
    title: 'Data engineering',
    body: 'Pipelines that move messy archives into Snowflake, and the reporting built on top of them.',
  },
  {
    title: 'Identity & security',
    body: 'Entra ID sign-in and group-based access, Microsoft Graph at scale, email-compromise forensics, and DNS record validation.',
  },
];

// `core` items are the daily drivers and get visual emphasis.
export const SKILLS = [
  {
    label: 'Languages',
    core: ['TypeScript', 'Python', 'SQL'],
    more: ['Java', 'C++', 'C#', 'Dart', 'PowerShell'],
  },
  {
    label: 'Frameworks',
    core: ['Next.js', 'React', 'Flask'],
    more: ['Node.js', 'Express', 'Django', 'Spring Boot', 'Vite', 'Streamlit', 'Flutter'],
  },
  {
    label: 'Data & infrastructure',
    core: ['PostgreSQL', 'Snowflake', 'Docker', 'Kafka'],
    more: ['Redis', 'Celery', 'Kubernetes', 'MySQL', 'MongoDB', 'nginx', 'GitHub Actions', 'Bicep', 'Grafana', 'Sentry'],
  },
  {
    label: 'Cloud & AI',
    core: ['Azure', 'Microsoft Graph', 'Azure OpenAI'],
    more: ['Entra ID', 'Document Intelligence', 'Foundry Local', 'Ollama', 'Teams AI', 'Power Platform', 'AWS Lambda', 'Firebase', 'TensorFlow', 'OpenCV'],
  },
];

// Chronological — the story reads from the first lines of code to today.
export const TIMELINE = [
  {
    kind: 'Education',
    title: 'VIT Amaravati',
    subtitle: 'B.Tech in Computer Science — Networking & Cyber Security',
    period: '2018 — 2022',
    note: 'GPA 8.9 / 10',
    description:
      'Four years of fundamentals, networks, and security — and the discovery that systems are more interesting when they have to survive the real world.',
    stack: ['C++', 'Java', 'Networking', 'Security'],
    url: 'https://vitap.ac.in',
  },
  {
    kind: 'Internship',
    title: 'Blinkit (previously Grofers)',
    subtitle: 'Software Development Engineering Intern',
    period: 'Jan 2022 — Jul 2022',
    description:
      'First taste of scale: live order tracking with real-time location plotting, a new message delivery service, and cron automation for rate cards and user onboarding.',
    stack: ['Python', 'Kafka', 'Redis', 'Celery'],
    url: 'https://blinkit.com',
  },
  {
    kind: 'Education',
    title: 'University of Illinois Urbana-Champaign',
    subtitle: 'M.S. in Computer Science — Distributed & Cloud Systems',
    period: '2022 — 2023',
    note: 'GPA 3.43 / 4.0',
    description:
      'Fault tolerance, failure detectors, and versioned file systems — capped by a 10-node distributed ML cluster, built from scratch, that survived cascading failures.',
    stack: ['Distributed Systems', 'Cloud', 'PyTorch', 'gRPC'],
    url: 'https://illinois.edu',
  },
  {
    kind: 'Full-time',
    title: 'Princeton IT Services',
    subtitle: 'Software Development Engineer',
    period: 'Feb 2024 — Present',
    description:
      'Shipping for clients and for the company itself: a Microsoft 365 posture platform, document-AI tools that run in the cloud and on-device, enterprise Teams chatbots, data pipelines into Snowflake, and security tooling.',
    stack: ['Azure', 'TypeScript', 'Python', 'Microsoft Graph'],
    url: 'https://princetonits.com',
  },
];

// Newest first. Every item `id` doubles as its anchor on /projects.
// `period` is optional; entries without one render undated.
// `url` is optional: a public product site, linked under the entry.
export const ARCHIVE = [
  {
    id: 'princeton-it-services',
    title: 'Princeton IT Services',
    role: 'Software Development Engineer',
    period: 'Feb 2024 — Present',
    blurb: 'Enterprise systems, built and shipped for clients.',
    items: [
      {
        id: 'submission-desk',
        name: 'On-Device Submission Intake Console',
        context: 'Show-floor demo · local document AI',
        period: 'Aug — Oct 2026',
        stack: ['TypeScript', 'Vite', 'Python', 'Foundry Local', 'Ollama', 'PyMuPDF', 'OpenCV', 'PostgreSQL', 'Docker'],
        bullets: [
          'Built a full-screen intake console that turns a dropped broker packet — PDFs, scans, emails — into a structured submission record without sending a byte off the machine.',
          'Designed a deterministic-first pipeline: a Python sidecar reads text geometry, tables, and checkbox ink; a local small language model fills each field against a per-document-type schema at temperature 0, so the same page yields the same JSON.',
          'Implemented cross-document reconciliation that turns conflicts, corroborations, and unreadable fields into review items, with click-to-source that jumps to the exact bounding box a value came from.',
          'Wrote a bridge that fronts Foundry Local and llama.cpp/Ollama behind one OpenAI-compatible endpoint so the pipeline could use the GPU on an ARM box with no CUDA provider — a full packet went from ~10 minutes of model time on CPU to about a minute.',
          "Instrumented the browser's fetch for a wire log that proves nothing left the machine, plus live network state, a $0.00 metered-cost counter, and a Postgres case store with seen-before cross-checks per insured.",
          'Added presenter controls for a live stage run: a frozen demo packet, a golden fallback, a pipeline inspector showing every prompt and raw response, a client list grouped by insured, and JSON export, with unit tests over the pipeline logic.',
        ],
      },
      {
        id: 'copilot-apis-explorer',
        name: 'Microsoft 365 Copilot APIs Explorer',
        context: 'Proof of concept · Graph API exploration',
        period: 'Sep 2026',
        stack: ['Node.js', 'Express', 'MSAL', 'Microsoft Graph', 'Server-Sent Events', 'PowerShell'],
        bullets: [
          'Built a Node.js web app to exercise the Retrieval, Search, and Chat APIs of Microsoft 365 Copilot through Graph, showing the raw request and response for every call.',
          'Implemented Entra sign-in with PKCE via MSAL Node, a server-side token cache, and incremental consent per scope set so Retrieval works before an admin has consented to the Chat scopes.',
          'Proxied streaming Copilot chat over server-sent events and rendered citations, adaptive cards, and sensitivity labels from the response.',
          'Wrote a PowerShell setup script that registers the Entra app, resolves permission IDs by name instead of hard-coding GUIDs, and writes the environment file.',
          'Documented observed behaviour against the official docs — batch retrieval, paging quirks, and permission errors — as a reference for future integrations.',
        ],
      },
      {
        id: 'business-card-lead-capture',
        name: 'Business Card Intelligence',
        context: 'Product · mobile-first lead capture and follow-up CRM',
        period: 'Apr — Oct 2026',
        url: 'https://bizcardiq.com',
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Document Intelligence', 'Azure OpenAI', 'Microsoft Graph', 'Entra ID', 'Dynamics 365', 'Bicep', 'Vitest'],
        bullets: [
          'A mobile-first app that photographs a business card, extracts the lead with Azure Document Intelligence, normalizes it with Azure OpenAI, and stores a canonical record in PostgreSQL, with bulk PDF uploads, LinkedIn QR scans, memory photos, and an offline outbox.',
          'Microsoft Entra sign-in with authorization code + PKCE owned by the app, group membership checked through Graph, server-side sessions in Postgres, and an HTTP-only cookie.',
          'A follow-up composer that writes a new email or a reply in thread from the whole conversation, team notes, calendar context, optional deep research on the company, and selected news, with tone and free-text instructions.',
          'Two-way mailbox sync: drafts land in the user\'s Outlook, sends and replies are detected from Sent Items and the Inbox, each conversation renders as a chat, and reminders surface on a Today page and mirror into Microsoft To Do.',
          'A company news feed on an in-process scheduler: keyless RSS lookups, one small model call to confirm relevance and rate importance, a rolling seven-day window, and throttle-aware backoff that resumes where it stopped.',
          'Touchpoints from calls and matched Outlook meetings, hot / warm / cold lead ratings, a notes timeline, and admin feature flags for org-wide leads, one-way Dynamics 365 sync at a chosen cadence, and email tracking.',
          'An admin System Health tab with a grouped error log, weekly dependency audits in CI, and deployment to Azure App Service from Next.js standalone output with Bicep infrastructure and SQL migrations.',
        ],
      },
      {
        id: 'm365-posture-platform',
        name: 'Microsoft 365 Posture & Operations Platform',
        context: 'Product · three-service platform',
        period: 'Feb — Nov 2026',
        url: 'https://www.princetonsentinel.com',
        stack: ['Next.js', 'TypeScript', 'Python', 'Flask', 'PostgreSQL', 'Microsoft Graph', 'Entra ID', 'Dataverse', 'Azure OpenAI', 'Key Vault', 'Docker', 'Azure'],
        bullets: [
          'A three-service platform: a Next.js web app for dashboards and admin workflows, a Python/Flask worker for Microsoft Graph ingestion and scheduled jobs, and Postgres as the system of record with materialized-view reporting.',
          'Dashboards for SharePoint sites, activity, sharing, risk, users, and groups, with drill-down pages that combine cached inventory with live Graph checks and revoke actions.',
          'Copilot coverage: adoption, trend, and per-user usage from Microsoft\'s reports, prompt counts per user and app with no prompt text stored, agent telemetry from Application Insights, and data-risk and agent-risk dashboards with optional AI-written narratives.',
          'Agent controls: Dataverse-backed access control, Conditional Access block and unblock, service principal disable, and Copilot agent quarantine through Power Platform APIs, gated to Entra admin roles.',
          'A worker scheduler with Postgres advisory locks so a job never runs twice at once, interrupted-run recovery on startup, permission delta sync, and a heartbeat the web app surfaces.',
          'Scheduled risk reports emailed as PDFs through Graph, restricted to the tenant\'s own primary domain; signed license verification and feature flags gate every dashboard.',
          'Runtime config read live from Azure Key Vault, delegated tokens sealed with AES-256-GCM, forward-only SQL migrations, GitHub Actions deploys to staging and dev that hold on unconfirmed SQL changes, and scripts that upgrade existing client deployments.',
        ],
      },
      {
        id: 'bec-forensics',
        name: 'Business Email Compromise Forensics',
        context: 'Proof of concept · Microsoft 365 investigation tool',
        period: 'Apr 2026',
        stack: ['Next.js', 'TypeScript', 'Microsoft Graph', 'Vitest'],
        bullets: [
          'Built a Graph-only investigation tool: pick a tenant user and a UTC window, pull Entra sign-ins and Exchange message traces, and merge them into one normalized, time-sorted timeline.',
          'Implemented trace pivots from a single event by session, Message-ID, sender/recipient, and fallback IP, client, and user-agent matches, so an analyst can follow an attacker through the logs.',
          'Split message-trace queries into ten-day windows against the Graph endpoint that replaced the legacy Reporting Web Service, loading recipient transport details lazily on drill-down.',
          'Kept all evidence in server memory only, with unit tests over normalization, tracing, and mocked Graph responses.',
        ],
      },
      {
        id: 'nova',
        name: 'NOVA — Teams AI Chatbot',
        context: 'Conner Strong & Buckelew',
        stack: ['Teams AI', 'Azure OpenAI', 'Document Intelligence', 'Graph API', 'Key Vault'],
        bullets: [
          'Integrated Document Intelligence into a Teams chatbot application to enable document processing.',
          'Migrated the chatbot from a user-assigned managed identity to a single-tenant bot.',
          'Implemented Graph API access through an Entra app so the chatbot can move files to a temporary location.',
          'Moved secret keys and API endpoints to Azure Key Vault and integrated it with the Bicep code to load environment variables at deployment time.',
        ],
      },
      {
        id: 'latista',
        name: 'Latista Data Extraction & Dashboard',
        context: 'Clark Construction',
        stack: ['Python', 'Box SDK', 'Snowflake', 'PDFPlumber', 'Streamlit'],
        bullets: [
          "Designed a script using the Box SDK to connect to and copy Latista archival data from Oracle's data dump.",
          'Automated importing data from Box, cleaning it, and exporting it to the Snowflake data warehouse.',
          'Created scripts to extract and analyze JSON objects and generate entity relationships from the data.',
          'Used multiprocessing to extract text and images from PDF reports with PDFPlumber and Camelot.',
          'Explored and developed a user-friendly dashboard for the Latista data using Streamlit and React.',
        ],
      },
      {
        id: 'power-bi-migration',
        name: 'SAP BO to Power BI Migration',
        context: 'Clark Construction',
        stack: ['Power Automate', 'Power BI', 'Snowflake', 'SQL'],
        bullets: [
          'Designed a Power Automate flow that exports 2,000 Power BI paginated reports in under 2 hours.',
          'Converted KPI reports from SAP BO to Power BI dashboards backed by Snowflake data.',
          'Developed parameterized paginated reports for easy extraction of dashboard data.',
          'Explored and implemented data masking to hide sensitive and irrelevant data from reports.',
        ],
      },
      {
        id: 'data-quality',
        name: 'Data Quality Analysis',
        context: 'Clark Construction',
        stack: ['Snowflake', 'SQL', 'Python', 'Talend ETL'],
        bullets: [
          'Established metrics to analyze transfers between two different data flows.',
          'Designed complex SQL queries to gather the data points behind those metrics.',
          'Used Snowflake Time Travel to pull historical data points and establish trends for both flows.',
          'Explored automating the scripts with Snowflake Notebooks to generate daily stats for further analysis.',
        ],
      },
      {
        id: 'securedns',
        name: 'SecureDNS — DNS Record Validator',
        context: 'Internal security tool',
        stack: ['Python', 'Cryptography', 'Flask', 'AWS Lambda', 'Zappa'],
        bullets: [
          'Developed a security tool that checks and validates existing DNS records for DMARC, DKIM, and SPF.',
          "Implemented a user-friendly DNS record generation tool using Python's cryptography library.",
          'Deployed the application with Flask, Zappa, and AWS Lambda to a Princeton IT Services domain.',
        ],
      },
    ],
  },
  {
    id: 'blinkit',
    title: 'Blinkit (previously Grofers)',
    role: 'Software Development Engineering Intern',
    period: 'Jan 2022 — Jul 2022',
    blurb: 'The first production push — systems at quick-commerce scale.',
    items: [
      {
        id: 'order-tracking',
        name: 'Live Order Tracking',
        context: 'Real-time location plotting',
        stack: ['Python', 'Kafka', 'Redis'],
        bullets: [
          'Built a live order tracking feature with real-time location plotting for delivery updates.',
          'Helped deploy Nyaala, a new message delivery service replacing the older message queue.',
          'Integrated the tracking polyline into the CRM dashboard used by customer support agents.',
        ],
      },
      {
        id: 'rate-card-automation',
        name: 'Rate-Card Automation & User Onboarding',
        context: 'User management and automation',
        stack: ['Celery', 'Celery Beat', 'Redis'],
        bullets: [
          'Created cron jobs to update rate cards based on the time and source of changes.',
          'Automated user sorting and deactivation based on invalid or unavailable documents.',
          'Implemented a new background verification system to simplify onboarding.',
        ],
      },
    ],
  },
  {
    id: 'personal',
    title: 'Personal projects',
    role: 'Built after hours',
    period: 'Ongoing',
    blurb: 'Where the riskiest ideas get tried first.',
    items: [
      {
        id: 'dave-ai',
        name: 'Dave — Self-Hosted AI Code-Review Agent',
        context: 'Private AI assistant on Discord · local LLM',
        period: 'Oct 2026',
        stack: ['Python', 'Hermes Agent', 'llama.cpp', 'Qwen', 'Docker', 'GitHub Apps', 'Semgrep', 'SonarQube', 'Tailscale'],
        bullets: [
          'Built a private assistant you talk to on Discord, running an open-weights 27B model in llama.cpp on a DGX Spark over Tailscale, with automatic failover to the local GPU.',
          'Wrote a model gateway that routes to whichever server is up, tracks slots and slow starts, and gives summaries and titles a fast lane.',
          'Grew it into a pull request reviewer and repository watcher through a GitHub App: automatic reviews, daily digests, nightly scans, and a findings ledger fed by Semgrep and on-demand SonarQube.',
          'Sandboxed the agent: its shell lives in a container on an internal network whose only exit is a logging proxy that refuses private and tailnet addresses, and secrets stay with the services that need them.',
          'Added a monitor console for every container, session, route, and backup, with nightly backups and restarts that wait until the agent is idle.',
        ],
      },
      {
        id: 'distributed-ml-cluster',
        name: 'Distributed Machine Learning Cluster',
        context: '10-node fault-tolerant distributed system',
        stack: ['Python', 'Sockets', 'PyTorch', 'Multithreading'],
        bullets: [
          'Implemented a log saver across a 10-node distributed system to record machine crashes.',
          'Programmed a failure detector that catches simultaneous and cascading node failures.',
          'Designed SDFS, a versioned file system with replication for efficient storage.',
          'Built a multi-model distributed ML cluster with integrated failure detection.',
        ],
      },
      {
        id: 'bcfl',
        name: 'BCFL — Blockchain-based Federated Learning',
        context: 'Distributed systems research',
        stack: ['Python', 'gRPC', 'Blockchain', 'Proof-of-Work'],
        bullets: [
          'Researched ways to improve the security and reliability of federated learning.',
          'Incorporated a distributed ledger to track model updates over time.',
          'Replaced the central server with a group of miners.',
          'Validated model updates using proof-of-work on the miners.',
        ],
      },
      {
        id: 'blog-api',
        name: 'Blog Application',
        context: 'Spring Boot REST API',
        stack: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
        bullets: [
          'Developed RESTful APIs with Spring Boot, including CRUD, pagination, sorting, and authentication.',
          'Implemented role-based API security with JWT and Spring Security.',
          'Used Lombok, DTOs, and centralized exception handling for readability, maintainability, and error management.',
          'Configured one-to-many and many-to-many JPA mappings for complex data modeling.',
        ],
      },
      {
        id: 'chat-time',
        name: 'Chat-Time',
        context: 'Full-stack real-time chat app',
        stack: ['React', 'Node.js', 'Appwrite Cloud'],
        bullets: [
          'Built a real-time chat web application with React.',
          'Explored the features offered by Appwrite Cloud.',
          'Used a client–server subscription model to make messaging real time.',
          'Implemented message deletion so users can delete their own messages by message ID.',
        ],
      },
      {
        id: 'vtop-extended',
        name: 'VTOP-Extended',
        context: 'Campus companion app for VIT',
        stack: ['Flutter', 'Firebase'],
        bullets: [
          'Developed an Android app that serves as a central hub for students at Vellore Institute of Technology.',
          'Added Firebase Authentication to identify users and save their app preferences.',
          'Built club management, event reminders, and a faculty directory.',
          'Added a web view for the campus VTOP portal and an online quiz platform.',
        ],
      },
    ],
  },
];

export const PROJECT_COUNT = ARCHIVE.reduce((total, group) => total + group.items.length, 0);

// id → archive entry, so the home page can show an entry's period without duplicating it.
export const ARCHIVE_INDEX = Object.fromEntries(
  ARCHIVE.flatMap((group) => group.items.map((item) => [item.id, item]))
);

// Home-page picks: one per strength, each linking to its full archive entry.
export const FEATURED = [
  {
    id: 'm365-posture-platform',
    title: 'M365 posture platform',
    kind: 'Three-service security & operations platform',
    org: 'Princeton IT Services · product',
    summary:
      'A Next.js web app, a Python worker, and Postgres — dashboards over Microsoft Graph inventory with live drill-down and revoke, Copilot usage and agent-risk views with quarantine controls, a locked scheduler for ingestion jobs, and signed licensing.',
    highlight: 'Inventory, risk, and remediation for a whole tenant',
    stack: ['Next.js', 'Python', 'PostgreSQL', 'Microsoft Graph', 'Azure'],
  },
  {
    id: 'submission-desk',
    title: 'On-device intake desk',
    kind: 'Local document AI — nothing leaves the machine',
    org: 'Princeton IT Services · show-floor demo',
    summary:
      'Drop a broker packet in and watch a structured submission build itself: a Python sidecar reads geometry, tables, and checkboxes; a local language model fills every field; conflicts become review items with click-to-source provenance.',
    highlight: 'A wire log that proves nothing left the machine',
    stack: ['TypeScript', 'Python', 'Foundry Local', 'Ollama', 'PostgreSQL'],
  },
  {
    id: 'business-card-lead-capture',
    title: 'Business Card Intelligence',
    kind: 'Mobile-first lead capture and follow-up CRM',
    org: 'Princeton IT Services · product',
    summary:
      'Photograph a card, get a lead: Document Intelligence extracts it, Azure OpenAI normalizes it, Postgres keeps it, and Graph drafts the follow-up in thread — with two-way Outlook sync, reminders, and a company news feed.',
    highlight: 'From a photo to a threaded follow-up',
    stack: ['Next.js', 'Azure OpenAI', 'Document Intelligence', 'Microsoft Graph'],
  },
  {
    id: 'dave-ai',
    title: 'Dave, a self-hosted AI agent',
    kind: 'Code-review agent on a local LLM',
    org: 'Personal project',
    summary:
      'A Discord assistant on a 27B open-weights model served from a DGX Spark with local GPU failover, grown into a GitHub pull request reviewer and repo watcher, with a sandboxed shell whose only way out is a logging proxy.',
    highlight: 'Reviews pull requests on its own hardware',
    stack: ['Python', 'llama.cpp', 'Docker', 'GitHub Apps'],
  },
];
