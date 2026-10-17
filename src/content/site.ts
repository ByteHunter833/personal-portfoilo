// Central portfolio content. Only facts supplied by Shukrullo — leave optional fields
// undefined rather than inventing details; the UI hides empty sections.

export const profile = {
  name: "Shukrullo Kurbonov",
  initials: "SK",
  title: "Backend-focused Software Engineer",
  tagline:
    "I build Python APIs and backend services with a focus on data integrity and clear API contracts.",
  seeking: "Seeking Software Engineering Intern opportunities",
  location: "Bukhara, Uzbekistan",
  github: "https://github.com/ByteHunter833",
  email: "shukrulloqurbonov342@gmail.com",
  linkedin: "https://www.linkedin.com/in/shukrullo-qurbonov-648934322/" as string | undefined,
  focus: ["Python", "FastAPI", "Django REST Framework", "PostgreSQL", "Redis", "Docker"],
  // Served from public/; set to undefined to hide every resume button.
  resumeUrl: "/shukrullo-kurbonov-resume.pdf" as string | undefined,
};

export type ArchNode = { label: string; note?: string };

export type Project = {
  slug: string;
  name: string;
  tier: "featured" | "primary" | "supporting";
  summary: string;
  purpose?: string;
  contribution?: string;
  technologies: string[];
  features: string[];
  architecture?: { entry: ArchNode; services: ArchNode[]; runtime?: string };
  decision?: { title: string; tradeoffs: string };
  verification?: string;
  limitations?: string;
  note?: string;
  repo: string;
  demo?: string;
};

export const projects: [Project, Project, ...Project[]] = [
  {
    slug: "online-banking-backend",
    name: "Online Banking System Backend",
    tier: "featured",
    summary:
      "Async FastAPI backend for an online banking system with authentication, role-based access, and safe internal transfers.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "async SQLAlchemy", "Alembic", "Redis", "Docker Compose"],
    features: [
      "JWT authentication with refresh-token rotation",
      "Role-based access control",
      "OTP verification",
      "Atomic and idempotent internal transfers",
      "Row-level locking",
      "Audit logging",
      "Administrative endpoints",
    ],
    architecture: {
      entry: { label: "FastAPI", note: "async API" },
      services: [
        { label: "PostgreSQL", note: "async SQLAlchemy · Alembic" },
        { label: "Redis" },
      ],
      runtime: "Docker Compose",
    },
    repo: "https://github.com/ByteHunter833/Online-banking-system-backend",
  },
  {
    slug: "aprisoil",
    name: "ApriSoil",
    tier: "primary",
    summary: "Backend for an agricultural application using soil-sensor data.",
    purpose: "Backend for an agricultural application using soil-sensor data.",
    technologies: ["Python", "Django REST Framework", "Docker"],
    features: [
      "APIs for fields, soil readings, forecasts, weather, and alerts",
      "Integration of a seven-day moisture prediction model",
      "Integration of an external weather API",
    ],
    architecture: {
      entry: { label: "Django REST Framework", note: "API" },
      services: [
        { label: "Moisture prediction model", note: "integrated" },
        { label: "External weather API" },
      ],
      runtime: "Docker",
    },
    note: "The moisture prediction model was integrated into the backend; it was not trained or developed by me.",
    repo: "https://github.com/ByteHunter833/aprisoil_backend_api",
  },
  {
    slug: "flask-ecommerce",
    name: "Flask E-Commerce App",
    tier: "supporting",
    summary: "A smaller supporting project: a Flask web store with accounts and a shopping cart.",
    technologies: ["Python", "Flask"],
    features: ["Authentication", "Session management", "Product catalog", "Shopping cart"],
    repo: "https://github.com/ByteHunter833/Ecom",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const experience = [
  {
    role: "Flutter Developer",
    company: "Brain Solutions MMC",
    location: "Baku, Azerbaijan",
    period: "June–July 2026",
    description:
      "Developed and maintained Flutter features within an MVVM/Clean Architecture codebase and integrated REST APIs.",
    relevance:
      "Working on the client side of REST integrations sharpened my understanding of how API contracts are consumed — which informs how I design backends.",
  },
];

export const education = {
  university: "Bukhara State University",
  field: "Information Technology / Computer Engineering",
  graduation: "Expected 2027",
  exchange: {
    school: "Baku Higher Oil School",
    period: "February–July 2026",
    label: "Academic exchange semester",
  },
};

export const languages = [
  { name: "Uzbek", level: "Native" },
  { name: "Russian", level: "C1" },
  { name: "English", level: "B2" },
];
