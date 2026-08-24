'use client';

import React from 'react';
import { 
  GitBranch, 
  CheckCheck, 
  AlertCircle, 
  Bell, 
  Terminal, 
  Sparkles, 
  FileCode2, 
  Cpu, 
  Activity
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';

export const StatusBar: React.FC = () => {
  const { 
    activeFileItem, 
    toggleTerminal, 
    isTerminalOpen,
    theme,
    setTheme,
    mode,
    setMode
  } = useWorkspace();

  const getLanguageLabel = () => {
    if (!activeFileItem) return 'Plain Text';
    switch (activeFileItem.extension) {
      case 'tsx':
        return 'TypeScript React';
      case 'ts':
        return 'TypeScript';
      case 'json':
        return 'JSON';
      case 'md':
        return 'Markdown';
      case 'pdf':
        return 'PDF Document';
      default:
        return 'UTF-8';
    }
  };

  return (
    <footer className="h-6 bg-[var(--ide-statusbar)] text-white text-2xs flex items-center justify-between px-2.5 select-none z-40 shrink-0 font-mono">
      {/* Left side items */}
      <div className="flex items-center gap-3">
        {/* Branch */}
        <a 
          href="https://github.com/bhavishyagupta11/Bhavishya-Gupta-Protfolio"
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:bg-black/20 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
          title="Git Branch: main"
        >
          <GitBranch className="w-3 h-3" />
          <span>main*</span>
        </a>

        {/* Sync & Errors */}
        <div className="flex items-center gap-1.5 hover:bg-black/20 px-1 py-0.5 rounded cursor-pointer" title="0 Errors, 0 Warnings">
          <CheckCheck className="w-3 h-3 text-emerald-300" />
          <span>0</span>
        </div>

        {/* Terminal Toggle */}
        <button 
          onClick={toggleTerminal}
          className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            isTerminalOpen ? 'bg-black/30 font-bold' : 'hover:bg-black/20'
          }`}
          title="Toggle Terminal Panel (Ctrl+J)"
        >
          <Terminal className="w-3 h-3" />
          <span>Terminal</span>
        </button>

        {/* Status indicator */}
        <span className="hidden lg:inline text-white/80 hover:bg-black/20 px-1 py-0.5 rounded cursor-default font-mono text-2xs">
          SDE &amp; 2027 Grad Roles
        </span>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-3">
        {/* Line / Column */}
        <span className="hidden sm:inline hover:bg-black/20 px-1 py-0.5 rounded cursor-default">
          Ln 1, Col 1
        </span>

        {/* Encoding */}
        <span className="hidden sm:inline hover:bg-black/20 px-1 py-0.5 rounded cursor-default">
          UTF-8
        </span>

        {/* Language Mode */}
        <span className="flex items-center gap-1 hover:bg-black/20 px-1.5 py-0.5 rounded cursor-default font-medium">
          <FileCode2 className="w-3 h-3" />
          {getLanguageLabel()}
        </span>

        {/* Prettier Badge */}
        <span className="hidden lg:inline hover:bg-black/20 px-1.5 py-0.5 rounded cursor-default text-emerald-200" title="Code Formatted with Prettier">
          ✓ Prettier
        </span>

        {/* Notification / Bell */}
        <button 
          onClick={() => setMode(mode === 'recruiter' ? 'developer' : 'recruiter')}
          className="hover:bg-black/20 p-1 rounded" 
          title="Recruiter Mode"
        >
          <Bell className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
};
