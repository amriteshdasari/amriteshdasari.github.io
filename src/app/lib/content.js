// Single source of truth for the site's copy: contact links, skills, the
// experience timeline, and the project archive the home page features from.

export const EMAIL = 'dmamritesh@gmail.com';
export const RESUME_URL =
  'https://drive.google.com/file/d/1SrO4j8d-Np81Mh2x0hQdJNxvgmtxce3V/view?usp=sharing';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/amritesh-dasari';

export const FOCUS_AREAS = [
  {
    title: 'Distributed systems',
    body: 'Fault tolerance, failure detection, and replication — from a 10-node cluster built from scratch to production message queues.',
  },
  {
    title: 'Data engineering',
    body: 'Pipelines that move messy archives into Snowflake, and the reporting built on top of them.',
  },
  {
    title: 'Applied AI',
    body: 'Enterprise assistants on Azure OpenAI and Microsoft Teams, with document processing built in.',
  },
];

// `core` items are the daily drivers and get visual emphasis.
export const SKILLS = [
  {
    label: 'Languages',
    core: ['Python', 'SQL'],
    more: ['Java', 'TypeScript', 'C++', 'C#', 'Dart'],
  },
  {
    label: 'Frameworks',
    core: ['Flask', 'React'],
    more: ['Django', 'Spring Boot', 'Node.js', 'Next.js', 'Streamlit', 'Flutter', 'Native Android'],
  },
  {
    label: 'Data & infrastructure',
    core: ['Kafka', 'PostgreSQL', 'Snowflake', 'Docker', 'Kubernetes'],
    more: ['Redis', 'Celery', 'MySQL', 'MongoDB', 'nginx', 'Jenkins', 'Grafana', 'Sentry'],
  },
  {
    label: 'Cloud & AI',
    core: ['Azure'],
    more: ['Document Intelligence', 'Teams AI', 'AWS Lambda', 'Firebase', 'TensorFlow', 'TensorFlow Lite', 'OpenCV'],
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
      'Shipping for clients: enterprise Teams chatbots, data pipelines into Snowflake, BI migrations, and DNS security tooling.',
    stack: ['Azure', 'Python', 'Snowflake', 'Teams AI'],
    url: 'https://princetonits.com',
  },
];

// Newest first. Every item `id` doubles as its anchor on /projects.
export const ARCHIVE = [
  {
    id: 'princeton-it-services',
    title: 'Princeton IT Services',
    role: 'Software Development Engineer',
    period: 'Feb 2024 — Present',
    blurb: 'Enterprise systems, built and shipped for clients.',
    items: [
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

// Home-page picks: one per strength, each linking to its full archive entry.
export const FEATURED = [
  {
    id: 'nova',
    title: 'NOVA',
    kind: 'Teams AI chatbot',
    org: 'Princeton IT Services · for Conner Strong & Buckelew',
    summary:
      'An enterprise assistant inside Microsoft Teams that reads and processes documents — Document Intelligence for extraction, Graph API for file handling, and secrets kept in Key Vault.',
    highlight: 'Document processing, right inside Teams',
    stack: ['Azure OpenAI', 'Document Intelligence', 'Graph API', 'Key Vault'],
  },
  {
    id: 'latista',
    title: 'Latista pipeline',
    kind: 'Data extraction & dashboard',
    org: 'Princeton IT Services · for Clark Construction',
    summary:
      "Moved Latista's archival data out of an Oracle dump and into Snowflake — automated import, cleaning, and export, with multiprocess PDF extraction and a Streamlit dashboard on top.",
    highlight: 'Archive to warehouse, fully automated',
    stack: ['Python', 'Box SDK', 'Snowflake', 'Streamlit'],
  },
  {
    id: 'order-tracking',
    title: 'Live order tracking',
    kind: 'Real-time delivery updates',
    org: 'Blinkit',
    summary:
      'Real-time delivery tracking with live location plotting, carried by a new message delivery service and surfaced in the CRM dashboard support agents work from.',
    highlight: 'Real-time updates at quick-commerce scale',
    stack: ['Python', 'Kafka', 'Redis'],
  },
  {
    id: 'distributed-ml-cluster',
    title: 'Distributed ML cluster',
    kind: '10-node fault-tolerant system',
    org: 'Personal project',
    summary:
      'Built from scratch: crash logging, a failure detector for simultaneous and cascading failures, SDFS — a versioned, replicated file system — and multi-model training on top.',
    highlight: 'Survives cascading node failures',
    stack: ['Python', 'PyTorch', 'Sockets'],
  },
];
