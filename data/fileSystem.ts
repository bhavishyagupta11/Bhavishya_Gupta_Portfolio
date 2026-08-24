import { FileItem } from '@/types';

export const virtualFileSystem: FileItem = {
  id: "root",
  name: "BHAVISHYA",
  path: "",
  type: "folder",
  children: [
    {
      id: "readme-md",
      name: "README.md",
      path: "README.md",
      type: "file",
      extension: "md",
      category: "root",
      description: "Developer profile overview, quick elevator pitch, and fast navigation links."
    },
    {
      id: "about-md",
      name: "about.md",
      path: "about.md",
      type: "file",
      extension: "md",
      category: "root",
      description: "Background, software engineering focus, technical interests, and philosophy."
    },
    {
      id: "experience-json",
      name: "experience.json",
      path: "experience.json",
      type: "file",
      extension: "json",
      category: "root",
      description: "Professional work experience as SDE Intern at Ghai Technologies."
    },
    {
      id: "education-json",
      name: "education.json",
      path: "education.json",
      type: "file",
      extension: "json",
      category: "root",
      description: "B.Tech in Computer Science (AI & ML) from JECRC University (CGPA: 9.30, 2023–2027)."
    },
    {
      id: "skills-json",
      name: "skills.json",
      path: "skills.json",
      type: "file",
      extension: "json",
      category: "root",
      description: "Technical skills arsenal with verified project associations."
    },
    {
      id: "achievements-md",
      name: "achievements.md",
      path: "achievements.md",
      type: "file",
      extension: "md",
      category: "root",
      description: "Coding championship victories, hackathon rankings, and leadership milestones."
    },
    {
      id: "projects-folder",
      name: "projects",
      path: "projects",
      type: "folder",
      category: "projects",
      children: [
        {
          id: "futuremedia-tsx",
          name: "futuremedia.tsx",
          path: "projects/futuremedia.tsx",
          type: "file",
          extension: "tsx",
          category: "projects",
          description: "FutureMedia: Social Media Platform with Redis BullMQ & Socket.io."
        },
        {
          id: "scholrboard-tsx",
          name: "scholrboard.tsx",
          path: "projects/scholrboard.tsx",
          type: "file",
          extension: "tsx",
          category: "projects",
          description: "ScholrBoard: Student Achievement & Placement Platform (MERN, Live)."
        },
        {
          id: "cogniflow-tsx",
          name: "cogniflow.tsx",
          path: "projects/cogniflow.tsx",
          type: "file",
          extension: "tsx",
          category: "projects",
          description: "CogniFlow: Enterprise Multi-Agent RAG & Research Synthesis Assistant."
        },
        {
          id: "intellex-ai-tsx",
          name: "intellex-ai.tsx",
          path: "projects/intellex-ai.tsx",
          type: "file",
          extension: "tsx",
          category: "projects",
          description: "Intellex AI: Document Intelligence & Multi-Format Knowledge System."
        },
        {
          id: "stackmind-tsx",
          name: "stackmind.tsx",
          path: "projects/stackmind.tsx",
          type: "file",
          extension: "tsx",
          category: "projects",
          description: "StackMind: AI Code Review & Algorithmic Complexity Platform."
        },
        {
          id: "fintrackz-tsx",
          name: "fintrackz.tsx",
          path: "projects/fintrackz.tsx",
          type: "file",
          extension: "tsx",
          category: "projects",
          description: "FinTrackz: Algorithmic Personal Finance & Subscription Tracker."
        }
      ]
    },
    {
      id: "coding-folder",
      name: "coding",
      path: "coding",
      type: "folder",
      category: "coding",
      children: [
        {
          id: "leetcode-md",
          name: "leetcode.md",
          path: "coding/leetcode.md",
          type: "file",
          extension: "md",
          category: "coding",
          description: "LeetCode: Live problem solving metrics, contest rating, submission activity, and streaks."
        },
        {
          id: "gfg-code360-md",
          name: "gfg-code360.md",
          path: "coding/gfg-code360.md",
          type: "file",
          extension: "md",
          category: "coding",
          description: "GeeksforGeeks & Code360: Problem counts, coding score, contest rating, and interview prep."
        },
        {
          id: "github-md",
          name: "github.md",
          path: "coding/github.md",
          type: "file",
          extension: "md",
          category: "coding",
          description: "GitHub: Live analytics, public repos, language distribution, and real 52-week activity heatmap."
        },
        {
          id: "codolio-md",
          name: "codolio.md",
          path: "coding/codolio.md",
          type: "file",
          extension: "md",
          category: "coding",
          description: "Codolio: Unified multi-platform coding profile, consistency score, and cross-platform aggregates."
        }
      ]
    },
    {
      id: "certs-folder",
      name: "certificates",
      path: "certificates",
      type: "folder",
      category: "certs",
      children: [
        {
          id: "certifications-json",
          name: "certifications.json",
          path: "certificates/certifications.json",
          type: "file",
          extension: "json",
          category: "certs",
          description: "Professional technical certifications from ServiceNow, Google Cloud, NPTEL, Samatrix."
        }
      ]
    },
    {
      id: "resume-pdf",
      name: "resume.pdf",
      path: "resume.pdf",
      type: "file",
      extension: "pdf",
      category: "root",
      description: "Official resume preview, download, and ATS-friendly text overview."
    },
    {
      id: "contact-ts",
      name: "contact.ts",
      path: "contact.ts",
      type: "file",
      extension: "ts",
      category: "root",
      description: "Direct email, LinkedIn, GitHub, and professional contact links."
    }
  ]
};

// Flatten helper to easily lookup files by path or ID
export function getAllFiles(root: FileItem = virtualFileSystem): FileItem[] {
  const result: FileItem[] = [];
  function traverse(item: FileItem) {
    if (item.type === 'file') {
      result.push(item);
    }
    if (item.children) {
      item.children.forEach(traverse);
    }
  }
  traverse(root);
  return result;
}

export function findFileByPath(path: string): FileItem | undefined {
  const all = getAllFiles();
  return all.find(f => f.path.toLowerCase() === path.toLowerCase() || f.name.toLowerCase() === path.toLowerCase());
}

export function findFileById(id: string): FileItem | undefined {
  const all = getAllFiles();
  return all.find(f => f.id === id);
}
