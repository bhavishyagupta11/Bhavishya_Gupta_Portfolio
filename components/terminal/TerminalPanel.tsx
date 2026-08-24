'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, Maximize2, Minimize2, Trash2, CornerDownLeft } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { executeCommand, CommandContext } from './commandRunner';

interface HistoryEntry {
  id: string;
  command: string;
  output: React.ReactNode;
}

export const TerminalPanel: React.FC = () => {
  const { 
    isTerminalOpen, 
    toggleTerminal, 
    openFile, 
    setTheme, 
    setMode,
    mode 
  } = useWorkspace();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: 'init-1',
      command: 'whoami',
      output: (
        <div className="text-xs font-mono text-[var(--ide-text-muted)] space-y-0.5">
          <div className="text-emerald-400 font-bold">Bhavishya Gupta — Software Engineer Workspace [Ready]</div>
          <div>Type <span className="text-white font-bold">&quot;help&quot;</span> for available commands or <span className="text-white font-bold">&quot;projects&quot;</span> to browse projects.</div>
        </div>
      )
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>(['whoami']);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isTerminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminalOpen]);

  if (!isTerminalOpen && mode !== 'terminal') return null;

  const commandContext: CommandContext = {
    openFile: (file) => openFile(file),
    setTheme: (t) => setTheme(t),
    setMode: (m) => setMode(m),
    clearHistory: () => setHistory([])
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Up arrow -> Previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || '');
      return;
    }

    // Down arrow -> Next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] || '');
      }
      return;
    }

    // Tab autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const validCommands = [
        'help', 'about', 'projects', 'project', 'skills', 'experience', 
        'education', 'coding', 'github', 'resume', 'contact', 'whoami', 
        'theme', 'mode', 'ls', 'clear', 'sudo hire bhavishya'
      ];
      const match = validCommands.find(c => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
      return;
    }

    // Enter -> Execute command
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!input.trim()) return;

      const output = executeCommand(input, commandContext);
      if (input.trim().toLowerCase() !== 'clear') {
        setHistory(prev => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            command: input,
            output
          }
        ]);
        setCommandHistory(prev => [...prev, input]);
      }
      setInput('');
      setHistoryIndex(-1);
    }
  };

  return (
    <div 
      className={`bg-[var(--ide-terminal)] border-t border-[var(--ide-border)] flex flex-col z-30 transition-all ${
        isFullscreen || mode === 'terminal'
          ? 'fixed inset-0 h-full w-full' 
          : 'h-64 sm:h-72 w-full shrink-0'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="h-8 bg-[var(--ide-bg)] border-b border-[var(--ide-border)] flex items-center justify-between px-3 text-2xs select-none shrink-0 font-mono text-[var(--ide-text-muted)]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-white tracking-wide">TERMINAL</span>
          <span className="opacity-60">• bash (bhavishya@workspace)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setHistory([])}
            className="p-1 rounded hover:bg-[var(--ide-hover)] hover:text-white"
            title="Clear Terminal Output (Ctrl+L)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {mode !== 'terminal' && (
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-1 rounded hover:bg-[var(--ide-hover)] hover:text-white"
              title={isFullscreen ? 'Restore Size' : 'Maximize Terminal'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}

          {mode !== 'terminal' && (
            <button
              onClick={toggleTerminal}
              className="p-1 rounded hover:bg-[var(--ide-hover)] hover:text-white"
              title="Close Terminal (Ctrl+J)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Terminal History Container */}
      <div 
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-3 md:p-4 font-mono text-xs text-[var(--ide-text)] space-y-3 cursor-text allow-select"
      >
        {history.map(item => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="text-sky-400">bhavishya@workspace</span>
              <span className="text-[var(--ide-text-muted)]">:</span>
              <span className="text-amber-400">~</span>
              <span className="text-[var(--ide-text-muted)]">$</span>
              <span className="text-white">{item.command}</span>
            </div>
            {item.output && (
              <div className="pl-4 text-[var(--ide-text)] border-l-2 border-[var(--ide-border)]/60 py-0.5">
                {item.output}
              </div>
            )}
          </div>
        ))}

        {/* Current Prompt Input Line */}
        <div className="flex items-center gap-2 text-emerald-400 pt-1">
          <span className="text-sky-400 font-semibold">bhavishya@workspace</span>
          <span className="text-[var(--ide-text-muted)]">:</span>
          <span className="text-amber-400">~</span>
          <span className="text-[var(--ide-text-muted)]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white font-mono text-xs caret-emerald-400"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};
