'use client';

import React from 'react';
import { ChevronRight, Folder } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { FileIcon } from '@/components/common/FileIcon';

export const Breadcrumbs: React.FC = () => {
  const { activeFileItem, projectTabMode, setProjectTabMode } = useWorkspace();

  if (!activeFileItem) {
    return (
      <div className="h-6 bg-[var(--ide-editor)] border-b border-[var(--ide-border)] flex items-center px-3 text-2xs text-[var(--ide-text-muted)] select-none">
        <span>No file selected</span>
      </div>
    );
  }

  const parts = activeFileItem.path ? activeFileItem.path.split('/') : [activeFileItem.name];
  const isProjectFile = activeFileItem.category === 'projects' && activeFileItem.extension === 'tsx';

  return (
    <div className="h-7 bg-[var(--ide-editor)] border-b border-[var(--ide-border)] flex items-center justify-between px-3 text-2xs text-[var(--ide-text-muted)] select-none shrink-0">
      {/* Path segments */}
      <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-1">
        <span className="text-[var(--ide-text)] font-semibold flex items-center gap-1">
          <Folder className="w-3.5 h-3.5 text-amber-400" />
          <span>BHAVISHYA</span>
        </span>

        {parts.map((segment, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-[var(--ide-text-muted)] opacity-60 shrink-0" />
            <span className={`flex items-center gap-1 ${index === parts.length - 1 ? 'text-[var(--ide-text)] font-medium' : ''}`}>
              {index === parts.length - 1 && (
                <FileIcon name={segment} type="file" className="w-3.5 h-3.5 shrink-0" />
              )}
              <span>{segment}</span>
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Triple-view switcher for project files */}
      {isProjectFile && (
        <div className="flex items-center bg-[var(--ide-sidebar)] rounded p-0.5 border border-[var(--ide-border)] shrink-0 ml-2">
          <button
            onClick={() => setProjectTabMode('preview')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
              projectTabMode === 'preview'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
            title="Interactive Visual Preview"
          >
            PREVIEW
          </button>
          <button
            onClick={() => setProjectTabMode('code')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
              projectTabMode === 'code'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
            title="Source Code View"
          >
            CODE
          </button>
          <button
            onClick={() => setProjectTabMode('architecture')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
              projectTabMode === 'architecture'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
            title="Interactive System Architecture Diagram"
          >
            ARCHITECTURE
          </button>
        </div>
      )}
    </div>
  );
};
