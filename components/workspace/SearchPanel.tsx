'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { getAllFiles } from '@/data/fileSystem';
import { projectsData } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { codingProfiles } from '@/data/coding';
import { experienceData } from '@/data/experience';
import { FileIcon } from '@/components/common/FileIcon';

interface SearchResult {
  fileId: string;
  fileName: string;
  filePath: string;
  matches: {
    lineText: string;
    lineNumber: number;
  }[];
}

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState('');
  const { openFile } = useWorkspace();

  const getSearchResults = (): SearchResult[] => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search Projects
    projectsData.forEach(p => {
      const matches: { lineText: string; lineNumber: number }[] = [];
      if (p.name.toLowerCase().includes(q)) matches.push({ lineText: `Project Name: ${p.name}`, lineNumber: 1 });
      if (p.tagline.toLowerCase().includes(q)) matches.push({ lineText: `Tagline: ${p.tagline}`, lineNumber: 3 });
      if (p.problem.toLowerCase().includes(q)) matches.push({ lineText: `Problem: ${p.problem.slice(0, 80)}...`, lineNumber: 6 });
      if (p.solution.toLowerCase().includes(q)) matches.push({ lineText: `Solution: ${p.solution.slice(0, 80)}...`, lineNumber: 9 });
      p.myContribution.forEach((c, idx) => {
        if (c.toLowerCase().includes(q)) matches.push({ lineText: `My Contribution: ${c}`, lineNumber: 14 + idx });
      });

      if (matches.length > 0) {
        results.push({
          fileId: `${p.id}-tsx`,
          fileName: `${p.id}.tsx`,
          filePath: `projects/${p.id}.tsx`,
          matches
        });
      }
    });

    // Search Skills
    skillsData.forEach(cat => {
      cat.skills.forEach(s => {
        if (s.name.toLowerCase().includes(q) || s.levelDescription.toLowerCase().includes(q)) {
          results.push({
            fileId: 'skills-json',
            fileName: 'skills.json',
            filePath: 'skills.json',
            matches: [{ lineText: `Skill: ${s.name} - ${s.levelDescription}`, lineNumber: 5 }]
          });
        }
      });
    });

    // Search Coding Profiles
    codingProfiles.forEach(cp => {
      if (cp.platform.toLowerCase().includes(q) || cp.handle.toLowerCase().includes(q)) {
        const fileId = cp.platform.toLowerCase().includes('leet') ? 'leetcode-md' : 'gfg-code360-md';
        results.push({
          fileId,
          fileName: `${fileId}.md`,
          filePath: `coding/${fileId}.md`,
          matches: [{ lineText: `${cp.platform} Profile: ${cp.handle}`, lineNumber: 2 }]
        });
      }
    });

    // Search Experience
    experienceData.forEach(exp => {
      if (exp.company.toLowerCase().includes(q) || exp.role.toLowerCase().includes(q) || exp.summary.toLowerCase().includes(q)) {
        results.push({
          fileId: 'experience-json',
          fileName: 'experience.json',
          filePath: 'experience.json',
          matches: [{ lineText: `${exp.role} @ ${exp.company}`, lineNumber: 3 }]
        });
      }
    });

    return results;
  };

  const results = getSearchResults();

  return (
    <div className="flex flex-col h-full bg-[var(--ide-sidebar)] text-xs select-none">
      {/* Search Header */}
      <div className="p-3 border-b border-[var(--ide-border)]">
        <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold block mb-2">
          SEARCH WORKSPACE
        </span>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, experience, DSA..."
            className="w-full bg-[var(--ide-bg)] border border-[var(--ide-border)] rounded px-3 py-1.5 text-xs text-[var(--ide-text)] placeholder-[var(--ide-text-muted)] focus:outline-none focus:border-[var(--ide-accent)]"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-2 text-[var(--ide-text-muted)] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Search Results List */}
      <div className="flex-1 overflow-y-auto p-2">
        {query.length >= 2 && results.length === 0 && (
          <div className="p-4 text-center text-[var(--ide-text-muted)]">
            No matching results found for &quot;{query}&quot;.
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-3">
            <div className="text-2xs font-mono text-[var(--ide-text-muted)] px-1">
              {results.length} files matching query:
            </div>
            {results.map((res, i) => (
              <div key={i} className="bg-[var(--ide-bg)] rounded border border-[var(--ide-border)] overflow-hidden">
                <button
                  onClick={() => openFile(res.fileId)}
                  className="w-full p-2 bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] flex items-center justify-between border-b border-[var(--ide-border)] text-left group"
                >
                  <div className="flex items-center gap-1.5">
                    <FileIcon name={res.fileName} type="file" className="w-3.5 h-3.5" />
                    <span className="font-semibold text-white group-hover:text-[var(--ide-accent)]">
                      {res.filePath}
                    </span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[var(--ide-text-muted)] opacity-0 group-hover:opacity-100" />
                </button>

                <div className="p-2 space-y-1">
                  {res.matches.map((m, idx) => (
                    <div
                      key={idx}
                      onClick={() => openFile(res.fileId)}
                      className="text-2xs text-[var(--ide-text-muted)] hover:text-white cursor-pointer truncate font-mono py-0.5"
                    >
                      <span className="text-[var(--ide-accent)] font-bold mr-1.5">{m.lineNumber}:</span>
                      <span>{m.lineText}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {query.length < 2 && (
          <div className="p-6 text-center text-[var(--ide-text-muted)] space-y-2">
            <Search className="w-6 h-6 mx-auto opacity-30" />
            <p>Type at least 2 characters to search across all projects, technical skills, and files.</p>
          </div>
        )}
      </div>
    </div>
  );
};
