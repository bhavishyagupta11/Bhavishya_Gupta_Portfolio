'use client';

import React, { useState } from 'react';
import { Layers, Search, ExternalLink, Code2, Sparkles, Filter } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { projectsData } from '@/data/projects';
import { FileIcon } from '@/components/common/FileIcon';

export const ProjectExplorer: React.FC = () => {
  const { openFile, activeFileId } = useWorkspace();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Full Stack', 'AI / ML', 'Frontend', 'Tools & Systems'];

  const filteredProjects = projectsData.filter(p => {
    const matchesFilter = selectedFilter === 'All' || p.category === selectedFilter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
                          p.usedInProject.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-[var(--ide-sidebar)] text-xs select-none">
      {/* Header */}
      <div className="p-3 border-b border-[var(--ide-border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold">
            PROJECTS WORKSPACE
          </span>
          <span className="text-[10px] font-mono text-[var(--ide-accent)] font-semibold">
            {projectsData.length} Shipped
          </span>
        </div>

        {/* Search input */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Filter projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[var(--ide-bg)] border border-[var(--ide-border)] focus:border-[var(--ide-accent)] rounded px-2.5 py-1 text-xs text-[var(--ide-text)] outline-none pl-7"
          />
          <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-[var(--ide-text-muted)]" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                selectedFilter === cat
                  ? 'bg-[var(--ide-accent)] text-white font-medium'
                  : 'bg-[var(--ide-bg)] text-[var(--ide-text-muted)] hover:text-white border border-[var(--ide-border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredProjects.map(project => {
          const fileId = `${project.id}-tsx`;
          const isActive = activeFileId === fileId;

          return (
            <div
              key={project.id}
              onClick={() => openFile(fileId)}
              className={`p-2.5 rounded border transition-all cursor-pointer group ${
                isActive
                  ? 'bg-[var(--ide-selection)]/40 border-[var(--ide-accent)] shadow-sm'
                  : 'bg-[var(--ide-bg)]/60 border-[var(--ide-border)] hover:border-[var(--ide-text-muted)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-semibold text-[var(--ide-text)] group-hover:text-[var(--ide-accent)]">
                  <FileIcon name={`${project.id}.tsx`} type="file" className="w-3.5 h-3.5" />
                  <span>{project.name}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-[var(--ide-accent)] font-mono">
                  {project.category}
                </span>
              </div>

              <p className="text-2xs text-[var(--ide-text-muted)] line-clamp-2 mb-2 leading-relaxed">
                {project.tagline}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1">
                {project.usedInProject.slice(0, 4).map(tech => (
                  <span
                    key={tech}
                    className="text-[9px] px-1 py-0.2 bg-[var(--ide-sidebar)] text-[var(--ide-text-muted)] rounded font-mono"
                  >
                    #{tech}
                  </span>
                ))}
                {project.usedInProject.length > 4 && (
                  <span className="text-[9px] px-1 py-0.2 text-[var(--ide-text-muted)] font-mono">
                    +{project.usedInProject.length - 4}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
