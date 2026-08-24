'use client';

import React from 'react';
import { 
  Files, 
  Search, 
  Layers, 
  Github, 
  Cpu, 
  Terminal, 
  Settings, 
  UserCheck, 
  Code
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ActivityTab } from '@/types';

export const ActivityBar: React.FC = () => {
  const { 
    activeActivityTab, 
    setActiveActivityTab, 
    isSidebarOpen, 
    setIsSidebarOpen,
    toggleTerminal,
    isTerminalOpen,
    setIsSettingsOpen,
    mode,
    setMode
  } = useWorkspace();

  const handleTabClick = (tab: ActivityTab) => {
    if (tab === 'terminal') {
      toggleTerminal();
      return;
    }
    if (tab === 'settings') {
      setIsSettingsOpen(true);
      return;
    }
    if (activeActivityTab === tab && isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setActiveActivityTab(tab);
      setIsSidebarOpen(true);
    }
  };

  const topItems: { id: ActivityTab; label: string; icon: React.ReactNode; shortcut?: string }[] = [
    { id: 'explorer', label: 'Explorer', icon: <Files className="w-5 h-5" />, shortcut: 'Ctrl+Shift+E' },
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" />, shortcut: 'Ctrl+Shift+F' },
    { id: 'projects', label: 'Projects Explorer', icon: <Layers className="w-5 h-5" /> },
    { id: 'github', label: 'GitHub Activity', icon: <Github className="w-5 h-5" /> },
    { id: 'skills', label: 'Skills & Tech Stack', icon: <Cpu className="w-5 h-5" /> },
    { id: 'terminal', label: 'Toggle Terminal', icon: <Terminal className="w-5 h-5" />, shortcut: 'Ctrl+J' },
  ];

  return (
    <aside 
      className="w-12 bg-[var(--ide-activity)] flex flex-col justify-between items-center py-2 border-r border-[var(--ide-border)] select-none z-30 shrink-0"
      aria-label="Activity Bar"
    >
      {/* Top Activities */}
      <div className="flex flex-col gap-1 w-full items-center">
        {/* Workspace Brand Badge */}
        <div className="mb-2 p-1.5 rounded text-[var(--ide-accent)] hover:bg-[var(--ide-hover)] cursor-pointer" title="BG Studio Workspace">
          <Code className="w-6 h-6 stroke-[2.2]" />
        </div>

        {topItems.map(item => {
          const isActive = (item.id === 'terminal' ? isTerminalOpen : (activeActivityTab === item.id && isSidebarOpen));
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`relative p-2.5 w-full flex justify-center items-center transition-colors group ${
                isActive 
                  ? 'text-white bg-[var(--ide-hover)]' 
                  : 'text-[var(--ide-text-muted)] hover:text-white hover:bg-[var(--ide-hover)]'
              }`}
              title={`${item.label} ${item.shortcut ? `(${item.shortcut})` : ''}`}
              aria-label={item.label}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--ide-accent)]" />
              )}
              {item.icon}
            </button>
          );
        })}
      </div>

      {/* Bottom Controls */}
      <div className="flex flex-col gap-1 w-full items-center">
        {/* Recruiter Mode Quick Switcher */}
        <button
          onClick={() => setMode(mode === 'recruiter' ? 'developer' : 'recruiter')}
          className={`p-2.5 w-full flex justify-center items-center transition-colors relative ${
            mode === 'recruiter'
              ? 'text-amber-400 bg-amber-400/10'
              : 'text-[var(--ide-text-muted)] hover:text-amber-400 hover:bg-[var(--ide-hover)]'
          }`}
          title="Switch to Recruiter Quick-Scan Mode"
          aria-label="Toggle Recruiter Mode"
        >
          <UserCheck className="w-5 h-5" />
        </button>

        {/* Settings / Cheatsheet */}
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="p-2.5 w-full flex justify-center items-center text-[var(--ide-text-muted)] hover:text-white hover:bg-[var(--ide-hover)] transition-colors"
          title="Settings & Keybindings Cheatsheet"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
