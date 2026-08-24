'use client';

import React from 'react';
import { X, Settings, Palette, Keyboard, UserCheck, Code2, Sparkles, Check } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ThemeName, WorkspaceMode } from '@/types';

export const SettingsModal: React.FC = () => {
  const { 
    isSettingsOpen, 
    setIsSettingsOpen, 
    theme, 
    setTheme, 
    mode, 
    setMode 
  } = useWorkspace();

  if (!isSettingsOpen) return null;

  const themes: { id: ThemeName; name: string; desc: string; bg: string }[] = [
    { id: 'dark-plus', name: 'Dark+ (Default)', desc: 'Modern VS Code dark theme with balanced contrast', bg: '#1e1e1e' },
    { id: 'midnight', name: 'Midnight Deep Blue', desc: 'Deep black & cyan engineering palette', bg: '#0a0e17' },
    { id: 'light-plus', name: 'Light+ Professional', desc: 'Crisp light developer workspace', bg: '#ffffff' }
  ];

  const shortcuts = [
    { key: 'Ctrl + P', desc: 'Quick Open file search' },
    { key: 'Ctrl + Shift + P', desc: 'Command Palette' },
    { key: 'Ctrl + B', desc: 'Toggle Primary Sidebar' },
    { key: 'Ctrl + J / Ctrl + `', desc: 'Toggle Terminal Panel' },
    { key: 'Ctrl + W', desc: 'Close Active Editor Tab' },
    { key: 'Ctrl + Shift + R', desc: 'Open Resume Preview' },
    { key: 'Esc', desc: 'Close open modal / palette' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={() => setIsSettingsOpen(false)}
    >
      <div 
        className="bg-[var(--ide-sidebar)] border border-[var(--ide-border)] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--ide-border)] flex items-center justify-between bg-[var(--ide-bg)]">
          <div className="flex items-center gap-2 font-bold text-sm text-[var(--ide-text)]">
            <Settings className="w-4 h-4 text-[var(--ide-accent)]" />
            <span>Workspace Settings & Keyboard Shortcuts</span>
          </div>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 rounded hover:bg-[var(--ide-hover)] text-[var(--ide-text-muted)] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-[var(--ide-text)]">
          {/* Theme Selector */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold mb-2.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>Color Themes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-lg border text-left transition-all relative ${
                    theme === t.id
                      ? 'border-[var(--ide-accent)] bg-[var(--ide-selection)]/20 shadow-md ring-1 ring-[var(--ide-accent)]'
                      : 'border-[var(--ide-border)] bg-[var(--ide-bg)] hover:border-[var(--ide-text-muted)]'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-xs mb-1">
                    <span>{t.name}</span>
                    {theme === t.id && <Check className="w-3.5 h-3.5 text-[var(--ide-accent)]" />}
                  </div>
                  <div className="text-2xs text-[var(--ide-text-muted)] leading-snug">
                    {t.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Workspace Mode */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold mb-2.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Workspace Experience Modes</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={() => setMode('developer')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  mode === 'developer'
                    ? 'border-[var(--ide-accent)] bg-[var(--ide-selection)]/20 ring-1 ring-[var(--ide-accent)]'
                    : 'border-[var(--ide-border)] bg-[var(--ide-bg)] hover:border-[var(--ide-text-muted)]'
                }`}
              >
                <div className="font-semibold text-xs text-[var(--ide-text)] flex items-center gap-1.5 mb-1">
                  <Code2 className="w-3.5 h-3.5 text-[var(--ide-accent)]" />
                  <span>Developer Workspace Mode</span>
                </div>
                <div className="text-2xs text-[var(--ide-text-muted)] leading-snug">
                  Full VS Code-style interactive interface with tabs, file tree, syntax code, and terminal.
                </div>
              </button>

              <button
                onClick={() => setMode('recruiter')}
                className={`p-3 rounded-lg border text-left transition-all ${
                  mode === 'recruiter'
                    ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                    : 'border-[var(--ide-border)] bg-[var(--ide-bg)] hover:border-[var(--ide-text-muted)]'
                }`}
              >
                <div className="font-semibold text-xs text-amber-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recruiter 30-Second Mode</span>
                </div>
                <div className="text-2xs text-[var(--ide-text-muted)] leading-snug">
                  High-velocity executive summary designed for hiring managers and recruiters.
                </div>
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Table */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono font-bold mb-2.5 flex items-center gap-1.5">
              <Keyboard className="w-3.5 h-3.5 text-sky-400" />
              <span>Keyboard Shortcuts Cheatsheet</span>
            </h3>

            <div className="border border-[var(--ide-border)] rounded-lg overflow-hidden font-mono text-2xs">
              {shortcuts.map((sc, i) => (
                <div 
                  key={sc.key} 
                  className={`flex items-center justify-between p-2.5 ${
                    i % 2 === 0 ? 'bg-[var(--ide-bg)]' : 'bg-[var(--ide-sidebar)]'
                  } border-b border-[var(--ide-border)]/60 last:border-b-0`}
                >
                  <span className="text-[var(--ide-text-muted)]">{sc.desc}</span>
                  <kbd className="px-2 py-0.5 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-white font-semibold shadow-xs">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
