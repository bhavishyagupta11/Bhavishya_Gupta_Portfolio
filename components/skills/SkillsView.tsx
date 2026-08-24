'use client';

import React, { useState } from 'react';
import { Cpu, Code2, Layout, Server, Database, Brain, ChevronRight, ChevronDown } from 'lucide-react';
import { skillsData } from '@/data/skills';
import { useWorkspace } from '@/context/WorkspaceContext';

export const SkillsView: React.FC = () => {
  const { openFile } = useWorkspace();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Languages': true,
    'Frontend Development': true,
    'Backend & Systems': true,
    'Databases & Storage': false,
    'AI & Machine Learning': true,
    'Core CS & Developer Tools': false
  });

  const toggleCategory = (catName: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-3.5 h-3.5 text-sky-400" />;
      case 'Layout': return <Layout className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Server': return <Server className="w-3.5 h-3.5 text-amber-400" />;
      case 'Database': return <Database className="w-3.5 h-3.5 text-rose-400" />;
      case 'Brain': return <Brain className="w-3.5 h-3.5 text-purple-400" />;
      default: return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--ide-sidebar)] text-xs select-none overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-[var(--ide-border)]">
        <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold block mb-1">
          TECH ARSENAL & SKILLS
        </span>
        <p className="text-[11px] text-[var(--ide-text-muted)]">
          Categorized technologies with verified project associations.
        </p>
      </div>

      {/* Categories Accordion */}
      <div className="p-2 space-y-2">
        {skillsData.map(cat => {
          const isOpen = openCategories[cat.name] ?? false;

          return (
            <div key={cat.name} className="border border-[var(--ide-border)] rounded bg-[var(--ide-bg)]/40 overflow-hidden">
              <button
                onClick={() => toggleCategory(cat.name)}
                className="w-full flex items-center justify-between p-2 hover:bg-[var(--ide-hover)] text-left transition-colors"
              >
                <div className="flex items-center gap-1.5 font-semibold text-[var(--ide-text)]">
                  {getIcon(cat.icon)}
                  <span>{cat.name}</span>
                </div>
                <span className="text-[var(--ide-text-muted)]">
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </span>
              </button>

              {isOpen && (
                <div className="p-2 pt-0 space-y-2 border-t border-[var(--ide-border)]/50 mt-1">
                  {cat.skills.map(s => (
                    <div key={s.name} className="p-1.5 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)]/60">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[var(--ide-text)]">{s.name}</span>
                        <span className="text-[9px] uppercase px-1 rounded bg-[var(--ide-sidebar)] text-[var(--ide-accent)] font-mono">
                          {s.categoryTag}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--ide-text-muted)] mt-0.5 leading-snug">
                        {s.levelDescription}
                      </p>
                      {s.projects.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {s.projects.map(proj => (
                            <span
                              key={proj}
                              className="text-[9px] px-1 py-0.2 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-emerald-400 font-mono"
                            >
                              → {proj}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
