'use client';

import React from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { EditorTabs } from './EditorTabs';
import { Breadcrumbs } from '../workspace/Breadcrumbs';
import { ProjectView } from './ProjectView';
import { MarkdownViewer } from './MarkdownViewer';
import { JsonViewer } from './JsonViewer';
import { ResumeViewer } from './ResumeViewer';
import { ContactView } from './ContactView';
import { LeetCodeWorkspace } from '../coding/LeetCodeWorkspace';
import { GfgCode360Workspace } from '../coding/GfgCode360Workspace';
import { GitHubWorkspace } from '../coding/GitHubWorkspace';
import { CodolioWorkspace } from '../coding/CodolioWorkspace';
import { projectsData } from '@/data/projects';
import { Code2 } from 'lucide-react';

export const EditorArea: React.FC = () => {
  const { 
    openFileIds, 
    activeFileId, 
    activeFileItem, 
    openFile
  } = useWorkspace();

  // If no file is open, show Welcome / Empty State
  if (!activeFileId || openFileIds.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] select-none">
        <EditorTabs />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--ide-accent)]/10 border border-[var(--ide-accent)]/30 flex items-center justify-center mx-auto text-[var(--ide-accent)]">
              <Code2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">BG Studio Workspace</h2>
              <p className="text-xs text-[var(--ide-text-muted)] mt-1">
                Interactive Engineering Portfolio & System Design Workspace
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-left text-xs">
              <button
                onClick={() => openFile('readme-md')}
                className="p-3 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] transition-colors group"
              >
                <div className="font-semibold text-white group-hover:text-[var(--ide-accent)]">README.md</div>
                <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">Overview & fast navigation</div>
              </button>

              <button
                onClick={() => openFile('futuremedia-tsx')}
                className="p-3 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] transition-colors group"
              >
                <div className="font-semibold text-white group-hover:text-[var(--ide-accent)]">FutureMedia.tsx</div>
                <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">Social Platform with BullMQ</div>
              </button>

              <button
                onClick={() => openFile('leetcode-md')}
                className="p-3 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] transition-colors group"
              >
                <div className="font-semibold text-white group-hover:text-[var(--ide-accent)]">LeetCode Live</div>
                <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">600+ solved & 1779 rating</div>
              </button>

              <button
                onClick={() => openFile('resume-pdf')}
                className="p-3 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] transition-colors group"
              >
                <div className="font-semibold text-white group-hover:text-[var(--ide-accent)]">resume.pdf</div>
                <div className="text-2xs text-[var(--ide-text-muted)] mt-0.5">Official candidate resume</div>
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4 text-2xs text-[var(--ide-text-muted)] font-mono">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-white">Ctrl+P</kbd> to find file</span>
              <span>•</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] text-white">Ctrl+`</kbd> for terminal</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render appropriate component based on active file type and ID
  const renderEditorContent = () => {
    // 1. Dedicated Coding Workspaces
    if (activeFileId === 'leetcode-md') {
      return <LeetCodeWorkspace />;
    }
    if (activeFileId === 'gfg-code360-md') {
      return <GfgCode360Workspace />;
    }
    if (activeFileId === 'github-md') {
      return <GitHubWorkspace />;
    }
    if (activeFileId === 'codolio-md') {
      return <CodolioWorkspace />;
    }

    // 2. Resume PDF
    if (activeFileId === 'resume-pdf') {
      return <ResumeViewer />;
    }

    // 3. Contact TS
    if (activeFileId === 'contact-ts') {
      return <ContactView />;
    }

    // 4. Project TSX Files
    if (activeFileItem?.category === 'projects' || activeFileId.endsWith('-tsx')) {
      const projId = activeFileId.replace('-tsx', '');
      const project = projectsData.find(p => p.id === projId) || projectsData[0];
      return <ProjectView project={project} />;
    }

    // 5. JSON Data Files
    if (activeFileItem?.extension === 'json') {
      return <JsonViewer fileId={activeFileId} />;
    }

    // 6. Markdown Documents (README.md, about.md, achievements.md)
    return <MarkdownViewer fileId={activeFileId} />;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--ide-editor)] overflow-hidden">
      {/* Editor Tab Strip */}
      <EditorTabs />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs />

      {/* Main View Area */}
      <div className="flex-1 overflow-hidden relative">
        {renderEditorContent()}
      </div>
    </div>
  );
};
