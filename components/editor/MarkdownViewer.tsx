'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { profileData } from '@/data/profile';
import { codingProfiles } from '@/data/coding';
import { achievementsData, competitionsData, leadershipData } from '@/data/achievements';
import { 
  ExternalLink, 
  Download, 
  Github, 
  Linkedin, 
  Code2, 
  CheckCircle2, 
  Terminal, 
  ArrowRight,
  Check
} from 'lucide-react';

interface MarkdownViewerProps {
  fileId: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ fileId }) => {
  const { openFile, setMode } = useWorkspace();

  // 1. README.md (Clean elevator pitch, verified metrics, fast navigation)
  if (fileId === 'readme-md') {
    return (
      <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 md:p-8 overflow-y-auto max-w-4xl mx-auto font-sans">
        {/* Banner Hero */}
        <div className="border-b border-[var(--ide-border)] pb-6 mb-6">
          <div className="flex items-center gap-2 text-2xs font-mono text-[var(--ide-text-muted)] mb-2 uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-[var(--ide-accent)]" />
            <span>bhavishyagupta / README.md</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-[var(--ide-text)] mb-2">
            {profileData.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--ide-accent)] font-mono font-medium mb-3">
            <span>Software Engineer</span>
            <span className="text-[var(--ide-text-muted)]">•</span>
            <span>Full Stack Developer</span>
            <span className="text-[var(--ide-text-muted)]">•</span>
            <span>AI/ML Enthusiast</span>
            <span className="text-[var(--ide-text-muted)]">•</span>
            <span>Competitive Programmer</span>
          </div>

          <p className="text-sm md:text-base text-[var(--ide-text-muted)] leading-relaxed max-w-2xl font-light">
            {profileData.tagline}
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap gap-2.5 mt-5">
            <button
              onClick={() => openFile('futuremedia-tsx')}
              className="px-4 py-2 rounded bg-[var(--ide-accent)] hover:bg-[var(--ide-accent-hover)] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => openFile('resume-pdf')}
              className="px-3.5 py-2 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[var(--ide-accent)]" />
              <span>View Resume</span>
            </button>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-[var(--ide-text-muted)]" />
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-[var(--ide-text-muted)]" />
            </a>
          </div>
        </div>

        {/* Verified Performance Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-[var(--ide-sidebar)] p-3 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">Problems Solved</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">810+</div>
            <div className="text-2xs text-[var(--ide-text-muted)]">Across Platforms</div>
          </div>
          <div className="bg-[var(--ide-sidebar)] p-3 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">LeetCode Rating</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">1779</div>
            <div className="text-2xs text-[var(--ide-text-muted)]">Top 9.2% Global</div>
          </div>
          <div className="bg-[var(--ide-sidebar)] p-3 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">Academic Record</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">9.30</div>
            <div className="text-2xs text-[var(--ide-text-muted)]">B.Tech CGPA</div>
          </div>
          <div className="bg-[var(--ide-sidebar)] p-3 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">Work Experience</div>
            <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">SDE Intern</div>
            <div className="text-2xs text-[var(--ide-text-muted)]">Ghai Technologies</div>
          </div>
        </div>

        {/* Featured Projects Highlight */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between border-b border-[var(--ide-border)] pb-2">
            <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              // Core Production Projects
            </div>
            <button
              onClick={() => openFile('scholrboard-tsx')}
              className="text-2xs text-[var(--ide-accent)] hover:underline font-mono"
            >
              Inspect All Files →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div 
              onClick={() => openFile('scholrboard-tsx')}
              className="p-4 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)] cursor-pointer group transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-white group-hover:text-[var(--ide-accent)] transition-colors">
                  ScholrBoard
                </span>
                <span className="text-2xs font-mono px-2 py-0.5 rounded bg-[var(--ide-bg)] text-[var(--ide-accent)] border border-[var(--ide-border)]">
                  MERN Stack
                </span>
              </div>
              <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed mb-3">
                Centralized student placement management ecosystem with 4 distinct roles and 6-stage approval pipelines.
              </p>
              <div className="text-2xs font-mono text-[var(--ide-text-muted)]">
                React • Node.js • MongoDB • JWT • Cloudinary
              </div>
            </div>

            <div 
              onClick={() => openFile('futuremedia-tsx')}
              className="p-4 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)] cursor-pointer group transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-sm text-white group-hover:text-[var(--ide-accent)] transition-colors">
                  FutureMedia
                </span>
                <span className="text-2xs font-mono px-2 py-0.5 rounded bg-[var(--ide-bg)] text-[var(--ide-accent)] border border-[var(--ide-border)]">
                  Full Stack
                </span>
              </div>
              <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed mb-3">
                Social media platform with async Redis BullMQ queues, Socket.io chat, and Docker Compose orchestration.
              </p>
              <div className="text-2xs font-mono text-[var(--ide-text-muted)]">
                React • Node.js • BullMQ • Redis • Docker
              </div>
            </div>
          </div>
        </div>

        {/* Live Coding Snapshot */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-white uppercase font-mono tracking-wider border-b border-[var(--ide-border)] pb-2">
            // Competitive Programming & Platforms
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {codingProfiles.map(p => (
              <div
                key={p.platform}
                onClick={() => openFile(p.platform === 'LeetCode' ? 'leetcode-md' : p.platform === 'Codolio' ? 'codolio-md' : 'gfg-code360-md')}
                className="p-3 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)] cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{p.platform}</span>
                  <span className="text-2xs text-[var(--ide-text-muted)] font-mono">@{p.handle}</span>
                </div>
                <div className="text-base font-bold font-mono text-emerald-400 mt-2">{p.stats[0]?.value || 'Active'}</div>
                <div className="text-2xs text-[var(--ide-text-muted)] font-mono">{p.stats[1]?.label}: {p.stats[1]?.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. about.md (In-depth background, biography, engineering philosophy)
  if (fileId === 'about-md') {
    return (
      <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 md:p-8 overflow-y-auto max-w-3xl mx-auto font-sans space-y-6">
        <div className="border-b border-[var(--ide-border)] pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            About Bhavishya Gupta
          </h1>
          <p className="text-xs text-[var(--ide-accent)] font-mono mt-1">
            Software Engineer • Full Stack Developer • AI/ML Systems Enthusiast
          </p>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-[var(--ide-text-muted)] leading-relaxed">
          <p>
            I am a <strong className="text-white font-semibold">Computer Science undergraduate (2023–2027)</strong> specializing in <strong className="text-[var(--ide-accent)] font-semibold">Artificial Intelligence & Machine Learning</strong> at JECRC University, holding a cumulative <strong className="text-emerald-400 font-semibold font-mono">CGPA of 9.30 / 10.0</strong>.
          </p>
          <p>
            My engineering work is centered around building high-throughput full-stack platforms, asynchronous task architectures, real-time messaging, and retrieval-augmented generation (RAG) systems. During my internship as a <strong className="text-white font-semibold">Software Development Intern at Ghai Technologies</strong> (Feb–Jul 2026), I developed 15+ responsive web pages, integrated 8+ RESTful APIs, and resolved 40+ bugs across production SDLC workflows.
          </p>
          <p>
            On the algorithmic side, I have solved <strong className="text-amber-400 font-semibold font-mono">810+ DSA problems</strong> across LeetCode, GeeksForGeeks, and Code360, maintaining a <strong className="text-white font-semibold">LeetCode Contest Rating of 1779</strong> (Top 9.2% globally) and a 328-day active problem-solving streak.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] space-y-2">
          <div className="text-xs font-bold text-white uppercase font-mono tracking-wider">
            // Core Engineering Philosophy
          </div>
          <ul className="space-y-1.5 text-xs text-[var(--ide-text-muted)]">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Strict Role Boundaries:</strong> Authorization logic belongs at the API layer, not solely in UI state.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Asynchronous Decoupling:</strong> Heavy tasks (notifications, media processing) belong in message queues like BullMQ.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong className="text-white">Type-Safe Contracts:</strong> Zod and TypeScript interfaces ensure zero runtime schema mismatches.</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // 3. achievements.md
  if (fileId === 'achievements-md') {
    return (
      <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 md:p-8 overflow-y-auto max-w-4xl mx-auto font-sans leading-relaxed space-y-6">
        <div className="border-b border-[var(--ide-border)] pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Honors, Awards & Milestones
          </h1>
          <p className="text-xs text-[var(--ide-text-muted)] font-mono mt-1">
            Competitive Programming Victories, Hackathon Finalists & Certifications
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">// Competitions & Hackathons</h2>
            {competitionsData.map((comp, idx) => (
              <div key={idx} className="p-4 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-bold text-sm text-white">{comp.title}</h3>
                  <span className="text-2xs font-mono text-[var(--ide-accent)]">{comp.issuerOrEvent} · {comp.dateOrYear}</span>
                </div>
                {comp.badge && (
                  <div className="text-xs font-mono text-emerald-400 font-medium">
                    {comp.badge}
                  </div>
                )}
                <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed">{comp.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold text-white font-mono uppercase tracking-wider">// Leadership & Technical Outreach</h2>
            {leadershipData.map((lead, idx) => (
              <div key={idx} className="p-4 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="font-bold text-sm text-white">{lead.title}</h3>
                  <span className="text-2xs font-mono text-[var(--ide-text-muted)]">{lead.issuerOrEvent} · {lead.dateOrYear}</span>
                </div>
                {lead.badge && (
                  <div className="text-xs font-mono text-sky-400 font-medium">
                    {lead.badge}
                  </div>
                )}
                <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed">{lead.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-center text-xs text-[var(--ide-text-muted)]">
      Document viewer loaded. Select a file from the explorer.
    </div>
  );
};
