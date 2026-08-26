'use client';

import React, { useState } from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { profileData } from '@/data/profile';
import { experienceData } from '@/data/experience';
import { educationData } from '@/data/education';
import { projectsData } from '@/data/projects';
import { skillsData } from '@/data/skills';

export const ResumeViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<'pdf' | 'text'>('pdf');
  const resumeUrl = "/assets/Bhavishya_Gupta_Resume.pdf";

  return (
    <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] overflow-hidden">
      {/* Resume Top Control Bar */}
      <div className="h-9 bg-[var(--ide-bg)]/80 border-b border-[var(--ide-border)] flex flex-wrap items-center justify-between px-3 sm:px-4 text-xs select-none shrink-0 gap-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-rose-400 shrink-0" />
          <span className="font-semibold text-[var(--ide-text)] truncate">Bhavishya_Gupta_Resume.pdf</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[var(--ide-sidebar)] rounded p-0.5 border border-[var(--ide-border)]">
            <button
              onClick={() => setViewMode('pdf')}
              className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
                viewMode === 'pdf'
                  ? 'bg-[var(--ide-accent)] text-white font-semibold'
                  : 'text-[var(--ide-text-muted)] hover:text-white'
              }`}
            >
              PDF Document
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
                viewMode === 'text'
                  ? 'bg-[var(--ide-accent)] text-white font-semibold'
                  : 'text-[var(--ide-text-muted)] hover:text-white'
              }`}
            >
              ATS Text View
            </button>
          </div>

          <a
            href={resumeUrl}
            download="Bhavishya_Gupta_Resume.pdf"
            className="flex items-center gap-1 px-3 py-1 rounded bg-[var(--ide-accent)] hover:bg-[var(--ide-accent-hover)] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
            <span>PDF</span>
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-text-muted)] hover:text-white transition-colors"
            title="Open PDF in Fullscreen Window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'pdf' ? (
        <div className="flex-1 w-full h-full bg-neutral-950 flex flex-col items-center justify-center p-2 relative overflow-hidden">
          <object
            data={`${resumeUrl}#toolbar=1&navpanes=0`}
            type="application/pdf"
            className="w-full h-full rounded border border-[var(--ide-border)] bg-white"
          >
            {/* Fallback iframe */}
            <iframe
              src={`${resumeUrl}#toolbar=1`}
              title="Bhavishya Gupta Resume Preview"
              className="w-full h-full rounded border border-[var(--ide-border)] bg-white"
            >
              <div className="p-8 text-center text-xs space-y-3">
                <p className="text-white font-bold">PDF preview is not supported directly in this browser frame.</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={resumeUrl}
                    download="Bhavishya_Gupta_Resume.pdf"
                    className="px-4 py-2 bg-[var(--ide-accent)] text-white rounded font-bold"
                  >
                    Download Resume PDF
                  </a>
                  <button
                    onClick={() => setViewMode('text')}
                    className="px-4 py-2 bg-[var(--ide-sidebar)] text-white rounded"
                  >
                    View ATS Text Resume
                  </button>
                </div>
              </div>
            </iframe>
          </object>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full font-mono text-xs space-y-6">
          <div className="border-b border-[var(--ide-border)] pb-4">
            <h1 className="text-xl font-bold text-white">{profileData.name}</h1>
            <div className="text-[var(--ide-text-muted)] mt-1">
              Email: {profileData.email} • Location: {profileData.location}
            </div>
            <div className="text-[var(--ide-accent)] mt-0.5">
              GitHub: {profileData.github} • LinkedIn: {profileData.linkedin} • LeetCode: {profileData.leetcode}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-amber-400 uppercase mb-2 tracking-wider">
              // Professional Summary
            </h2>
            <p className="text-[var(--ide-text-muted)] leading-relaxed">
              {profileData.summary}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold text-amber-400 uppercase mb-2 tracking-wider">
              // Education History
            </h2>
            {educationData.map((edu, i) => (
              <div key={i} className="mb-3 p-3 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)]">
                <div className="font-bold text-white text-sm">{edu.degree}</div>
                <div className="text-emerald-400 font-semibold">{edu.institution} • {edu.period}</div>
                <div className="text-amber-300 font-mono font-bold mt-0.5">{edu.grade}</div>
                {edu.highlights && (
                  <ul className="list-disc list-inside mt-2 text-[var(--ide-text-muted)] space-y-1">
                    {edu.highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs font-bold text-amber-400 uppercase mb-2 tracking-wider">
              // Work Experience
            </h2>
            {experienceData.map((exp, i) => (
              <div key={i} className="mb-3 p-3 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)]">
                <div className="font-bold text-white text-sm">{exp.role} @ {exp.company}</div>
                <div className="text-emerald-400">{exp.period} • {exp.location}</div>
                <ul className="list-disc list-inside mt-2 text-[var(--ide-text-muted)] space-y-1">
                  {exp.contributions.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs font-bold text-amber-400 uppercase mb-2 tracking-wider">
              // Primary Engineering Projects
            </h2>
            {projectsData.slice(0, 4).map((p, i) => (
              <div key={i} className="mb-3 p-3 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)]">
                <div className="font-bold text-white text-sm">{p.name} — {p.tagline}</div>
                <div className="text-2xs text-[var(--ide-accent)] font-mono mt-0.5">Tech: {p.usedInProject.join(', ')}</div>
                <ul className="list-disc list-inside mt-2 text-[var(--ide-text-muted)] space-y-1">
                  {p.myContribution.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xs font-bold text-amber-400 uppercase mb-2 tracking-wider">
              // Technical Skill Matrix
            </h2>
            <div className="p-3 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] space-y-2">
              {skillsData.map((cat, i) => (
                <div key={i}>
                  <span className="text-white font-bold">{cat.name}: </span>
                  <span className="text-[var(--ide-text-muted)]">{cat.skills.map(s => s.name).join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
