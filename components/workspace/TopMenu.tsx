'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Layers, 
  Search, 
  UserCheck, 
  Code,
  Code2,
  FileText,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ThemeName } from '@/types';

export const TopMenu: React.FC = () => {
  const { 
    theme, 
    setTheme, 
    mode, 
    setMode, 
    setIsQuickOpenOpen,
    setIsSettingsOpen,
    toggleTerminal,
    toggleSidebar,
    openFile,
    closeAllFiles
  } = useWorkspace();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: ThemeName; name: string }[] = [
    { id: 'dark-plus', name: 'Dark+ (Modern Dark)' },
    { id: 'midnight', name: 'Midnight (Deep Blue)' },
    { id: 'light-plus', name: 'Light+ (Clean Light)' }
  ];

  return (
    <header className="h-9 bg-[var(--ide-bg)] border-b border-[var(--ide-border)] flex items-center justify-between px-3 select-none text-xs text-[var(--ide-text)] z-40 shrink-0">
      {/* Left: Brand & Menu Items */}
      <div className="flex items-center gap-1" ref={menuRef}>
        <button
          onClick={() => openFile('readme-md')}
          className="flex items-center gap-1.5 mr-2 font-semibold text-[var(--ide-accent)] hover:opacity-80 transition-opacity"
          title="BG Studio — Home"
        >
          <Code className="w-4 h-4 text-[var(--ide-accent)]" />
          <span className="tracking-wide font-bold">BG Studio</span>
        </button>

        {/* Menu Item: File */}
        <div className="relative">
          <button 
            onClick={() => setActiveMenu(activeMenu === 'file' ? null : 'file')}
            className={`px-2 py-1 rounded hover:bg-[var(--ide-hover)] transition-colors ${activeMenu === 'file' ? 'bg-[var(--ide-hover)] text-white' : ''}`}
            aria-expanded={activeMenu === 'file'}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-[var(--ide-sidebar)] border border-[var(--ide-border)] rounded shadow-xl py-1 z-50">
              <button 
                onClick={() => { setIsQuickOpenOpen(true); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-[var(--ide-hover)]"
              >
                <span>Quick Open...</span>
                <span className="text-[10px] text-[var(--ide-text-muted)] font-mono">Ctrl+P</span>
              </button>
              <button 
                onClick={() => { openFile('resume-pdf'); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-[var(--ide-hover)]"
              >
                <span>View Resume</span>
                <span className="text-[10px] text-[var(--ide-text-muted)] font-mono">Ctrl+Shift+R</span>
              </button>
              <div className="my-1 border-t border-[var(--ide-border)]" />
              <button 
                onClick={() => { closeAllFiles(); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left hover:bg-[var(--ide-hover)] text-rose-400"
              >
                Close All Tabs
              </button>
            </div>
          )}
        </div>

        {/* Menu Item: View */}
        <div className="relative">
          <button 
            onClick={() => setActiveMenu(activeMenu === 'view' ? null : 'view')}
            className={`px-2 py-1 rounded hover:bg-[var(--ide-hover)] transition-colors ${activeMenu === 'view' ? 'bg-[var(--ide-hover)] text-white' : ''}`}
            aria-expanded={activeMenu === 'view'}
          >
            View
          </button>
          {activeMenu === 'view' && (
            <div className="absolute left-0 top-full mt-1 w-52 bg-[var(--ide-sidebar)] border border-[var(--ide-border)] rounded shadow-xl py-1 z-50">
              <button 
                onClick={() => { toggleSidebar(); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-[var(--ide-hover)]"
              >
                <span>Toggle Primary Sidebar</span>
                <span className="text-[10px] text-[var(--ide-text-muted)] font-mono">Ctrl+B</span>
              </button>
              <button 
                onClick={() => { toggleTerminal(); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-[var(--ide-hover)]"
              >
                <span>Toggle Terminal Panel</span>
                <span className="text-[10px] text-[var(--ide-text-muted)] font-mono">Ctrl+`</span>
              </button>
              <div className="my-1 border-t border-[var(--ide-border)]" />
              <button 
                onClick={() => { setMode(mode === 'recruiter' ? 'developer' : 'recruiter'); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-[var(--ide-hover)] text-amber-300"
              >
                <span>{mode === 'recruiter' ? 'Switch to Developer Mode' : 'Switch to Recruiter Mode'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Menu Item: Themes */}
        <div className="relative">
          <button 
            onClick={() => setActiveMenu(activeMenu === 'themes' ? null : 'themes')}
            className={`px-2 py-1 rounded hover:bg-[var(--ide-hover)] transition-colors ${activeMenu === 'themes' ? 'bg-[var(--ide-hover)] text-white' : ''}`}
            aria-expanded={activeMenu === 'themes'}
          >
            Themes
          </button>
          {activeMenu === 'themes' && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-[var(--ide-sidebar)] border border-[var(--ide-border)] rounded shadow-xl py-1 z-50">
              {themes.map(t => (
                <button 
                  key={t.id}
                  onClick={() => { setTheme(t.id); setActiveMenu(null); }}
                  className={`w-full px-3 py-1.5 text-left flex justify-between items-center hover:bg-[var(--ide-hover)] ${
                    theme === t.id ? 'text-[var(--ide-accent)] font-semibold' : ''
                  }`}
                >
                  <span>{t.name}</span>
                  {theme === t.id && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu Item: Help */}
        <div className="relative">
          <button 
            onClick={() => setActiveMenu(activeMenu === 'help' ? null : 'help')}
            className={`px-2 py-1 rounded hover:bg-[var(--ide-hover)] transition-colors ${activeMenu === 'help' ? 'bg-[var(--ide-hover)] text-white' : ''}`}
            aria-expanded={activeMenu === 'help'}
          >
            Help
          </button>
          {activeMenu === 'help' && (
            <div className="absolute left-0 top-full mt-1 w-52 bg-[var(--ide-sidebar)] border border-[var(--ide-border)] rounded shadow-xl py-1 z-50">
              <button 
                onClick={() => { setIsSettingsOpen(true); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left hover:bg-[var(--ide-hover)]"
              >
                Keyboard Shortcuts Cheatsheet
              </button>
              <button 
                onClick={() => { openFile('about-md'); setActiveMenu(null); }}
                className="w-full px-3 py-1.5 text-left hover:bg-[var(--ide-hover)]"
              >
                About Bhavishya Gupta
              </button>
              <a 
                href="https://github.com/bhavishyagupta11/Bhavishya-Gupta-Protfolio"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-3 py-1.5 text-left block hover:bg-[var(--ide-hover)] text-[var(--ide-accent)]"
              >
                GitHub Repository ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Center: Search & Quick Open Trigger */}
      <button 
        onClick={() => setIsQuickOpenOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1 bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] rounded-md text-[var(--ide-text-muted)] max-w-sm w-full justify-between transition-colors shadow-sm"
        aria-label="Quick Open File Search"
      >
        <span className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5 text-[var(--ide-accent)]" />
          <span className="text-2xs truncate">Bhavishya Workspace — Quick Open file...</span>
        </span>
        <kbd className="text-[10px] bg-[var(--ide-bg)] px-1.5 py-0.5 rounded border border-[var(--ide-border)] font-mono">
          Ctrl+P
        </kbd>
      </button>

      {/* Right: Mode Switcher & Useful Actions (Clean, No Decorative Dots) */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => openFile('resume-pdf')}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-2xs text-[var(--ide-text-muted)] hover:text-white transition-colors"
          title="Open Resume Preview"
        >
          <FileText className="w-3.5 h-3.5 text-rose-400" />
          <span>Resume</span>
        </button>

        {/* Recruiter Mode Interactive Switch */}
        <button
          onClick={() => setMode(mode === 'recruiter' ? 'developer' : 'recruiter')}
          className="flex items-center gap-1.5 px-3 py-1 rounded text-2xs font-semibold bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-text)] hover:text-white transition-colors"
          title={mode === 'recruiter' ? 'Return to Developer Workspace' : 'Switch to Recruiter View'}
          aria-pressed={mode === 'recruiter'}
        >
          {mode === 'recruiter' ? (
            <>
              <Code2 className="w-3.5 h-3.5 text-[var(--ide-accent)]" />
              <span>Return to IDE</span>
            </>
          ) : (
            <>
              <UserCheck className="w-3.5 h-3.5 text-[var(--ide-text-muted)]" />
              <span>Recruiter View</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
