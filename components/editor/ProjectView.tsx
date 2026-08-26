'use client';

import React from 'react';
import { ProjectData } from '@/types';
import { useWorkspace } from '@/context/WorkspaceContext';
import { CodeViewer } from './CodeViewer';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Code2, 
  AlertTriangle, 
  GitBranch, 
  ArrowRight
} from 'lucide-react';

interface ProjectViewProps {
  project: ProjectData;
}

export const ProjectView: React.FC<ProjectViewProps> = ({ project }) => {
  const { projectTabMode, setProjectTabMode } = useWorkspace();

  if (projectTabMode === 'code') {
    return (
      <CodeViewer 
        code={project.codeSnippet.code}
        language={project.codeSnippet.language}
        filename={project.codeSnippet.filename}
      />
    );
  }

  if (projectTabMode === 'architecture') {
    return (
      <ArchitectureDiagram
        projectName={project.name}
        nodes={project.architectureNodes}
      />
    );
  }

  // Default: PREVIEW View
  return (
    <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 md:p-8 overflow-y-auto max-w-5xl mx-auto">
      {/* Project Header Banner */}
      <div className="pb-6 border-b border-[var(--ide-border)] mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-[var(--ide-text)] tracking-tight">
              {project.name}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-[var(--ide-accent)] font-mono">
              {project.category}
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-[var(--ide-text-muted)]" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] hover:text-white font-medium transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm md:text-base text-[var(--ide-text-muted)] leading-relaxed font-light">
          {project.tagline}
        </p>

        {/* View Switcher Bar inside project banner */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--ide-border)]/50">
          <span className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">
            Workspace Views:
          </span>
          <button
            onClick={() => setProjectTabMode('preview')}
            className="text-xs px-2.5 py-1 rounded bg-[var(--ide-accent)] text-white font-semibold font-mono"
          >
            ● Preview Mode
          </button>
          <button
            onClick={() => setProjectTabMode('code')}
            className="text-xs px-2.5 py-1 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-text)] font-mono flex items-center gap-1"
          >
            <Code2 className="w-3 h-3 text-sky-400" />
            <span>View Source Code</span>
          </button>
          <button
            onClick={() => setProjectTabMode('architecture')}
            className="text-xs px-2.5 py-1 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-text)] font-mono flex items-center gap-1"
          >
            <Layers className="w-3 h-3 text-purple-400" />
            <span>View Architecture</span>
          </button>
        </div>
      </div>

      {/* Grid: Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)]">
          <div className="text-2xs uppercase tracking-wider text-rose-400 font-mono font-bold mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>The Problem</span>
          </div>
          <p className="text-xs md:text-sm text-[var(--ide-text)] leading-relaxed font-light">
            {project.problem}
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)]">
          <div className="text-2xs uppercase tracking-wider text-emerald-400 font-mono font-bold mb-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>The Solution</span>
          </div>
          <p className="text-xs md:text-sm text-[var(--ide-text)] leading-relaxed font-light">
            {project.solution}
          </p>
        </div>
      </div>

      {/* HIGHEST PRIORITY SECTION: My Personal Engineering Contribution */}
      <div className="p-5 rounded-lg bg-[var(--ide-bg)] border-2 border-[var(--ide-accent)]/60 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-[var(--ide-border)] pb-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--ide-accent)] font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--ide-accent)]" />
            <span>My Engineering Contributions (Defensible Claims)</span>
          </h2>
          <span className="text-2xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ✓ Personally Implemented
          </span>
        </div>

        <ul className="space-y-2.5">
          {project.myContribution.map((contribution, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--ide-text)] leading-relaxed">
              <span className="text-[var(--ide-accent)] font-mono font-bold shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <span>{contribution}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Engineering Decisions & Trade-offs */}
      {((project.engineeringDecisions && project.engineeringDecisions.length > 0) || (project.decisions && project.decisions.length > 0)) && (
        <div className="mb-6">
          <h3 className="text-xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold mb-3 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            <span>Key Engineering Decisions & Trade-Offs</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(project.engineeringDecisions || project.decisions || []).map((dec, i) => (
              <div key={i} className="p-3.5 rounded bg-[var(--ide-sidebar)]/60 border border-[var(--ide-border)] text-xs">
                <div className="font-semibold text-[var(--ide-text)] mb-1 flex items-center gap-1.5">
                  <span className="text-[var(--ide-accent)] font-mono">▸</span>
                  <span>{dec.decision}</span>
                </div>
                <div className="text-[var(--ide-text-muted)] mb-2 leading-relaxed">
                  <span className="text-[var(--ide-text)] font-medium">Rationale: </span>
                  {dec.rationale}
                </div>
                <div className="text-2xs text-amber-300/90 bg-amber-500/10 p-2 rounded border border-amber-500/20 leading-relaxed font-mono">
                  <span className="font-bold">Trade-off: </span>
                  {dec.tradeoff}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack Matrix */}
      <div className="mb-6">
        <h3 className="text-xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold mb-3 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>Technology Arsenal</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {project.usedInProject.map(tech => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-xs font-mono text-[var(--ide-text)]"
            >
              #{tech}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges & Results */}
      {((project.challenges && project.challenges.length > 0) || (project.results && project.results.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
          {project.challenges && project.challenges.length > 0 && (
            <div className="p-4 rounded bg-[var(--ide-sidebar)]/60 border border-[var(--ide-border)]">
              <h4 className="text-2xs uppercase tracking-wider text-amber-400 font-mono font-bold mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Technical Challenges Overcome</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[var(--ide-text-muted)]">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.results && project.results.length > 0 && (
            <div className="p-4 rounded bg-[var(--ide-sidebar)]/60 border border-[var(--ide-border)]">
              <h4 className="text-2xs uppercase tracking-wider text-emerald-400 font-mono font-bold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Results</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[var(--ide-text-muted)]">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
