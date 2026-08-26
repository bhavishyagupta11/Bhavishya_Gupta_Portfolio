'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Layers
} from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { virtualFileSystem } from '@/data/fileSystem';
import { FileItem } from '@/types';
import { FileIcon } from '@/components/common/FileIcon';

export const Explorer: React.FC = () => {
  const { openFile, activeFileId } = useWorkspace();
  
  // Track open state for directories
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'root': true,
    'projects-folder': true,
    'coding-folder': true,
    'certs-folder': false
  });

  const toggleFolder = (folderId: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const expandAll = () => {
    setOpenFolders({
      'root': true,
      'projects-folder': true,
      'coding-folder': true,
      'certs-folder': true
    });
  };

  const collapseAll = () => {
    setOpenFolders({
      'root': true,
      'projects-folder': false,
      'coding-folder': false,
      'certs-folder': false
    });
  };

  const renderItem = (item: FileItem, depth: number = 0) => {
    const isFolder = item.type === 'folder';
    const isOpen = openFolders[item.id] ?? false;
    const isActive = activeFileId === item.id;

    if (isFolder) {
      return (
        <div key={item.id} className="w-full">
          <button
            onClick={() => toggleFolder(item.id)}
            className="w-full flex items-center gap-1.5 py-1 px-2 hover:bg-[var(--ide-hover)] text-[var(--ide-text)] text-xs text-left group transition-colors select-none"
            style={{ paddingLeft: `${Math.max(8, depth * 14 + 8)}px` }}
          >
            <span className="text-[var(--ide-text-muted)] group-hover:text-white">
              {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </span>
            <FileIcon name={item.name} type="folder" isOpen={isOpen} className="w-4 h-4" />
            <span className="font-semibold tracking-wide text-xs truncate uppercase text-[var(--ide-text)]">
              {item.name}
            </span>
            {item.category === 'projects' && (
              <span className="ml-auto text-[10px] text-[var(--ide-text-muted)] font-mono">
                6
              </span>
            )}
            {item.category === 'coding' && (
              <span className="ml-auto text-[10px] text-[var(--ide-text-muted)] font-mono">
                live
              </span>
            )}
          </button>

          {isOpen && item.children && (
            <div className="w-full">
              {item.children.map(child => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        key={item.id}
        onClick={() => openFile(item)}
        className={`w-full flex items-center gap-2 py-1 px-2 text-xs text-left group transition-colors select-none ${
          isActive 
            ? 'bg-[var(--ide-selection)] text-white font-medium' 
            : 'text-[var(--ide-text)] hover:bg-[var(--ide-hover)]'
        }`}
        style={{ paddingLeft: `${Math.max(8, depth * 14 + 14)}px` }}
        title={item.description || item.name}
      >
        <FileIcon name={item.name} type="file" className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{item.name}</span>
        {item.category === 'projects' && (
          <span className="ml-auto opacity-0 group-hover:opacity-100 text-[10px] text-[var(--ide-text-muted)] font-mono">
            preview
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[var(--ide-sidebar)] select-none">
      {/* Explorer Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--ide-border)] text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold">
        <span>EXPLORER</span>
        <div className="flex items-center gap-1">
          <button 
            onClick={collapseAll} 
            className="hover:text-white p-0.5 rounded hover:bg-[var(--ide-hover)]"
            title="Collapse All Folders"
          >
            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
          </button>
          <button 
            onClick={expandAll} 
            className="hover:text-white p-0.5 rounded hover:bg-[var(--ide-hover)]"
            title="Expand All Folders"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* File Tree Root Container */}
      <div className="flex-1 overflow-y-auto py-1">
        {renderItem(virtualFileSystem, 0)}
      </div>

      {/* Workspace Candidate Summary Footer */}
      <div className="p-2.5 border-t border-[var(--ide-border)] bg-[var(--ide-bg)]/30 text-2xs text-[var(--ide-text-muted)] flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[var(--ide-text)] font-semibold">Candidate Info</span>
          <span className="font-mono text-[var(--ide-accent)] font-medium">CGPA 9.30</span>
        </div>
        <div className="text-[11px] text-[var(--ide-text-muted)] truncate">Bhavishya Gupta · SDE Intern</div>
      </div>
    </div>
  );
};
