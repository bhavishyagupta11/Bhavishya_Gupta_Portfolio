'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { 
  UserCheck, 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Terminal,
  Briefcase
} from 'lucide-react';

export const PortfolioEntryModal: React.FC = () => {
  const { setMode } = useWorkspace();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const recruiterBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Show only on initial root entry '/' and only once per session
    if (typeof window !== 'undefined') {
      const isCompleted = sessionStorage.getItem('portfolio-entry-completed');
      const isRootPath = window.location.pathname === '/' || window.location.pathname === '';

      if (!isCompleted && isRootPath) {
        // Subtle 100ms delay to let the background workspace render seamlessly
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Autofocus the primary recruiter button when dialog appears
  useEffect(() => {
    if (isOpen && recruiterBtnRef.current) {
      recruiterBtnRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard accessibility: ESC key safely dismisses into Developer Workspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        handleSelect('developer');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (selectedMode: 'recruiter' | 'developer') => {
    try {
      sessionStorage.setItem('portfolio-entry-completed', 'true');
    } catch (e) {
      // Storage access safety fallback
    }

    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setMode(selectedMode);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm transition-opacity duration-300 select-none ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-gateway-title"
      aria-describedby="entry-gateway-desc"
    >
      <div 
        className={`w-full max-w-3xl bg-[var(--ide-sidebar)] border border-[var(--ide-border)] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] overflow-y-auto transition-all duration-300 transform ${
          isClosing ? 'scale-95 translate-y-2 opacity-0' : 'scale-100 translate-y-0 opacity-100'
        }`}
      >
        {/* Top Header Banner */}
        <div className="p-6 pb-4 border-b border-[var(--ide-border)] bg-[var(--ide-bg)] text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <span className="text-2xs font-mono font-bold tracking-widest text-[var(--ide-accent)] uppercase">
              Developer Workspace
            </span>
            <span className="text-2xs font-mono text-[var(--ide-text-muted)]">
              Jaipur, India
            </span>
          </div>

          <h1 id="entry-gateway-title" className="text-xl sm:text-2xl font-bold text-[var(--ide-text)] tracking-tight">
            BHAVISHYA GUPTA
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ide-text-muted)] font-mono mt-0.5">
            Software Engineer / Full Stack Developer
          </p>

          <div className="mt-4 pt-3 border-t border-[var(--ide-border)]">
            <p className="text-xs text-[var(--ide-text-muted)]">
              Welcome to my developer portfolio.
            </p>
            <h2 id="entry-gateway-desc" className="text-sm font-semibold text-[var(--ide-text)] mt-0.5">
              Choose how you&apos;d like to explore.
            </h2>
          </div>
        </div>

        {/* Two Primary Options Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 bg-[var(--ide-sidebar)]">
          {/* OPTION 1 — RECRUITER VIEW */}
          <div 
            onClick={() => handleSelect('recruiter')}
            className="group relative p-5 rounded-lg bg-[var(--ide-bg)] border-2 border-emerald-500/50 hover:border-emerald-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Unobtrusive Label */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-semibold text-emerald-400">
                  Recommended for recruiters
                </span>
                <span className="text-[10px] font-mono text-[var(--ide-text-muted)]">30s Scan</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--ide-text)] group-hover:text-emerald-400 transition-colors">
                      Recruiter View
                    </h3>
                  </div>
                </div>

                <p className="text-2xs text-emerald-400 font-mono">
                  Get the essentials in under 30 seconds.
                </p>

                <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed font-light pt-1">
                  A focused overview of my experience, technical skills, selected projects, education, achievements, and resume.
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-3 text-2xs text-[var(--ide-text-muted)] font-mono">
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>SDE Internship</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Full-stack projects</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Technical skills</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Education and GPA</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Coding / problem-solving profile</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Resume and contact information</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              ref={recruiterBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('recruiter');
              }}
              className="mt-6 w-full py-2.5 px-4 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <span>Open Recruiter View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* OPTION 2 — FULL PORTFOLIO */}
          <div 
            onClick={() => handleSelect('developer')}
            className="group relative p-5 rounded-lg bg-[var(--ide-bg)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-[10px] font-mono text-[var(--ide-text-muted)]">
                  Interactive IDE
                </span>
                <span className="text-[10px] font-mono text-[var(--ide-text-muted)]">Full Workspace</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[var(--ide-accent)]/10 border border-[var(--ide-accent)]/30 flex items-center justify-center text-[var(--ide-accent)] shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--ide-text)] group-hover:text-[var(--ide-accent)] transition-colors">
                      Explore Full Portfolio
                    </h3>
                  </div>
                </div>

                <p className="text-2xs text-[var(--ide-accent)] font-mono">
                  Explore the complete developer workspace.
                </p>

                <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed font-light pt-1">
                  Browse projects, source code, architecture diagrams, engineering decisions, coding profiles, GitHub activity, terminal tools, and the complete portfolio.
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-3 text-2xs text-[var(--ide-text-muted)] font-mono">
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ide-accent)] shrink-0" />
                    <span>Interactive VS Code-style workspace</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ide-accent)] shrink-0" />
                    <span>Project CODE / PREVIEW / ARCHITECTURE views</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ide-accent)] shrink-0" />
                    <span>Engineering work</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ide-accent)] shrink-0" />
                    <span>LeetCode and coding profiles</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ide-accent)] shrink-0" />
                    <span>GitHub activity</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[var(--ide-text)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ide-accent)] shrink-0" />
                    <span>Interactive terminal</span>
                  </li>
                </ul>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelect('developer');
              }}
              className="mt-6 w-full py-2.5 px-4 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-text)] font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 group-hover:border-[var(--ide-accent)]"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Small Subtle Trust Signal Footer */}
        <div className="px-6 py-3 bg-[var(--ide-bg)] border-t border-[var(--ide-border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-2xs font-mono text-[var(--ide-text-muted)]">
          <span>Built as an interactive developer workspace.</span>
          <span className="text-[10px] hidden sm:inline">Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-[var(--ide-text)]">ESC</kbd> to enter Developer Workspace</span>
        </div>
      </div>
    </div>
  );
};
