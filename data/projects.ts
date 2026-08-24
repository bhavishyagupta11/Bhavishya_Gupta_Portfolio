import { ProjectData } from '@/types';

export const projectsData: ProjectData[] = [
  {
    id: "futuremedia",
    name: "FutureMedia",
    tagline: "Social Media Platform with Asynchronous Task Architecture & Real-Time Messaging",
    category: "Full Stack",
    status: "Completed",
    year: "2025",
    problem: "Real-time social feeds suffer performance degradation when heavy tasks (image processing, notifications, feed fan-out) are handled synchronously in request-response cycles.",
    solution: "A full-stack social media application featuring ~35–45 REST API endpoints, Docker containerization across services, Redis-backed BullMQ for asynchronous background job execution, and real-time interaction via Socket.io.",
    myContribution: [
      "Architected MERN stack core with modular controllers, routes, and data models for users, posts, comments, likes, and followers.",
      "Implemented real-time bidirectional event handling using Socket.io for instant notifications and chat events.",
      "Integrated Redis and BullMQ to offload notification fan-outs and email dispatches to async background workers.",
      "Configured multi-container Docker setup for local service isolation (web, api, database, redis).",
      "Configured CI/CD via GitHub Actions for automated linting and testing pipelines."
    ],
    usedInProject: [
      "React.js", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Socket.io", "Docker", "JWT", "Cloudinary", "GitHub Actions"
    ],
    techStack: {
      frontend: ["React.js", "Tailwind CSS", "Socket.io-client", "Redux Toolkit"],
      backend: ["Node.js", "Express.js", "Socket.io", "BullMQ"],
      database: ["MongoDB", "Mongoose", "Redis"],
      tools: ["Docker", "Docker Compose", "Postman", "GitHub Actions"]
    },
    features: [
      "Real-time social feed with infinite scroll and media previews",
      "Bidirectional instant messaging & notifications via WebSockets",
      "Async background queue processing via Redis + BullMQ",
      "Containerized micro-services managed through Docker Compose",
      "Granular user privacy settings and follower relationship graph"
    ],
    engineeringDecisions: [
      {
        decision: "Asynchronous Notification Fan-out via BullMQ",
        rationale: "When a user with many followers posts, delivering notifications asynchronously prevents request timeout.",
        tradeoff: "Adds Redis infrastructure dependency and queue monitoring overhead."
      },
      {
        decision: "Hybrid REST + WebSocket Architecture",
        rationale: "REST handles idempotent CRUD data mutations, while WebSockets handle live ephemeral event pushes.",
        tradeoff: "Requires maintaining active socket connection state alongside stateless JWT auth."
      }
    ],
    challenges: [
      "Managing connection lifecycle and auto-reconnection for WebSockets across flaky network conditions.",
      "Structuring MongoDB indexing for optimal query performance on multi-parameter feed sorting."
    ],
    results: [
      "Built a high-throughput social backend with decoupled background queue processing."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "queues/notificationQueue.ts",
      code: `import { Queue, Worker, Job } from 'bullmq';
import { getIO } from '../sockets/socketManager';

const connection = { host: process.env.REDIS_HOST || '127.0.0.1', port: 6379 };

export const notificationQueue = new Queue('social-notifications', { connection });

// Background worker to deliver notifications asynchronously
export const notificationWorker = new Worker('social-notifications', async (job: Job) => {
  const { recipientId, senderId, actionType, entityId, timestamp } = job.data;
  
  const io = getIO();
  io.to('user_' + recipientId).emit('NEW_NOTIFICATION', {
    senderId,
    actionType,
    entityId,
    timestamp
  });

  return { delivered: true, recipientId };
}, { connection });`
    },
    architectureNodes: [
      {
        id: "frontend-spa",
        label: "React Client",
        role: "Client Application",
        tech: "React, Redux, Socket.io Client",
        description: "Renders responsive feed, handles media uploads, and listens to real-time WebSocket pushes.",
        category: "client",
        connections: ["express-api", "socket-server"]
      },
      {
        id: "express-api",
        label: "Express REST Server",
        role: "Application API",
        tech: "Node.js, Express, JWT",
        description: "Handles user auth, post creation, comments, relationships, and pushes jobs to BullMQ.",
        category: "api",
        connections: ["mongo-db", "bullmq-queue"]
      },
      {
        id: "bullmq-queue",
        label: "Redis + BullMQ Workers",
        role: "Async Background Worker",
        tech: "Redis, BullMQ",
        description: "Processes asynchronous tasks (notification delivery, feed calculation, email alerts) without blocking HTTP threads.",
        category: "infra",
        connections: ["socket-server"]
      },
      {
        id: "socket-server",
        label: "Socket.io Gateway",
        role: "Real-time WebSocket Hub",
        tech: "Socket.io",
        description: "Manages active user socket rooms and broadcasts real-time chat messages and notifications.",
        category: "api",
        connections: []
      },
      {
        id: "mongo-db",
        label: "MongoDB Primary Database",
        role: "Data Store",
        tech: "MongoDB, Mongoose",
        description: "Stores user accounts, post documents, comments, and relationship edge records.",
        category: "data",
        connections: []
      }
    ],
    githubUrl: "https://github.com/bhavishyagupta11/FutureMedia-A-Social-Media-Platform",
    liveUrl: "https://futuremedia-one.vercel.app/",
    verified: true
  },
  {
    id: "scholrboard",
    name: "ScholrBoard",
    tagline: "Centralized Student Achievement & Placement Management Ecosystem",
    category: "Full Stack",
    status: "Completed",
    year: "2025",
    problem: "Academic institutions suffer from fragmented achievement records, manual certificate verification bottlenecks, and disconnected communication between students, faculty advisors, and placement coordinators.",
    solution: "A unified full-stack MERN platform engineered with 4 hierarchical roles (Student, Advisor, Dept Coordinator, Admin), role-based access control, personalized analytics dashboards, and a 6-pipeline approval workflow for automated achievement lifecycle management.",
    myContribution: [
      "Architected the full-stack MERN foundation including MongoDB schema design, JWT authentication, and Express REST API routing.",
      "Designed and implemented 4 distinct role-based dashboard experiences (Student, Faculty Advisor, Department Coordinator, and Institutional Admin).",
      "Engineered the multi-step verification pipeline (Upload -> Advisor Review -> Coordinator Endorsement -> Admin Approval).",
      "Integrated Cloudinary for secure certificate attachment uploads and Nodemailer for event-driven notification emails.",
      "Built interactive student analytics visualizing verified vs pending submissions and placement readiness tracking."
    ],
    usedInProject: [
      "React.js", "Node.js", "Express.js", "MongoDB Atlas", "Mongoose", "JWT", "Cloudinary", "Nodemailer", "Tailwind CSS"
    ],
    techStack: {
      frontend: ["React.js", "Tailwind CSS", "Axios", "Lucide Icons"],
      backend: ["Node.js", "Express.js", "JWT Authentication", "Nodemailer"],
      database: ["MongoDB Atlas", "Mongoose ORM"],
      tools: ["Cloudinary API", "Postman", "Vercel"]
    },
    features: [
      "Hierarchical 4-tier Role-Based Access Control (RBAC)",
      "Multi-stage certificate verification and status audit trail",
      "Dynamic department and batch-wise student analytics",
      "Instant email alerts upon verification status changes",
      "Exportable verified achievement reports for placement drives"
    ],
    engineeringDecisions: [
      {
        decision: "Role-Based Middleware Gateways",
        rationale: "Ensures strict API protection at the route level rather than solely relying on client-side state.",
        tradeoff: "Requires token validation on every request, mitigated by lightweight JWT payload decoding."
      },
      {
        decision: "Cloudinary Signed Direct Uploads",
        rationale: "Offloads heavy binary file streaming from the application server, keeping backend memory usage low.",
        tradeoff: "Introduces external cloud dependency for media storage."
      },
      {
        decision: "Pipeline-based Document State Machine",
        rationale: "Models verification as a finite state machine (Draft -> Pending -> AdvisorApproved -> FinalVerified -> Rejected) to prevent unauthorized status jumps.",
        tradeoff: "Adds state validation checks on update mutations."
      }
    ],
    challenges: [
      "Enforcing strict access boundaries so faculty advisors only access students assigned to their specific department and batch.",
      "Handling edge-case document re-submissions and maintaining a clear rejection reasoning history."
    ],
    results: [
      "Successfully deployed and functional on Vercel with MongoDB Atlas backing.",
      "Supports end-to-end multi-role workflows without state corruption."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "services/verificationWorkflow.ts",
      code: `import { Request, Response } from 'express';
import { Achievement, IAchievement, VerificationStatus } from '../models/Achievement';
import { sendNotificationEmail } from '../utils/emailService';

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: 'student' | 'advisor' | 'coordinator' | 'admin'; department: string };
}

export async function advanceVerificationStage(req: AuthenticatedRequest, res: Response) {
  const { achievementId } = req.params;
  const { action, feedback } = req.body; // action: 'APPROVE' | 'REJECT' | 'REQUEST_CHANGES'
  const user = req.user;

  if (!user) return res.status(401).json({ error: 'Unauthorized user token' });

  const record = await Achievement.findById(achievementId).populate('studentId', 'name email');
  if (!record) return res.status(404).json({ error: 'Achievement record not found' });

  // Validate state transitions against role hierarchy
  if (user.role === 'advisor' && record.status === VerificationStatus.PENDING_ADVISOR) {
    record.status = action === 'APPROVE' ? VerificationStatus.PENDING_COORDINATOR : VerificationStatus.REJECTED;
    record.advisorFeedback = feedback;
    record.advisorReviewedAt = new Date();
  } else if (user.role === 'coordinator' && record.status === VerificationStatus.PENDING_COORDINATOR) {
    record.status = action === 'APPROVE' ? VerificationStatus.VERIFIED : VerificationStatus.REJECTED;
    record.coordinatorFeedback = feedback;
    record.coordinatorReviewedAt = new Date();
  } else {
    return res.status(403).json({ error: 'Current stage does not permit this role action' });
  }

  await record.save();
  await sendNotificationEmail(record.studentId.email, record.title, record.status, feedback);

  return res.status(200).json({ success: true, status: record.status, record });
}`
    },
    architectureNodes: [
      {
        id: "client-layer",
        label: "React Client SPA",
        role: "Frontend View & State",
        tech: "React 18, Tailwind, Context API",
        description: "Role-customized dashboards with dynamic form handling, document previews, and real-time status banners.",
        category: "client",
        connections: ["api-gateway"]
      },
      {
        id: "api-gateway",
        label: "Express REST API & Auth",
        role: "Backend & Gateway",
        tech: "Node.js, Express, JWT, RBAC Middleware",
        description: "40+ secured REST endpoints with token authentication and department-scoped authorization guards.",
        category: "api",
        connections: ["database-layer", "cloud-storage", "email-service"]
      },
      {
        id: "database-layer",
        label: "MongoDB Atlas",
        role: "Primary Document Store",
        tech: "MongoDB, Mongoose Schemas",
        description: "Stores user profiles, roles, achievement metadata, verification audit histories, and batch analytics.",
        category: "data",
        connections: []
      },
      {
        id: "cloud-storage",
        label: "Cloudinary CDN",
        role: "Media & Document Assets",
        tech: "Cloudinary API",
        description: "Handles secure upload, storage, and optimization for student certificate PDFs and verification receipts.",
        category: "infra",
        connections: []
      },
      {
        id: "email-service",
        label: "Nodemailer Service",
        role: "Event-Driven Notifications",
        tech: "Nodemailer, SMTP",
        description: "Dispatches transactional emails when students submit documents or when status updates occur.",
        category: "infra",
        connections: []
      }
    ],
    githubUrl: "https://github.com/bhavishyagupta11/ScholrBoard",
    liveUrl: "https://scholr-board-360.vercel.app/",
    verified: true
  },
  {
    id: "cogniflow",
    name: "CogniFlow",
    tagline: "Enterprise Multi-Agent RAG & Research Synthesis Assistant",
    category: "AI / ML",
    status: "Completed",
    year: "2026",
    problem: "Single-prompt LLM queries often hallucinate, miss subtle contextual document references, and cannot break down complex multi-hop research questions into structured investigative steps.",
    solution: "A multi-agent retrieval-augmented generation engine with specialized cooperating agents (Query Router, Document Retriever, Semantic Reranker, Answer Synthesizer, and Factuality Verifier) running over a hybrid retrieval pipeline.",
    myContribution: [
      "Designed the multi-agent orchestration architecture breaking research questions into discrete sub-tasks.",
      "Implemented the TF-IDF and Maximal Marginal Relevance (MMR) retrieval filtering pipeline for high diversity in context chunks.",
      "Constructed the Next.js TypeScript interface with real-time streaming agent thought processes and citations.",
      "Built provider-agnostic LLM interface supporting local models via Ollama as well as API endpoints with structured Zod schema output validation."
    ],
    usedInProject: [
      "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "RAG Pipeline", "TF-IDF + MMR", "Ollama", "Zod", "Lucide"
    ],
    techStack: {
      frontend: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      aiMl: ["Multi-Agent Pipeline", "RAG", "TF-IDF Vector Space", "MMR Scoring", "Ollama"],
      tools: ["Zod Schema Validation", "Vercel"]
    },
    features: [
      "5 specialized cooperating research agents",
      "Dynamic MMR reranking to eliminate redundant knowledge fragments",
      "Strict grounded factuality verification against source context",
      "Local model execution option via Ollama for zero-cost offline research",
      "Interactive agent thought process visualization"
    ],
    engineeringDecisions: [
      {
        decision: "Maximal Marginal Relevance (MMR) Chunk Selection",
        rationale: "Standard similarity search clusters very similar document chunks; MMR balances relevance with information diversity.",
        tradeoff: "Slight computational overhead during the reranking step, offset by superior synthesis quality."
      },
      {
        decision: "Structured Agent Output with Zod",
        rationale: "Forces LLM responses into strictly validated JSON schemas to prevent UI render crashes.",
        tradeoff: "Requires retry logic when LLM output occasionally violates the schema."
      }
    ],
    challenges: [
      "Balancing latency across multi-step agent reasoning chains while preserving streaming UX.",
      "Synthesizing conflicting information across separate document fragments accurately."
    ],
    results: [
      "Delivered reliable structured research reports with verifiable citations."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "lib/agents/orchestrator.ts",
      code: `import { z } from 'zod';
import { mmrRerank } from '../retrieval/mmr';
import { queryLocalLLM } from '../llm/provider';

const SynthesisSchema = z.object({
  directAnswer: z.string(),
  keyFindings: z.array(z.string()),
  citations: z.array(z.object({ chunkId: z.string(), source: z.string() })),
  confidenceScore: z.number().min(0).max(1)
});

export async function runResearchPipeline(query: string, rawChunks: { id: string; text: string; score: number }[]) {
  // Step 1: Maximal Marginal Relevance Reranking for Diversity (lambda = 0.65)
  const rankedChunks = mmrRerank(query, rawChunks, { topK: 5, lambda: 0.65 });

  // Step 2: Context String Assembly
  const contextBlock = rankedChunks.map(c => '[Doc ID: ' + c.id + ']: ' + c.text).join('\\n\\n');

  // Step 3: Structured Prompt with Verification Instruction
  const prompt = 'Synthesize answer for: ' + query;
  const rawResponse = await queryLocalLLM(prompt, { jsonMode: true });
  return SynthesisSchema.parse(JSON.parse(rawResponse));
}`
    },
    architectureNodes: [
      {
        id: "user-ui",
        label: "Next.js UI & Agent Stream",
        role: "Interactive Client",
        tech: "Next.js, TypeScript, Tailwind",
        description: "Provides query input, live streaming agent progress logs, and final synthesis preview with citations.",
        category: "client",
        connections: ["orchestrator"]
      },
      {
        id: "orchestrator",
        label: "Multi-Agent Orchestrator",
        role: "Execution Pipeline",
        tech: "TypeScript, State Controller",
        description: "Coordinates query decomposition, calls retrieval, routes data to reranker, and invokes synthesis.",
        category: "ai",
        connections: ["retrieval-engine", "llm-provider"]
      },
      {
        id: "retrieval-engine",
        label: "TF-IDF + MMR Reranker",
        role: "Context Retrieval",
        tech: "TF-IDF, MMR Cosine Diversity",
        description: "Searches ingested text chunks and selects the top diverse and relevant contexts for prompt grounding.",
        category: "data",
        connections: ["orchestrator"]
      },
      {
        id: "llm-provider",
        label: "LLM Execution Layer",
        role: "Inference Engine",
        tech: "Ollama / API Endpoints + Zod Validation",
        description: "Executes LLM inference with enforced JSON schemas, fallback retries, and strict grounding instructions.",
        category: "ai",
        connections: []
      }
    ],
    githubUrl: "https://github.com/bhavishyagupta11/CogniFlow",
    verified: true
  },
  {
    id: "intellex-ai",
    name: "Intellex AI",
    tagline: "Intelligent Document Parsing & Multi-Format Knowledge Intelligence System",
    category: "AI / ML",
    status: "Completed",
    year: "2025",
    problem: "Enterprises hold crucial knowledge locked inside PDFs, presentations, spreadsheets, and scanned documents that cannot be queried collaboratively or grounded for AI conversations.",
    solution: "A document intelligence platform that ingests multi-format files (PDF, Word, PPT, Excel, Images), performs deep text & structural extraction, indexes content for hybrid search, and enables contextual Q&A strictly grounded in the uploaded files.",
    myContribution: [
      "Built the React + TypeScript frontend dashboard with responsive document upload zone and live parsing state indicators.",
      "Designed the Flask backend API endpoints for document ingestion and text extraction orchestration.",
      "Implemented document chunking logic preserving paragraph context and metadata boundaries.",
      "Integrated full-text search indexing and structured conversation history tracking."
    ],
    usedInProject: [
      "React", "TypeScript", "Vite", "Python", "Flask", "Elasticsearch", "Redis", "Docker", "Tailwind CSS"
    ],
    techStack: {
      frontend: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      backend: ["Python", "Flask", "REST APIs"],
      database: ["Elasticsearch (hybrid indexing)", "Redis (caching/queue)"],
      tools: ["Docker", "Git"]
    },
    features: [
      "Multi-format ingestion pipeline (PDF, DOCX, XLSX, PPTX, Images)",
      "Chunk-level semantic tagging and source page tracking",
      "Context-grounded chat interface with direct page citations",
      "Session-based conversation persistence and query history",
      "Containerized deployment configuration for local or cloud hosting"
    ],
    engineeringDecisions: [
      {
        decision: "Hybrid Keyword + Semantic Search Strategy",
        rationale: "Exact keywords (e.g. part numbers, dates) perform best with inverted index search, while concepts benefit from vector embeddings.",
        tradeoff: "Requires dual indexing overhead on document ingestion."
      },
      {
        decision: "Client-Side Progressive Upload State",
        rationale: "Gives immediate visual progress across multi-page heavy document uploads.",
        tradeoff: "Requires robust error recovery if backend parsing stalls."
      }
    ],
    challenges: [
      "Handling heterogeneous file formats with diverse formatting and table structures without losing spatial context.",
      "Managing memory consumption during batch multi-page PDF processing."
    ],
    results: [
      "Engineered a resilient document ingestion pipeline capable of parsing complex technical materials."
    ],
    codeSnippet: {
      language: "python",
      filename: "services/document_parser.py",
      code: `import os
from typing import List, Dict, Any

class DocumentChunker:
    def __init__(self, chunk_size: int = 500, overlap: int = 75):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text_with_metadata(self, text: str, doc_id: str, source_filename: str) -> List[Dict[str, Any]]:
        words = text.split()
        chunks = []
        start = 0
        chunk_idx = 0

        while start < len(words):
            end = min(start + self.chunk_size, len(words))
            chunk_text = " ".join(words[start:end])
            
            chunks.append({
                "chunk_id": f"{doc_id}_c{chunk_idx}",
                "doc_id": doc_id,
                "source": source_filename,
                "text": chunk_text,
                "word_count": end - start,
                "start_idx": start,
                "end_idx": end
            })

            if end == len(words):
                break
            start += (self.chunk_size - self.overlap)
            chunk_idx += 1

        return chunks`
    },
    architectureNodes: [
      {
        id: "intellex-ui",
        label: "React + TS Dashboard",
        role: "User Workspace",
        tech: "React, TypeScript, Tailwind",
        description: "Upload dropzones, file previewer, real-time parsing progress, and grounded chat interface.",
        category: "client",
        connections: ["flask-gateway"]
      },
      {
        id: "flask-gateway",
        label: "Python Flask Backend",
        role: "Ingestion & API Gateway",
        tech: "Python, Flask RESTful",
        description: "Receives files, triggers OCR/parsers, slices text into bounded chunks with metadata, and handles chat sessions.",
        category: "api",
        connections: ["elastic-search", "redis-cache"]
      },
      {
        id: "elastic-search",
        label: "Elasticsearch Index",
        role: "Hybrid Search Store",
        tech: "Elasticsearch",
        description: "Maintains inverted indices of chunks for low-latency exact and semantic matching.",
        category: "data",
        connections: []
      },
      {
        id: "redis-cache",
        label: "Redis Cache & Broker",
        role: "Session & Async State",
        tech: "Redis",
        description: "Stores temporary upload queues and active user chat context memories.",
        category: "data",
        connections: []
      }
    ],
    githubUrl: "https://github.com/bhavishyagupta11/Intellex-AI",
    verified: true
  },
  {
    id: "stackmind",
    name: "StackMind",
    tagline: "AI-Powered Code Review & Algorithmic Complexity Analyzer",
    category: "Tools & Systems",
    status: "Completed",
    year: "2025",
    problem: "Developers and students practicing coding problems lack immediate, high-quality, structured feedback on time complexity, edge case bugs, and refactoring patterns without human code reviewers.",
    solution: "An interactive code analysis platform featuring an in-browser code editor, automated syntax validation, and Gemini-powered LLM analysis generating structured feedback on bugs, algorithmic Big-O complexity, and optimization opportunities.",
    myContribution: [
      "Integrated the in-browser code editor with syntax highlighting, custom theme support, and line numbering.",
      "Built the Express backend routing layer and integrated Google Gemini API with custom system prompts for structured code review.",
      "Implemented JWT authentication and review history persistence in MongoDB.",
      "Designed an 'Interview Mode' that generates mock interview follow-up questions based on submitted code."
    ],
    usedInProject: [
      "React", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Monaco Editor", "Gemini API"
    ],
    techStack: {
      frontend: ["React", "Vite", "Tailwind CSS", "Monaco Code Editor"],
      backend: ["Node.js", "Express.js", "Gemini API SDK"],
      database: ["MongoDB Atlas"],
      tools: ["Vercel", "Git"]
    },
    features: [
      "Embedded code editor with multi-language syntax highlighting",
      "Instant Big-O time and space complexity estimation",
      "Bug detection with suggested code patches",
      "Interactive technical interview mode with automated follow-ups",
      "Review history dashboard with categorized tags"
    ],
    engineeringDecisions: [
      {
        decision: "System-Prompt Grounded Output Format",
        rationale: "Instructs the AI model to return specific sections (Complexity, Bugs, Clean Code) rather than rambling text.",
        tradeoff: "Requires robust fallback parsing when formatting occasionally deviates."
      }
    ],
    challenges: [
      "Ensuring rapid response times during heavy code analysis prompts.",
      "Safely rendering multi-line code diffs within the React UI."
    ],
    results: [
      "Delivered a practical developer tool for instant algorithmic feedback."
    ],
    codeSnippet: {
      language: "typescript",
      filename: "services/aiReviewService.ts",
      code: `import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeCodeSnippet(code: string, language: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = 'Analyze this ' + language + ' code for production readiness:\\n' + code;
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text.replace(/json/g, '').trim());
}`
    },
    architectureNodes: [
      {
        id: "stack-editor",
        label: "Monaco Editor UI",
        role: "Client Editor",
        tech: "React, Monaco Editor",
        description: "Provides multi-language syntax support, keyboard shortcuts, and diff viewer.",
        category: "client",
        connections: ["review-api"]
      },
      {
        id: "review-api",
        label: "Express Analysis API",
        role: "Review Engine Gateway",
        tech: "Node.js, Express",
        description: "Validates input code, checks rate limits, and orchestrates prompts to Gemini API.",
        category: "api",
        connections: ["gemini-engine", "mongo-history"]
      },
      {
        id: "gemini-engine",
        label: "Google Gemini API",
        role: "AI Inference",
        tech: "Gemini 1.5 Flash",
        description: "Evaluates code syntax, logic paths, Big-O metrics, and suggested optimizations.",
        category: "ai",
        connections: []
      },
      {
        id: "mongo-history",
        label: "MongoDB Review Store",
        role: "Persistence",
        tech: "MongoDB Atlas",
        description: "Stores user accounts, code snippets, review timestamps, and historical reports.",
        category: "data",
        connections: []
      }
    ],
    githubUrl: "https://github.com/bhavishyagupta11/STACKMIND",
    verified: true
  },
  {
    id: "fintrackz",
    name: "FinTrackz",
    tagline: "Algorithmic Personal Finance & Recurring Subscription Tracker",
    category: "Frontend",
    status: "Completed",
    year: "2025",
    problem: "Most finance tracking apps require linking sensitive banking credentials or overwhelm users with convoluted multi-step forms just to monitor monthly recurring subscriptions and discretionary budgets.",
    solution: "A responsive client-side financial analytics web app equipped with an intelligent subscription detection algorithm, interactive monthly expense breakdown charts, and seamless local data management without external data leakage.",
    myContribution: [
      "Engineered the core subscription detection algorithm identifying recurring expense cycles based on transaction timestamps and nominal variance.",
      "Built interactive visualization charts using Chart.js displaying budget distributions and monthly trends.",
      "Designed a clean responsive UI with custom categorization, expense filters, and search capabilities.",
      "Implemented zero-latency local storage state sync for privacy-conscious expense tracking."
    ],
    usedInProject: [
      "HTML5", "CSS3", "JavaScript", "Vite", "Chart.js", "localStorage API"
    ],
    techStack: {
      frontend: ["HTML5", "CSS3", "Modern JavaScript (ES6+)", "Vite"],
      tools: ["Chart.js", "Local Storage API"]
    },
    features: [
      "Automated recurring subscription detector",
      "Dynamic interactive donut and bar chart financial visualizations",
      "Category-based budget allocation and threshold warning indicators",
      "Privacy-first architecture with 100% on-device data persistence",
      "CSV export and import capability for transaction backups"
    ],
    engineeringDecisions: [
      {
        decision: "Client-Side Subscription Detection Algorithm",
        rationale: "Analyzes recurring cadence (28-31 day frequency patterns) entirely within client browser memory for instant feedback.",
        tradeoff: "Processes transactions on client CPU, which is exceptionally fast for typical personal finance volume (<5,000 entries)."
      }
    ],
    challenges: [
      "Designing a robust frequency clustering heuristic that accurately identifies monthly recurring bills despite fluctuating billing dates (e.g. 28 vs 31 days).",
      "Maintaining smooth chart re-rendering performance when filtering across large transaction histories."
    ],
    results: [
      "Fast, private, and zero-dependency financial tracker running completely in-browser."
    ],
    codeSnippet: {
      language: "javascript",
      filename: "utils/subscriptionDetector.js",
      code: `export function detectSubscriptions(transactions) {
  const groupedByName = {};
  
  // Group transactions by normalized vendor name
  transactions.forEach(t => {
    const key = t.title.trim().toLowerCase();
    if (!groupedByName[key]) groupedByName[key] = [];
    groupedByName[key].push({ ...t, dateObj: new Date(t.date) });
  });

  const subscriptions = [];

  for (const [vendor, items] of Object.entries(groupedByName)) {
    if (items.length < 2) continue;
    
    // Sort chronologically
    items.sort((a, b) => a.dateObj - b.dateObj);
    
    // Check intervals between consecutive transactions (27 to 33 days for monthly)
    let isMonthly = true;
    for (let i = 1; i < items.length; i++) {
      const diffDays = (items[i].dateObj - items[i - 1].dateObj) / (1000 * 60 * 60 * 24);
      if (diffDays < 26 || diffDays > 34) {
        isMonthly = false;
        break;
      }
    }

    if (isMonthly) {
      const avgAmount = items.reduce((acc, curr) => acc + curr.amount, 0) / items.length;
      subscriptions.push({
        vendor,
        cadence: 'Monthly',
        averageAmount: avgAmount,
        lastBilled: items[items.length - 1].date,
        occurrenceCount: items.length
      });
    }
  }

  return subscriptions;
}`
    },
    architectureNodes: [
      {
        id: "ui-dashboard",
        label: "FinTrackz Web UI",
        role: "Client Dashboard",
        tech: "HTML5, CSS3, ES6 JavaScript",
        description: "Responsive expense entry form, categorized transaction table, and budget alert badges.",
        category: "client",
        connections: ["analytics-engine", "storage-controller"]
      },
      {
        id: "analytics-engine",
        label: "Analytics & Chart.js Engine",
        role: "Data Processing",
        tech: "Chart.js, Custom JS Algorithms",
        description: "Calculates category totals, runs the subscription frequency detection algorithm, and renders visual graphs.",
        category: "ai",
        connections: []
      },
      {
        id: "storage-controller",
        label: "Local Storage Manager",
        role: "Persistence Layer",
        tech: "Browser localStorage API",
        description: "Stores serialized transaction records locally for instant access and zero network latency.",
        category: "data",
        connections: []
      }
    ],
    githubUrl: "https://github.com/bhavishyagupta11/FinTrackz",
    verified: true
  }
];
