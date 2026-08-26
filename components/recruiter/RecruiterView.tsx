'use client';

import React from 'react';
import { 
  Code2, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  ArrowLeft,
  Layers,
  MapPin,
  FileText,
  Activity,
  Check
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';
import { experienceData } from '@/data/experience';
import { skillsData } from '@/data/skills';
import { educationData } from '@/data/education';

export const RecruiterView: React.FC = () => {
  const { setMode, openFile } = useWorkspace();

  const featuredProjects = projectsData.slice(0, 3); // FutureMedia, ScholrBoard, CogniFlow

  const handleOpenProjectInIDE = (projectId: string, tab: 'preview' | 'code' | 'architecture' = 'preview') => {
    setMode('developer');
    openFile(`${projectId}-tsx`);
  };

  return (
    <div className="h-full w-full bg-[var(--ide-bg)] text-[var(--ide-text)] font-sans antialiased overflow-y-auto selection:bg-[var(--ide-accent)] selection:text-white scroll-smooth">
      {/* Sticky Recruiter Navigation Header */}
      <header className="sticky top-0 z-40 bg-[var(--ide-sidebar)]/95 backdrop-blur-md border-b border-[var(--ide-border)] px-4 sm:px-8 py-3 select-none shrink-0 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm text-[var(--ide-text)] tracking-tight">
              Bhavishya Gupta
            </span>
            <span className="text-2xs font-mono text-[var(--ide-text-muted)] border-l border-[var(--ide-border)] pl-2.5">
              Executive Summary
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/assets/Bhavishya_Gupta_Resume.pdf"
              download="Bhavishya_Gupta_Resume.pdf"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>

            <button
              onClick={() => setMode('developer')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--ide-accent)] hover:bg-[var(--ide-accent-hover)] text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
              title="Return to full interactive developer workspace"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Developer Workspace</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Recruiter Content Stream */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 md:py-12 space-y-12 pb-32">
        {/* 1. Hero & Executive Summary */}
        <section className="space-y-4 border-b border-[var(--ide-border)] pb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--ide-text)]">
              Bhavishya Gupta
            </h1>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm md:text-base text-[var(--ide-accent)] font-mono font-medium">
              <span>Software Engineer</span>
              <span className="text-[var(--ide-text-muted)]">•</span>
              <span>Full Stack Developer</span>
              <span className="text-[var(--ide-text-muted)]">•</span>
              <span>B.Tech CSE (AI & ML)</span>
              <span className="text-[var(--ide-text-muted)]">•</span>
              <span>SDE Intern @ Ghai Technologies</span>
            </div>
          </div>

          <p className="text-sm md:text-base text-[var(--ide-text-muted)] leading-relaxed max-w-3xl font-light">
            {profileData.summary}
          </p>

          <p className="text-xs md:text-sm text-[var(--ide-text-muted)] font-mono">
            Open to software engineering internships and 2027 graduate full-stack opportunities.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/assets/Bhavishya_Gupta_Resume.pdf"
              download="Bhavishya_Gupta_Resume.pdf"
              className="px-4 py-2 rounded bg-[var(--ide-accent)] hover:bg-[var(--ide-accent-hover)] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </a>

            <a
              href={`mailto:${profileData.email}`}
              className="px-4 py-2 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact via Email</span>
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-white font-medium flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-sky-400 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </section>

        {/* 2. Key Verified Candidate Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">B.Tech CGPA</div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-white mt-1">9.30</div>
            <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">JECRC University (2023–27)</div>
          </div>

          <div className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">DSA Problems Solved</div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-amber-400 mt-1">810+</div>
            <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">Resume Verified Snapshot</div>
          </div>

          <div className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">Work Experience</div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-sky-400 mt-1">SDE Intern</div>
            <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">Ghai Technologies (Feb–Jul 2026)</div>
          </div>

          <div className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] uppercase">LeetCode Rating</div>
            <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-400 mt-1">1779</div>
            <div className="text-2xs text-emerald-400 mt-0.5">Top 9.2% Global (Live)</div>
          </div>
        </section>

        {/* 3. Professional Work Experience (Fully Formatted & Unclipped) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--ide-accent)] uppercase tracking-wider font-mono">
            <Briefcase className="w-4 h-4" />
            <span>Work Experience</span>
          </div>

          {experienceData.map((exp, idx) => (
            <div key={idx} className="bg-[var(--ide-sidebar)] p-5 md:p-6 rounded-lg border border-[var(--ide-border)] space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[var(--ide-border)]/60 pb-3">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">{exp.role}</h2>
                  <div className="text-sm font-semibold text-[var(--ide-accent)]">{exp.company}</div>
                </div>
                <div className="text-2xs font-mono text-[var(--ide-text-muted)] sm:text-right">
                  <span className="text-white font-medium">{exp.period}</span>
                  <div className="mt-0.5">{exp.location}</div>
                </div>
              </div>

              <p className="text-xs text-[var(--ide-text)] leading-relaxed font-light">
                {exp.summary}
              </p>

              <ul className="space-y-2.5 text-xs text-[var(--ide-text-muted)] leading-relaxed">
                {exp.contributions.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-[var(--ide-text)]">{resp}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--ide-border)]/60 text-2xs font-mono">
                {exp.technologies.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-[var(--ide-text)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 4. Top 3 Featured Projects (Prominent FutureMedia, ScholrBoard, CogniFlow) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--ide-accent)] uppercase tracking-wider font-mono">
              <Layers className="w-4 h-4" />
              <span>Top Shipped Engineering Projects</span>
            </div>
            <button
              onClick={() => { setMode('developer'); openFile('futuremedia-tsx'); }}
              className="text-2xs text-[var(--ide-accent)] hover:underline font-mono"
            >
              Explore workspace files →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredProjects.map(project => (
              <div 
                key={project.id}
                className="bg-[var(--ide-sidebar)] p-5 rounded-lg border border-[var(--ide-border)] flex flex-col justify-between hover:border-[var(--ide-accent)] transition-all group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xs font-mono text-[var(--ide-accent)]">
                      {project.category}
                    </span>
                    {project.liveUrl ? (
                      <span className="text-2xs font-mono text-emerald-400 font-medium">
                        ● Live
                      </span>
                    ) : (
                      <span className="text-2xs font-mono text-[var(--ide-text-muted)]">
                        {project.year}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--ide-accent)] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[var(--ide-text-muted)] mt-1 line-clamp-3 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1 text-[11px] font-mono">
                    {project.usedInProject.slice(0, 5).map(tech => (
                      <span key={tech} className="px-1.5 py-0.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-[var(--ide-text-muted)]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="p-2.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-2xs space-y-1">
                    <div className="font-semibold text-emerald-400 font-mono text-[11px]">Key Contribution:</div>
                    <p className="text-[var(--ide-text-muted)] line-clamp-2 leading-snug">
                      {project.myContribution[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--ide-border)]/60 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenProjectInIDE(project.id)}
                    className="text-2xs font-semibold text-[var(--ide-accent)] hover:underline flex items-center gap-1"
                  >
                    <span>Architecture</span>
                    <span>→</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-2xs text-white font-medium flex items-center gap-1 transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-2xs text-[var(--ide-text)] hover:text-white font-medium flex items-center gap-1.5 transition-colors"
                        title="Open Deployed Application"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Technical Skill Arsenal */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--ide-accent)] uppercase tracking-wider font-mono">
            <Code2 className="w-4 h-4" />
            <span>Technical Skills Matrix</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {skillsData.map((cat, idx) => (
              <div key={idx} className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)] space-y-2">
                <div className="font-mono text-2xs font-bold text-amber-300 uppercase tracking-wide">
                  {cat.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(s => (
                    <span 
                      key={s.name}
                      className="px-2 py-0.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-2xs text-[var(--ide-text)] font-mono"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Education & Certifications */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--ide-accent)] uppercase tracking-wider font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            {educationData.map((edu, idx) => (
              <div key={idx} className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)] space-y-1">
                <div className="font-bold text-white text-sm">{edu.degree}</div>
                <div className="text-xs text-[var(--ide-accent)]">{edu.institution}</div>
                <div className="text-2xs font-mono text-emerald-400 font-semibold">{edu.period} • {edu.grade}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--ide-accent)] uppercase tracking-wider font-mono">
              <FileText className="w-4 h-4" />
              <span>Key Certifications & Awards</span>
            </div>
            <div className="bg-[var(--ide-sidebar)] p-4 rounded-lg border border-[var(--ide-border)] space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Winner - CodeHunt</span>
                  <span className="text-[var(--ide-text-muted)] text-2xs block">Ranked 1st among 25 teams in 3-stage logic competition (JECRC · 2024).</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white">Finalist - CodeAThon 1.0</span>
                  <span className="text-[var(--ide-text-muted)] text-2xs block">Top 10 of 500+ participants across 2 rounds (JECRC · 2024).</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-white">ServiceNow CSA & CAD</span>
                  <span className="text-[var(--ide-text-muted)] text-2xs block">Certified System Administrator & Application Developer (Jun 2026).</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Bottom CTA Bar */}
        <section className="bg-[var(--ide-sidebar)] p-6 md:p-8 rounded-xl border border-[var(--ide-border)] text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Ready to Schedule a Technical Interview?
          </h2>
          <p className="text-xs md:text-sm text-[var(--ide-text-muted)] max-w-lg mx-auto leading-relaxed">
            Directly connect with Bhavishya Gupta for SDE roles, full-stack systems engineering, and AI/ML opportunities.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${profileData.email}`}
              className="px-5 py-2.5 rounded bg-[var(--ide-accent)] hover:bg-[var(--ide-accent-hover)] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email Bhavishya</span>
            </a>

            <a
              href="/assets/Bhavishya_Gupta_Resume.pdf"
              download="Bhavishya_Gupta_Resume.pdf"
              className="px-5 py-2.5 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-white font-semibold flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </a>

            <button
              onClick={() => setMode('developer')}
              className="px-5 py-2.5 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] hover:text-white font-semibold flex items-center gap-2 transition-colors"
            >
              <Code2 className="w-4 h-4 text-[var(--ide-accent)]" />
              <span>Explore Developer Workspace</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
