'use client';

import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { ActivityBar } from './ActivityBar';
import { TopMenu } from './TopMenu';
import { StatusBar } from './StatusBar';
import { Explorer } from './Explorer';
import { SearchPanel } from './SearchPanel';
import { ProjectExplorer } from '../projects/ProjectExplorer';
import { GithubView } from '../github/GithubView';
import { SkillsView } from '../skills/SkillsView';
import { EditorArea } from '../editor/EditorArea';
import { TerminalPanel } from '../terminal/TerminalPanel';
import { CommandPalette } from '../command-palette/CommandPalette';
import { QuickOpen } from '../command-palette/QuickOpen';
import { SettingsModal } from './SettingsModal';
import { PortfolioEntryModal } from '../common/PortfolioEntryModal';
import { RecruiterView } from '../recruiter/RecruiterView';
import { 
  Files, 
  Terminal, 
  UserCheck, 
  X,
  Code
} from 'lucide-react';

export const WorkspaceShell: React.FC = () => {
  const { 
    mode, 
    setMode, 
    activeActivityTab, 
    isSidebarOpen, 
    toggleSidebar, 
    toggleTerminal, 
    setIsSettingsOpen 
  } = useWorkspace();

  useKeyboardShortcuts();

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Render appropriate sidebar panel content based on activeActivityTab
  const renderSidebarContent = () => {
    switch (activeActivityTab) {
      case 'explorer': return <Explorer />;
      case 'search': return <SearchPanel />;
      case 'projects': return <ProjectExplorer />;
      case 'github': return <GithubView />;
      case 'skills': return <SkillsView />;
      default: return <Explorer />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[var(--ide-bg)] overflow-hidden font-sans text-xs select-none relative">
      {/* Top Menu Bar */}
      <TopMenu />

      {/* Main Container with Horizontal Workspace Slide Transition */}
      <div className="flex-1 relative overflow-hidden w-full h-full">
        {/* Mode 1: Developer IDE Workspace */}
        <div 
          className={`w-full h-full flex flex-col transition-all duration-500 ease-in-out transform ${
            mode === 'developer' || mode === 'terminal'
              ? 'translate-x-0 opacity-100 pointer-events-auto' 
              : '-translate-x-full opacity-0 pointer-events-none absolute inset-0'
          }`}
          aria-hidden={mode === 'recruiter'}
        >
          {/* Main Middle Row (Activity Bar + Sidebar + Editor + Terminal) */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Left Activity Bar (Desktop) */}
            <div className="hidden sm:flex shrink-0">
              <ActivityBar />
            </div>

            {/* Collapsible Sidebar (Desktop) */}
            {isSidebarOpen && (
              <aside 
                className="hidden sm:flex flex-col w-60 md:w-72 bg-[var(--ide-sidebar)] border-r border-[var(--ide-border)] shrink-0 overflow-hidden z-20"
                aria-label="Primary Sidebar"
              >
                {renderSidebarContent()}
              </aside>
            )}

            {/* Center Workspace (Editor + Bottom Terminal) */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              <EditorArea />
              <TerminalPanel />
            </div>

            {/* Mobile Slide-over Drawer for Files & Sidebar */}
            {isMobileDrawerOpen && (
              <div className="fixed inset-0 z-50 sm:hidden flex">
                <div 
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
                  onClick={() => setIsMobileDrawerOpen(false)} 
                />
                <div className="relative w-4/5 max-w-xs bg-[var(--ide-sidebar)] h-full z-10 flex flex-col shadow-2xl border-r border-[var(--ide-border)]">
                  <div className="p-3 border-b border-[var(--ide-border)] flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <Code className="w-4 h-4 text-[var(--ide-accent)]" />
                      <span>Workspace Files</span>
                    </div>
                    <button 
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className="p-1 rounded hover:bg-[var(--ide-hover)] text-[var(--ide-text-muted)] hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {renderSidebarContent()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Status Bar */}
          <StatusBar />

          {/* Mobile Bottom Navigation Bar */}
          <nav className="sm:hidden h-12 bg-[var(--ide-bg)] border-t border-[var(--ide-border)] flex items-center justify-around px-2 z-30 shrink-0">
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="flex flex-col items-center gap-0.5 text-2xs text-[var(--ide-text-muted)] hover:text-white"
            >
              <Files className="w-4 h-4" />
              <span>Files</span>
            </button>
            <button
              onClick={toggleTerminal}
              className="flex flex-col items-center gap-0.5 text-2xs text-[var(--ide-text-muted)] hover:text-white"
            >
              <Terminal className="w-4 h-4" />
              <span>Terminal</span>
            </button>
            <button
              onClick={() => setMode('recruiter')}
              className="flex flex-col items-center gap-0.5 text-2xs text-emerald-400 font-semibold"
            >
              <UserCheck className="w-4 h-4" />
              <span>Recruiter</span>
            </button>
          </nav>
        </div>

        {/* Mode 2: Recruiter Workspace (Sliding in horizontally from right) */}
        <div 
          className={`absolute inset-0 w-full h-full z-30 transition-all duration-500 ease-in-out transform ${
            mode === 'recruiter' 
              ? 'translate-x-0 opacity-100 pointer-events-auto' 
              : 'translate-x-full opacity-0 pointer-events-none'
          }`}
          aria-hidden={mode !== 'recruiter'}
        >
          <RecruiterView />
        </div>
      </div>

      {/* Global Modals & Palettes */}
      <CommandPalette />
      <QuickOpen />
      <SettingsModal />
      <PortfolioEntryModal />
    </div>
  );
};
