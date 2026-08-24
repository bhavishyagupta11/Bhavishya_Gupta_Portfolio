'use client';

import { useEffect } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';

export function useKeyboardShortcuts() {
  const {
    toggleSidebar,
    toggleTerminal,
    activeFileId,
    closeFile,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isQuickOpenOpen,
    setIsQuickOpenOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    openFile,
    setMode
  } = useWorkspace();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Close modal on Escape
      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (isQuickOpenOpen) setIsQuickOpenOpen(false);
        if (isSettingsOpen) setIsSettingsOpen(false);
        return;
      }

      // Ctrl + Shift + P -> Command Palette
      if (cmdOrCtrl && e.shiftKey && (e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        setIsQuickOpenOpen(false);
        setIsCommandPaletteOpen((prev: boolean) => !prev);
        return;
      }

      // Ctrl + P -> Quick Open (when not shift)
      if (cmdOrCtrl && !e.shiftKey && (e.key.toLowerCase() === 'p')) {
        e.preventDefault();
        setIsCommandPaletteOpen(false);
        setIsQuickOpenOpen((prev: boolean) => !prev);
        return;
      }

      // Ctrl + B -> Toggle Sidebar
      if (cmdOrCtrl && (e.key.toLowerCase() === 'b')) {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      // Ctrl + J or Ctrl + ` -> Toggle Terminal
      if (cmdOrCtrl && (e.key.toLowerCase() === 'j' || e.key === '`')) {
        e.preventDefault();
        toggleTerminal();
        return;
      }

      // Ctrl + W -> Close active file tab
      if (cmdOrCtrl && (e.key.toLowerCase() === 'w')) {
        e.preventDefault();
        if (activeFileId) {
          closeFile(activeFileId);
        }
        return;
      }

      // Ctrl + Shift + R -> View Resume
      if (cmdOrCtrl && e.shiftKey && (e.key.toLowerCase() === 'r')) {
        e.preventDefault();
        openFile('resume-pdf');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    toggleSidebar,
    toggleTerminal,
    activeFileId,
    closeFile,
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    isQuickOpenOpen,
    setIsQuickOpenOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    openFile,
    setMode
  ]);
}
