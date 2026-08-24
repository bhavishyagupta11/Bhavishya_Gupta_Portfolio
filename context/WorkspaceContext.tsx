'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { WorkspaceMode, ThemeName, ActivityTab, FileItem } from '@/types';
import { virtualFileSystem, getAllFiles, findFileByPath, findFileById } from '@/data/fileSystem';

interface WorkspaceContextType {
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  activeActivityTab: ActivityTab;
  setActiveActivityTab: (tab: ActivityTab) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  isTerminalOpen: boolean;
  setIsTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTerminal: () => void;
  openFileIds: string[];
  activeFileId: string;
  openFile: (fileOrPath: string | FileItem) => void;
  closeFile: (fileId: string) => void;
  closeOtherFiles: (fileId: string) => void;
  closeAllFiles: () => void;
  setActiveFileId: (fileId: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isQuickOpenOpen: boolean;
  setIsQuickOpenOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSettingsOpen: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeFileItem: FileItem | undefined;
  projectTabMode: 'code' | 'preview' | 'architecture';
  setProjectTabMode: (mode: 'code' | 'preview' | 'architecture') => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<WorkspaceMode>('developer');
  const [theme, setThemeState] = useState<ThemeName>('dark-plus');
  const [activeActivityTab, setActiveActivityTab] = useState<ActivityTab>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [openFileIds, setOpenFileIds] = useState<string[]>([
    'readme-md',
    'scholrboard-tsx'
  ]);
  const [activeFileId, setActiveFileId] = useState<string>('readme-md');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isQuickOpenOpen, setIsQuickOpenOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [projectTabMode, setProjectTabMode] = useState<'code' | 'preview' | 'architecture'>('preview');

  // Sync theme with document element and localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('bg-theme') as ThemeName;
    if (savedTheme && ['dark-plus', 'midnight', 'light-plus'].includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark-plus');
    }

    const savedMode = localStorage.getItem('bg-mode') as WorkspaceMode;
    if (savedMode && ['developer', 'recruiter', 'terminal'].includes(savedMode)) {
      setModeState(savedMode);
    }
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem('bg-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setMode = (newMode: WorkspaceMode) => {
    setModeState(newMode);
    localStorage.setItem('bg-mode', newMode);
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleTerminal = () => setIsTerminalOpen(prev => !prev);

  const openFile = (fileOrPath: string | FileItem) => {
    let targetItem: FileItem | undefined;
    if (typeof fileOrPath === 'string') {
      targetItem = findFileById(fileOrPath) || findFileByPath(fileOrPath);
    } else {
      targetItem = fileOrPath;
    }

    if (!targetItem || targetItem.type === 'folder') return;

    if (!openFileIds.includes(targetItem.id)) {
      setOpenFileIds(prev => [...prev, targetItem!.id]);
    }
    setActiveFileId(targetItem.id);
  };

  const closeFile = (fileIdToClose: string) => {
    const newOpenFiles = openFileIds.filter(id => id !== fileIdToClose);
    setOpenFileIds(newOpenFiles);

    if (activeFileId === fileIdToClose) {
      if (newOpenFiles.length > 0) {
        setActiveFileId(newOpenFiles[newOpenFiles.length - 1]);
      } else {
        setActiveFileId('');
      }
    }
  };

  const closeOtherFiles = (keepFileId: string) => {
    setOpenFileIds([keepFileId]);
    setActiveFileId(keepFileId);
  };

  const closeAllFiles = () => {
    setOpenFileIds([]);
    setActiveFileId('');
  };

  const activeFileItem = findFileById(activeFileId);

  return (
    <WorkspaceContext.Provider
      value={{
        mode,
        setMode,
        theme,
        setTheme,
        activeActivityTab,
        setActiveActivityTab,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        isTerminalOpen,
        setIsTerminalOpen,
        toggleTerminal,
        openFileIds,
        activeFileId,
        openFile,
        closeFile,
        closeOtherFiles,
        closeAllFiles,
        setActiveFileId,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isQuickOpenOpen,
        setIsQuickOpenOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        activeFileItem,
        projectTabMode,
        setProjectTabMode
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
