import React from 'react';
import { 
  FileText, 
  FileCode, 
  FileJson, 
  File, 
  Folder, 
  FolderOpen,
  FileType,
  Terminal,
  Code2
} from 'lucide-react';

interface FileIconProps {
  name: string;
  type?: 'file' | 'folder';
  isOpen?: boolean;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ 
  name, 
  type = 'file', 
  isOpen = false, 
  className = "w-4 h-4" 
}) => {
  if (type === 'folder') {
    return isOpen ? (
      <FolderOpen className={`${className} text-amber-400 fill-amber-400/20`} />
    ) : (
      <Folder className={`${className} text-amber-400 fill-amber-400/20`} />
    );
  }

  const ext = name.split('.').pop()?.toLowerCase();

  switch (ext) {
    case 'tsx':
    case 'jsx':
      return <Code2 className={`${className} text-sky-400`} />;
    case 'ts':
    case 'js':
      return <FileCode className={`${className} text-blue-400`} />;
    case 'json':
      return <FileJson className={`${className} text-yellow-400`} />;
    case 'md':
      return <FileText className={`${className} text-indigo-400`} />;
    case 'pdf':
      return <FileType className={`${className} text-rose-400`} />;
    case 'sh':
      return <Terminal className={`${className} text-emerald-400`} />;
    default:
      return <File className={`${className} text-neutral-400`} />;
  }
};
