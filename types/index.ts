export type ThemeName = 'dark-plus' | 'midnight' | 'light-plus';
export type WorkspaceMode = 'developer' | 'recruiter' | 'terminal';
export type ProjectTabMode = 'preview' | 'code' | 'architecture';
export type ActivityTab = 'explorer' | 'search' | 'projects' | 'github' | 'skills' | 'terminal' | 'settings';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  extension?: string;
  path: string;
  category?: 'projects' | 'coding' | 'system' | 'docs' | 'certs' | 'root';
  children?: FileItem[];
  size?: string;
  description?: string;
}

export interface ProjectArchitectureNode {
  id: string;
  label: string;
  role: string;
  tech: string;
  description: string;
  category: 'client' | 'api' | 'data' | 'ai' | 'infra';
  connections: string[];
}

export interface ProjectData {
  id: string;
  name: string;
  tagline: string;
  category: 'Full Stack' | 'AI / Systems' | 'Systems & APIs' | string;
  year: string;
  status: 'Production' | 'Shipped' | 'Live Demo' | 'Completed' | string;
  problem: string;
  solution: string;
  myContribution: string[];
  usedInProject: string[];
  techStack?: Record<string, string[]>;
  features?: string[];
  engineeringDecisions?: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  decisions?: {
    decision: string;
    rationale: string;
    tradeoff: string;
  }[];
  personallyImplemented?: string[];
  presentInArchitecture?: string[];
  learningOrExploring?: string[];
  challenges?: string[];
  results?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  codeSnippet: {
    language: string;
    filename: string;
    code: string;
  };
  architectureNodes: ProjectArchitectureNode[];
  githubUrl?: string;
  liveUrl?: string;
  verified?: boolean;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  contributions: string[];
  technologies: string[];
  verified: boolean;
}

export interface EducationItem {
  institution: string;
  location?: string;
  degree: string;
  specialization?: string;
  period: string;
  grade: string;
  highlights?: string[];
  coursework?: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    levelDescription: string;
    projects: string[];
    categoryTag: 'core' | 'framework' | 'tool' | 'concept';
  }[];
}

export interface CodingProfile {
  platform: string;
  handle: string;
  url: string;
  stats: {
    label: string;
    value: string | number;
  }[];
  highlights?: string[];
  verifiedCount?: string;
}

export interface TerminalHistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
  isError?: boolean;
}
