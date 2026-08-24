'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { getAllFiles } from '@/data/fileSystem';
import { FileIcon } from '@/components/common/FileIcon';

export const QuickOpen: React.FC = () => {
  const { isQuickOpenOpen, setIsQuickOpenOpen, openFile } = useWorkspace();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allFiles = getAllFiles();

  const filtered = allFiles.filter(f => 
    f.name.toLowerCase().includes(query.toLowerCase()) || 
    f.path.toLowerCase().includes(query.toLowerCase()) ||
    (f.description && f.description.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (isQuickOpenOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isQuickOpenOpen]);

  if (!isQuickOpenOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        openFile(filtered[selectedIndex]);
        setIsQuickOpenOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsQuickOpenOpen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh] p-4"
      onClick={() => setIsQuickOpenOpen(false)}
    >
      <div 
        className="bg-[var(--ide-sidebar)] border border-[var(--ide-border)] w-full max-w-xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[60vh] select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="p-3 border-b border-[var(--ide-border)] flex items-center gap-2.5 bg-[var(--ide-bg)]">
          <Search className="w-4 h-4 text-[var(--ide-accent)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search files by name (e.g. scholrboard, about, resume)..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-xs text-[var(--ide-text)] outline-none font-mono"
            spellCheck={false}
          />
          <kbd className="text-[10px] bg-[var(--ide-sidebar)] px-1.5 py-0.5 rounded border border-[var(--ide-border)] text-[var(--ide-text-muted)]">
            ESC
          </kbd>
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto p-1 text-xs font-mono">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-[var(--ide-text-muted)]">
              No matching files found.
            </div>
          ) : (
            filtered.map((file, i) => (
              <button
                key={file.id}
                onClick={() => {
                  openFile(file);
                  setIsQuickOpenOpen(false);
                }}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center justify-between p-2 rounded text-left transition-colors ${
                  selectedIndex === i
                    ? 'bg-[var(--ide-selection)] text-white'
                    : 'text-[var(--ide-text)] hover:bg-[var(--ide-hover)]'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <FileIcon name={file.name} type="file" className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">{file.name}</span>
                  <span className="text-2xs text-[var(--ide-text-muted)] truncate opacity-80">
                    {file.path}
                  </span>
                </div>
                {file.category && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-black/30 rounded text-[var(--ide-accent)] shrink-0 ml-2">
                    {file.category}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
