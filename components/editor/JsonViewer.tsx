'use client';

import React, { useState } from 'react';
import { experienceData } from '@/data/experience';
import { educationData } from '@/data/education';
import { skillsData } from '@/data/skills';
import { achievementsData } from '@/data/achievements';
import { CodeViewer } from './CodeViewer';
import { Code2, LayoutList, Briefcase, GraduationCap, Award, Cpu } from 'lucide-react';

interface JsonViewerProps {
  fileId: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ fileId }) => {
  const [viewMode, setViewMode] = useState<'visual' | 'raw'>('visual');

  let rawData: any = {};
  let title = '';
  let filename = '';

  if (fileId === 'experience-json') {
    rawData = { experience: experienceData };
    title = 'Work Experience';
    filename = 'experience.json';
  } else if (fileId === 'education-json') {
    rawData = { education: educationData };
    title = 'Education & Academics';
    filename = 'education.json';
  } else if (fileId === 'skills-json') {
    rawData = { skillCategories: skillsData };
    title = 'Technical Skills Matrix';
    filename = 'skills.json';
  } else if (fileId === 'certifications-json') {
    rawData = { certifications: achievementsData.filter(a => a.category === 'Certification') };
    title = 'Certifications';
    filename = 'certifications.json';
  }

  const jsonString = JSON.stringify(rawData, null, 2);

  return (
    <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] overflow-hidden">
      {/* Top Toggle Bar */}
      <div className="h-8 bg-[var(--ide-bg)]/80 border-b border-[var(--ide-border)] flex items-center justify-between px-4 text-2xs text-[var(--ide-text-muted)] select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[var(--ide-accent)] font-semibold">{filename}</span>
          <span>•</span>
          <span>{title}</span>
        </div>

        <div className="flex items-center bg-[var(--ide-sidebar)] rounded p-0.5 border border-[var(--ide-border)]">
          <button
            onClick={() => setViewMode('visual')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors flex items-center gap-1 ${
              viewMode === 'visual'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
          >
            <LayoutList className="w-3 h-3" />
            <span>Formatted Cards</span>
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors flex items-center gap-1 ${
              viewMode === 'raw'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>Raw JSON</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      {viewMode === 'raw' ? (
        <CodeViewer code={jsonString} language="json" filename={filename} />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full">
          {/* 1. Experience Visual View */}
          {fileId === 'experience-json' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[var(--ide-border)]">
                <h1 className="text-xl font-bold flex items-center gap-2 text-[var(--ide-text)]">
                  <Briefcase className="w-5 h-5 text-[var(--ide-accent)]" />
                  <span>Work Experience</span>
                </h1>
                <p className="text-xs text-[var(--ide-text-muted)] mt-0.5">
                  Verified software development internship experience.
                </p>
              </div>

              {experienceData.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)] space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-[var(--ide-text)]">{exp.role}</h2>
                      <div className="text-xs font-mono text-[var(--ide-accent)] font-semibold">{exp.company}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xs font-mono px-2 py-0.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-emerald-400">
                        {exp.period}
                      </span>
                      <div className="text-2xs text-[var(--ide-text-muted)] mt-1">{exp.location}</div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--ide-text-muted)] leading-relaxed font-light">
                    {exp.summary}
                  </p>

                  <div>
                    <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold block mb-1.5">
                      Key Contributions & Engineering Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--ide-text)]">
                      {exp.contributions.map((c, ci) => (
                        <li key={ci} className="flex items-start gap-2">
                          <span className="text-[var(--ide-accent)] font-bold">▸</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-[var(--ide-border)]/60 flex flex-wrap gap-1">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="text-2xs font-mono px-2 py-0.5 rounded bg-[var(--ide-bg)] text-[var(--ide-accent)] border border-[var(--ide-border)]">
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. Education Visual View */}
          {fileId === 'education-json' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[var(--ide-border)]">
                <h1 className="text-xl font-bold flex items-center gap-2 text-[var(--ide-text)]">
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                  <span>Education & Academic Background</span>
                </h1>
              </div>

              {educationData.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-[var(--ide-text)]">{edu.institution}</h2>
                      <div className="text-xs font-mono text-[var(--ide-accent)]">{edu.degree}</div>
                      <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">{edu.specialization}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {edu.grade}
                      </span>
                      <div className="text-2xs text-[var(--ide-text-muted)] font-mono mt-1">{edu.period}</div>
                    </div>
                  </div>

                  {edu.highlights && edu.highlights.length > 0 && (
                    <div>
                      <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold block mb-1.5">
                        Highlights
                      </span>
                      <ul className="space-y-1 text-xs text-[var(--ide-text)]">
                        {edu.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {edu.coursework && edu.coursework.length > 0 && (
                    <div>
                      <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold block mb-1.5">
                        Relevant Core Coursework
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {edu.coursework.map(c => (
                          <div key={c} className="text-2xs font-mono p-1.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] text-[var(--ide-text-muted)]">
                            • {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 3. Skills Visual View */}
          {fileId === 'skills-json' && (
            <div className="space-y-6">
              <div className="pb-3 border-b border-[var(--ide-border)]">
                <h1 className="text-xl font-bold flex items-center gap-2 text-[var(--ide-text)]">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <span>Technical Skills Arsenal</span>
                </h1>
                <p className="text-xs text-[var(--ide-text-muted)] mt-0.5">
                  Verified skills mapped to real project implementations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillsData.map(cat => (
                  <div key={cat.name} className="p-4 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)] space-y-3">
                    <h2 className="font-bold text-xs uppercase tracking-wider text-[var(--ide-accent)] font-mono border-b border-[var(--ide-border)] pb-1.5">
                      {cat.name}
                    </h2>
                    <div className="space-y-2">
                      {cat.skills.map(s => (
                        <div key={s.name} className="p-2 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)]/60 text-xs">
                          <div className="flex items-center justify-between font-semibold text-[var(--ide-text)]">
                            <span>{s.name}</span>
                            <span className="text-[9px] uppercase px-1 rounded bg-[var(--ide-sidebar)] text-[var(--ide-accent)] font-mono">
                              {s.categoryTag}
                            </span>
                          </div>
                          <p className="text-2xs text-[var(--ide-text-muted)] mt-1 leading-snug">
                            {s.levelDescription}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Certifications Visual View */}
          {fileId === 'certifications-json' && (
            <div className="space-y-4">
              <div className="pb-3 border-b border-[var(--ide-border)]">
                <h1 className="text-xl font-bold flex items-center gap-2 text-[var(--ide-text)]">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Certifications</span>
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {achievementsData.filter(a => a.category === 'Certification').map(cert => (
                  <div key={cert.id} className="p-4 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)]">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="font-bold text-xs text-[var(--ide-text)]">{cert.title}</h2>
                      {cert.badge && (
                        <span className="text-2xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                          {cert.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xs font-mono text-[var(--ide-accent)] mb-2">{cert.issuerOrEvent} • {cert.dateOrYear}</div>
                    <p className="text-2xs text-[var(--ide-text-muted)] leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
