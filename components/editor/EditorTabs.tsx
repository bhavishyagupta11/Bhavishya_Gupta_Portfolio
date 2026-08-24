'use client';

import React from 'react';
import { X, Layers } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { findFileById } from '@/data/fileSystem';
import { FileIcon } from '@/components/common/FileIcon';

export const EditorTabs: React.FC = () => {
  const { 
    openFileIds, 
    activeFileId, 
    setActiveFileId, 
    closeFile, 
    closeOtherFiles 
  } = useWorkspace();

  if (openFileIds.length === 0) return null;

  return (
    <div className="h-9 bg-[var(--ide-tabs)] border-b border-[var(--ide-border)] flex items-center justify-between select-none shrink-0 overflow-hidden">
      {/* Scrollable Tabs list */}
      <div className="flex-1 flex items-center h-full overflow-x-auto no-scrollbar">
        {openFileIds.map(fileId => {
          const file = findFileById(fileId);
          if (!file) return null;

          const isActive = activeFileId === fileId;

          return (
            <div
              key={fileId}
              onClick={() => setActiveFileId(fileId)}
              onAuxClick={(e) => {
                // Middle-click to close tab
                if (e.button === 1) {
                  e.preventDefault();
                  closeFile(fileId);
                }
              }}
              title={file.name}
              className={`h-full flex items-center gap-2 px-3 text-xs border-r border-[var(--ide-border)] cursor-pointer group transition-colors relative min-w-[130px] max-w-[220px] shrink-0 ${
                isActive 
                  ? 'bg-[var(--ide-tab-active)] text-white font-medium border-t-2 border-t-[var(--ide-accent)]' 
                  : 'bg-[var(--ide-tab-inactive)] text-[var(--ide-text-muted)] hover:bg-[var(--ide-hover)] hover:text-[var(--ide-text)]'
              }`}
            >
              <FileIcon name={file.name} type="file" className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate flex-1 font-mono text-[11px]">{file.name}</span>

              {/* Close Tab Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(fileId);
                }}
                className={`p-0.5 rounded hover:bg-white/20 transition-opacity ${
                  isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-[var(--ide-text-muted)] hover:text-white'
                }`}
                title="Close Tab (Ctrl+W)"
                aria-label={`Close ${file.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Tab Context Actions */}
      {openFileIds.length > 1 && (
        <div className="flex items-center px-2 shrink-0 border-l border-[var(--ide-border)] bg-[var(--ide-tabs)]">
          <button
            onClick={() => {
              if (activeFileId) closeOtherFiles(activeFileId);
            }}
            className="text-[10px] font-mono text-[var(--ide-text-muted)] hover:text-white px-2 py-1 rounded hover:bg-[var(--ide-hover)] whitespace-nowrap transition-colors"
            title="Close Other Tabs"
          >
            Close Others
          </button>
        </div>
      )}
    </div>
  );
};
