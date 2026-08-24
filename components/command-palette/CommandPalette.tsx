'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Code2, 
  Terminal, 
  Download, 
  Palette, 
  UserCheck, 
  Layers, 
  Github, 
  Mail,
  Cpu,
  BookOpen,
  Compass
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ThemeName } from '@/types';

interface PaletteCommand {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    openFile, 
    setTheme, 
    setMode, 
    toggleTerminal, 
    toggleSidebar
  } = useWorkspace();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: PaletteCommand[] = [
    {
      id: 'open-readme',
      title: 'Open: README.md (Overview & Summary)',
      category: 'Navigation',
      icon: <BookOpen className="w-4 h-4 text-sky-400" />,
      action: () => openFile('readme-md')
    },
    {
      id: 'open-futuremedia',
      title: 'Project: FutureMedia (Social Media Platform with BullMQ & Docker)',
      category: 'Projects',
      icon: <Code2 className="w-4 h-4 text-rose-400" />,
      action: () => openFile('futuremedia-tsx')
    },
    {
      id: 'open-scholrboard',
      title: 'Project: ScholrBoard (Student Placement Platform - MERN)',
      category: 'Projects',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      action: () => openFile('scholrboard-tsx')
    },
    {
      id: 'open-cogniflow',
      title: 'Project: CogniFlow (Enterprise Multi-Agent RAG & MMR)',
      category: 'Projects',
      icon: <Code2 className="w-4 h-4 text-purple-400" />,
      action: () => openFile('cogniflow-tsx')
    },
    {
      id: 'open-intellex',
      title: 'Project: Intellex AI (Document Intelligence & Knowledge System)',
      category: 'Projects',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      action: () => openFile('intellex-ai-tsx')
    },
    {
      id: 'open-experience',
      title: 'View: Work Experience (Ghai Technologies SDE Intern)',
      category: 'Career',
      icon: <Layers className="w-4 h-4 text-amber-400" />,
      action: () => openFile('experience-json')
    },
    {
      id: 'open-skills',
      title: 'View: Skills & Technical Arsenal',
      category: 'Skills',
      icon: <Cpu className="w-4 h-4 text-sky-400" />,
      action: () => openFile('skills-json')
    },
    {
      id: 'open-leetcode',
      title: 'Live Coding: LeetCode Analytics (600+ Solved, 1779 Rating)',
      category: 'Coding',
      icon: <Code2 className="w-4 h-4 text-amber-400" />,
      action: () => openFile('leetcode-md')
    },
    {
      id: 'open-gfg',
      title: 'Coding: GeeksforGeeks & Code360 Practice Roadmaps',
      category: 'Coding',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      action: () => openFile('gfg-code360-md')
    },
    {
      id: 'open-github-analytics',
      title: 'Analytics: GitHub Profile & 52-Week Contribution Heatmap',
      category: 'Coding',
      icon: <Github className="w-4 h-4 text-sky-400" />,
      action: () => openFile('github-md')
    },
    {
      id: 'open-codolio',
      title: 'Analytics: Codolio Cross-Platform Aggregator (800+ Solves)',
      category: 'Coding',
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      action: () => openFile('codolio-md')
    },
    {
      id: 'open-resume',
      title: 'View: Official Resume (PDF Preview & ATS Text)',
      category: 'Career',
      icon: <Download className="w-4 h-4 text-rose-400" />,
      action: () => openFile('resume-pdf'),
      shortcut: 'Ctrl+Shift+R'
    },
    {
      id: 'toggle-terminal',
      title: 'View: Toggle Integrated Terminal',
      category: 'View',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => toggleTerminal(),
      shortcut: 'Ctrl+`'
    },
    {
      id: 'toggle-sidebar',
      title: 'View: Toggle Primary Sidebar',
      category: 'View',
      icon: <Layers className="w-4 h-4 text-sky-400" />,
      action: () => toggleSidebar(),
      shortcut: 'Ctrl+B'
    },
    {
      id: 'switch-recruiter',
      title: 'Workspace: Switch to Recruiter 30s Executive View',
      category: 'Mode',
      icon: <UserCheck className="w-4 h-4 text-amber-400" />,
      action: () => setMode('recruiter')
    },
    {
      id: 'switch-developer',
      title: 'Workspace: Switch to Developer IDE Mode',
      category: 'Mode',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      action: () => setMode('developer')
    },
    {
      id: 'theme-dark',
      title: 'Theme: Dark+ (Modern Dark)',
      category: 'Theme',
      icon: <Palette className="w-4 h-4 text-indigo-400" />,
      action: () => setTheme('dark-plus')
    },
    {
      id: 'theme-midnight',
      title: 'Theme: Midnight (Deep Blue)',
      category: 'Theme',
      icon: <Palette className="w-4 h-4 text-cyan-400" />,
      action: () => setTheme('midnight')
    },
    {
      id: 'theme-light',
      title: 'Theme: Light+ (Clean Light)',
      category: 'Theme',
      icon: <Palette className="w-4 h-4 text-amber-400" />,
      action: () => setTheme('light-plus')
    }
  ];

  const filteredCommands = commands.filter(c => 
    c.title.toLowerCase().includes(query.toLowerCase()) || 
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        setIsCommandPaletteOpen(false);
      }
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs select-none">
      <div 
        className="w-full max-w-xl bg-[var(--ide-bg)] border border-[var(--ide-border)] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[480px]"
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="p-3 border-b border-[var(--ide-border)] flex items-center gap-2 bg-[var(--ide-sidebar)]">
          <Search className="w-4 h-4 text-[var(--ide-accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search workspace (e.g. 'project', 'leetcode', 'theme')..."
            className="w-full bg-transparent border-none text-xs text-[var(--ide-text)] placeholder-[var(--ide-text-muted)] focus:outline-none"
          />
          <kbd className="text-[10px] bg-[var(--ide-bg)] px-1.5 py-0.5 rounded border border-[var(--ide-border)] text-[var(--ide-text-muted)] font-mono">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="overflow-y-auto flex-1 p-1">
          {filteredCommands.length === 0 ? (
            <div className="p-4 text-center text-xs text-[var(--ide-text-muted)]">
              No matching commands found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    setIsCommandPaletteOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded text-xs cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[var(--ide-selection)] text-white' 
                      : 'text-[var(--ide-text)] hover:bg-[var(--ide-hover)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {cmd.icon}
                    <span className="truncate">{cmd.title}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-2xs px-1.5 py-0.5 rounded bg-[var(--ide-sidebar)] text-[var(--ide-text-muted)] border border-[var(--ide-border)]">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <span className="text-2xs font-mono text-[var(--ide-accent)] font-semibold">
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
