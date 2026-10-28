export type Project = {
  slug: string;
  title: string;
  category: string;
  status: string;
  year: string;
  tint: string;
  tagline: string;
  description: string;
  problem: string;
  stack: string[];
  platform: string;
  features: { title: string; text: string }[];
  flow: string[];
  notes: string[];
  links: { label: string; url: string }[];
  image?: string;
  featured?: boolean;
};
export const projects: Project[] = [
  {
    slug: "cambridge-school",
    title: "Cambridge School",
    category: "School finance & administration",
    status: "In progress",
    year: "2026",
    tint: "#c8d9ed",
    platform: "Web · PWA",
    featured: true,
    tagline: "A clearer picture of school operations.",
    description:
      "Student records, fees, expenses and teacher workflows, brought together in a role-aware school workspace.",
    problem:
      "School operations connect student records, fee collections, staff salaries and academic results. These workflows need a consistent source of data, with access that matches each person’s responsibilities.",
    stack: ["Angular", "TypeScript", "Firebase", "Tailwind CSS"],
    features: [
      {
        title: "School finance",
        text: "Fee collections, remaining dues, expenses and salary records in one workspace.",
      },
      {
        title: "Class-scoped access",
        text: "Teachers work with their assigned classes and results; administrative workflows stay separate.",
      },
      {
        title: "Payment history",
        text: "Partial payments, calculated balances and a history of who recorded each payment.",
      },
    ],
    flow: [
      "Student & class records",
      "Fee or expense entry",
      "Payment recording",
      "Balances & history",
    ],
    notes: [
      "Integer paisa values avoid floating-point money calculations.",
      "Firestore transactions guard expense records against concurrent overpayment.",
      "Cached records remain readable offline; finance saves require a connection.",
      "Teacher access is scoped through role and class checks.",
    ],
    links: [],
  },
  {
    slug: "hafiz-auto",
    title: "Hafiz Auto",
    category: "Car parts inventory",
    status: "In progress",
    year: "2026",
    tint: "#e4d8c7",
    platform: "Web · PWA",
    featured: true,
    tagline: "Keeping the business moving. Even offline.",
    description:
      "An inventory workspace for car parts, connecting purchases, stock lots, sales, suppliers and reports.",
    problem:
      "A car parts business needs purchases, stock and sales to stay in sync. An unreliable connection should not hide already downloaded records, and retrying a sale should not accidentally record it twice.",
    stack: ["Angular", "TypeScript", "Firebase", "Tailwind CSS"],
    features: [
      {
        title: "Inventory workflows",
        text: "Products, purchases, lots and sales with supplier and customer records.",
      },
      {
        title: "Offline operation queue",
        text: "IndexedDB stores pending work locally and exposes its synchronization status.",
      },
      {
        title: "Business reporting",
        text: "Monthly profit and loss, supplier payments and receipts.",
      },
    ],
    flow: [
      "Purchase & stock lots",
      "Sale saved locally",
      "Transaction & receipt",
      "Stock and reports updated",
    ],
    notes: [
      "Stable operation IDs and atomic receipts are designed to prevent duplicate replay.",
      "Conflicting edits stop for review rather than silently overwriting server changes.",
      "Stock is checked again inside the server transaction.",
      "Active development: backend permissions and end-to-end offline verification remain ongoing.",
    ],
    links: [],
  },
  {
    slug: "api-documentation",
    title: "API Documentation Portal",
    category: "Developer tooling",
    status: "Open source",
    year: "2025 — Present",
    tint: "#d9d2ee",
    platform: "Web",
    featured: true,
    tagline: "One schema. From documentation to execution.",
    description:
      "A schema-driven interface that brings API documentation and live request execution into the same workflow.",
    problem:
      "Hand-maintained API documentation drifts from implementation. A reusable schema can connect request definitions, nested form fields and the response viewer without rebuilding each interface.",
    stack: ["Angular", "TypeScript"],
    image: "/images/projects/api-documentation.webp",
    features: [
      {
        title: "Dynamic forms",
        text: "Recursive schema parsing renders nested request and response fields.",
      },
      {
        title: "Request execution",
        text: "Build headers, query parameters and JSON payloads from the same configuration.",
      },
      {
        title: "Response inspection",
        text: "Inspect responses and generate cURL requests within the interface.",
      },
    ],
    flow: [
      "Schema definition",
      "Generated form",
      "Execute request",
      "Inspect response",
    ],
    notes: [
      "UI rendering and request execution have separate responsibilities.",
      "Reusable components keep nested structures consistent.",
      "Cross-origin requests still depend on the target API’s CORS policy.",
    ],
    links: [
      {
        label: "Source code",
        url: "https://github.com/Bilal09505/api-documentation-portal",
      },
    ],
  },
  {
    slug: "metallix",
    title: "Metallix Platform",
    category: "Full stack application",
    status: "Selected work",
    year: "2024 — 2025",
    tint: "#d2ded4",
    platform: "Web",
    tagline: "A modular foundation for a growing platform.",
    description:
      "An Angular frontend and NestJS backend with REST APIs, authentication and role-based access.",
    problem:
      "Growing applications need clear boundaries between the interface, business logic and data. Metallix focuses on reusable components and a modular API architecture.",
    stack: ["Angular", "NestJS", "MongoDB", "TypeScript"],
    features: [
      {
        title: "Reusable interface",
        text: "Component-based Angular frontend.",
      },
      {
        title: "Modular services",
        text: "NestJS controllers and service layers.",
      },
      {
        title: "Access control",
        text: "Authentication and role-based authorization.",
      },
    ],
    flow: [
      "Angular interface",
      "Authenticated API",
      "Service layer",
      "MongoDB",
    ],
    notes: [
      "Separation of concerns supports maintainability.",
      "Input validation and centralized error handling protect API boundaries.",
    ],
    links: [
      {
        label: "Frontend",
        url: "https://github.com/Bilal09505/Metallix-Frontend",
      },
      {
        label: "Backend",
        url: "https://github.com/Bilal09505/Metallix-backend",
      },
    ],
  },
  {
    slug: "school-management",
    title: "School Management System",
    category: "Administration",
    status: "Selected work",
    year: "2023 — 2024",
    tint: "#d8e1ed",
    platform: "Web",
    tagline: "Everyday school workflows, connected.",
    description:
      "A Next.js school application with student records, attendance and an Express API.",
    problem:
      "Administrative teams need student information and attendance in a structured, accessible workspace.",
    stack: ["Next.js", "Express", "MySQL", "TypeScript"],
    features: [
      {
        title: "Student records",
        text: "Structured student information and CRUD workflows.",
      },
      {
        title: "Attendance",
        text: "Attendance tracking for school administration.",
      },
      {
        title: "Secure APIs",
        text: "Authentication and role-based authorization.",
      },
    ],
    flow: [
      "Authenticated user",
      "School dashboard",
      "Express API",
      "MySQL records",
    ],
    notes: [
      "Separate frontend and backend repositories.",
      "This is the earlier school project, distinct from Cambridge School.",
    ],
    links: [
      { label: "Frontend", url: "https://github.com/Bilal09505/school" },
      { label: "Backend", url: "https://github.com/Bilal09505/backend-school" },
    ],
  },
  {
    slug: "shopping",
    title: "E-Commerce & Shopping",
    category: "Commerce",
    status: "Selected work",
    year: "2022 — 2024",
    tint: "#eddbd4",
    platform: "Web",
    tagline: "From discovery to the shopping cart.",
    description:
      "Product listings, cart and order workflows with Firebase authentication and Firestore.",
    problem:
      "Commerce interfaces need to connect product browsing, account access and ordering in a responsive experience.",
    stack: ["Angular", "Firebase", "Node.js"],
    features: [
      {
        title: "Product discovery",
        text: "Responsive listings for browsing products.",
      },
      { title: "Cart & orders", text: "Connected shopping workflows." },
      {
        title: "Account access",
        text: "Firebase authentication and Firestore integration.",
      },
    ],
    flow: ["Browse products", "Add to cart", "Authenticate", "Order workflow"],
    notes: [
      "Responsive UI across device sizes.",
      "Shared Firebase services handle authentication and data.",
    ],
    links: [
      { label: "E-Commerce", url: "https://github.com/Bilal09505/E-Commerce" },
      { label: "Shopping", url: "https://github.com/Bilal09505/shopping" },
    ],
  },
  {
    slug: "doctor",
    title: "Doctor Appointment",
    category: "Health & mobile",
    status: "Selected work",
    year: "2022 — 2023",
    tint: "#cde2dc",
    platform: "Web · Mobile",
    tagline: "A connected appointment experience.",
    description:
      "Appointment scheduling and real-time updates with Angular, Ionic and Firebase.",
    problem:
      "Appointment workflows need a consistent experience on web and mobile, with account access and timely data updates.",
    stack: ["Angular", "Ionic", "Firebase"],
    features: [
      {
        title: "Appointments",
        text: "Scheduling workflows for medical services.",
      },
      {
        title: "Cross-platform UI",
        text: "Ionic components for web and mobile.",
      },
      {
        title: "Real-time data",
        text: "Firebase-powered updates and authentication.",
      },
    ],
    flow: [
      "Sign in",
      "Explore services",
      "Schedule appointment",
      "Receive updates",
    ],
    notes: [
      "Separate web and mobile repositories.",
      "Cross-platform UI built with Ionic.",
    ],
    links: [
      { label: "Web source", url: "https://github.com/Bilal09505/doctor" },
      {
        label: "Mobile source",
        url: "https://github.com/Bilal09505/doctor-mobile-app",
      },
    ],
  },
  {
    slug: "2048",
    title: "2048 & Interactive Games",
    category: "Creative coding",
    status: "Open source",
    year: "2022 — 2023",
    tint: "#e6dfc9",
    platform: "Web",
    tagline: "Small games. Thoughtful interactions.",
    description:
      "Browser-based experiments in game logic, animation and responsive interaction.",
    problem:
      "Games offer a practical way to explore state, input handling and clear feedback in a small interface.",
    stack: ["JavaScript", "HTML5", "CSS3"],
    features: [
      {
        title: "Game state",
        text: "Dynamic JavaScript logic for tile interactions.",
      },
      {
        title: "Responsive layouts",
        text: "A flexible interface across screen sizes.",
      },
      {
        title: "UI feedback",
        text: "Animations and interactions communicate state.",
      },
    ],
    flow: [
      "Player input",
      "Update state",
      "Apply game rules",
      "Render feedback",
    ],
    notes: [
      "Built with browser technologies.",
      "Focused on JavaScript fundamentals and UI handling.",
    ],
    links: [
      { label: "Source code", url: "https://github.com/Bilal09505/game2048" },
      { label: "Play game", url: "https://game2048-zeta.vercel.app" },
    ],
  },
];
