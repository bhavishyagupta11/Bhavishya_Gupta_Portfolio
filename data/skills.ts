import { SkillCategory } from '@/types';

export const skillsData: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    skills: [
      { name: "C++", levelDescription: "Primary language for Data Structures, Algorithms & Competitive Programming (600+ solved)", projects: ["LeetCode", "CodeHunt (1st Place)", "Code360"], categoryTag: "core" },
      { name: "JavaScript (ES6+)", levelDescription: "Core language for full-stack web applications and asynchronous programming", projects: ["ScholrBoard", "FutureMedia", "Ghai Technologies", "FinTrackz"], categoryTag: "core" },
      { name: "TypeScript", levelDescription: "Type-safe systems development with strict interface definitions and Zod schemas", projects: ["CogniFlow", "Intellex AI", "Portfolio IDE"], categoryTag: "core" },
      { name: "Python", levelDescription: "AI/ML data manipulation, Flask API backend, and algorithm scripts", projects: ["Intellex AI", "Samatrix AI Projects", "Data Analytics"], categoryTag: "core" },
      { name: "Java", levelDescription: "Object-oriented programming, inheritance, design patterns, and multithreading", projects: ["Academic Projects", "DSA Practice"], categoryTag: "core" },
      { name: "SQL", levelDescription: "Relational database queries, joins, indexing, and schema modeling", projects: ["Academic DB Lab", "MySQL Projects"], categoryTag: "core" }
    ]
  },
  {
    name: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "React.js", levelDescription: "Component lifecycle, custom hooks, context state management, and virtual DOM optimization", projects: ["ScholrBoard", "FutureMedia", "Ghai Technologies", "StackMind"], categoryTag: "framework" },
      { name: "Next.js (App Router)", levelDescription: "Server and client components, API routing, and optimized static site generation", projects: ["CogniFlow", "Portfolio IDE"], categoryTag: "framework" },
      { name: "Tailwind CSS", levelDescription: "Utility-first responsive layouts, CSS custom property theming, and dark mode systems", projects: ["CogniFlow", "ScholrBoard", "Portfolio IDE"], categoryTag: "framework" },
      { name: "HTML5 & CSS3", levelDescription: "Semantic HTML markup, CSS Grid, Flexbox, responsive typography, and web accessibility", projects: ["Ghai Technologies", "FinTrackz", "Personal Portfolio"], categoryTag: "core" },
      { name: "Vite", levelDescription: "Modern fast bundler, HMR development server, and build optimization", projects: ["Intellex AI", "StackMind", "FinTrackz"], categoryTag: "tool" }
    ]
  },
  {
    name: "Backend & Systems",
    icon: "Server",
    skills: [
      { name: "Node.js", levelDescription: "Event-driven runtime, non-blocking I/O, file streams, and npm ecosystem", projects: ["ScholrBoard", "FutureMedia", "StackMind"], categoryTag: "framework" },
      { name: "Express.js", levelDescription: "RESTful API routing, middleware chaining, error handlers, and authentication guards", projects: ["ScholrBoard", "FutureMedia", "StackMind"], categoryTag: "framework" },
      { name: "RESTful API Design", levelDescription: "Stateless endpoint architecture, HTTP status codes, structured JSON payloads, and pagination", projects: ["ScholrBoard (40+ endpoints)", "Ghai Technologies", "FutureMedia"], categoryTag: "concept" },
      { name: "OAuth 2.0 & JWT", levelDescription: "Token authentication, refresh token flows, and role-based access control (RBAC)", projects: ["ScholrBoard", "Ghai Technologies", "StackMind"], categoryTag: "concept" },
      { name: "Socket.io", levelDescription: "Bidirectional WebSocket communication for real-time notifications and chat messaging", projects: ["FutureMedia"], categoryTag: "framework" },
      { name: "BullMQ & Redis", levelDescription: "Asynchronous background task queuing and redis memory cache", projects: ["FutureMedia"], categoryTag: "framework" }
    ]
  },
  {
    name: "Databases & Storage",
    icon: "Database",
    skills: [
      { name: "MongoDB & Mongoose", levelDescription: "Document schema modeling, aggregation pipelines, indexing, and Atlas cloud clusters", projects: ["ScholrBoard", "FutureMedia", "StackMind"], categoryTag: "framework" },
      { name: "MySQL / Relational DBs", levelDescription: "Relational schema normalization (3NF), foreign keys, transactions, and ACID principles", projects: ["DBMS Academic Coursework"], categoryTag: "core" },
      { name: "Redis", levelDescription: "In-memory key-value caching and job queue broker", projects: ["FutureMedia"], categoryTag: "framework" },
      { name: "Cloudinary", levelDescription: "Media asset hosting, document attachment CDN, and image transformations", projects: ["ScholrBoard"], categoryTag: "tool" }
    ]
  },
  {
    name: "AI & Machine Learning",
    icon: "Brain",
    skills: [
      { name: "RAG & Document Intelligence", levelDescription: "Chunking strategies, TF-IDF / vector search, context retrieval, and MMR reranking", projects: ["CogniFlow", "Intellex AI"], categoryTag: "concept" },
      { name: "LLM Orchestration & Prompts", levelDescription: "Structured output extraction with Zod schemas, system prompting, and Ollama integration", projects: ["CogniFlow", "StackMind"], categoryTag: "concept" },
      { name: "NumPy & Pandas", levelDescription: "Array operations, data wrangling, dataframe aggregation, and cleaning", projects: ["Samatrix AI Labs", "Data Analysis"], categoryTag: "framework" },
      { name: "Scikit-Learn & ML Basics", levelDescription: "Supervised and unsupervised learning, regression, classification, and evaluation metrics", projects: ["Academic AI/ML Coursework"], categoryTag: "framework" }
    ]
  },
  {
    name: "Core CS & Developer Tools",
    icon: "Cpu",
    skills: [
      { name: "Data Structures & Algorithms", levelDescription: "800+ solved problems across Binary Search, Trees, Graphs, Dynamic Programming, Greedy", projects: ["LeetCode (1779 Rating)", "GFG", "Code360"], categoryTag: "core" },
      { name: "Git & GitHub", levelDescription: "Branching strategies, pull requests, merge conflict resolution, and version control", projects: ["All Projects", "Ghai Technologies SDLC"], categoryTag: "tool" },
      { name: "Docker", levelDescription: "Containerizing services via Dockerfile and multi-service orchestration with Docker Compose", projects: ["FutureMedia", "Intellex AI"], categoryTag: "tool" },
      { name: "Operating Systems & DBMS", levelDescription: "Process synchronization, memory management, file systems, concurrency, and SQL transactions", projects: ["B.Tech Core Curriculum"], categoryTag: "concept" },
      { name: "Postman", levelDescription: "API testing, environment variables, collection documentation, and auth testing", projects: ["ScholrBoard", "Ghai Technologies"], categoryTag: "tool" }
    ]
  }
];
