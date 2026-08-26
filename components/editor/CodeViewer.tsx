'use client';

import React, { useState } from 'react';
import { Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

interface CodeViewerProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ 
  code, 
  language = 'typescript', 
  filename = 'source.ts' 
}) => {
  const [copied, setCopied] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  // Token highlighter for keywords, strings, comments, and types
  const highlightLine = (line: string) => {
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
      return <span className="text-[var(--syn-comment)] italic">{line}</span>;
    }

    const parts = line.split(/(\b(?:import|export|from|const|let|var|function|return|async|await|interface|type|class|def|self|if|else|for|while|new|try|catch|true|false|null|undefined)\b|"[^"]*"|'[^']*'|`[^`]*`|\/\/.*)/g);

    return parts.map((part, idx) => {
      if (!part) return null;

      if (part.startsWith('//')) {
        return <span key={idx} className="text-[var(--syn-comment)] italic">{part}</span>;
      }
      if ((part.startsWith('"') && part.endsWith('"')) || 
          (part.startsWith("'") && part.endsWith("'")) || 
          (part.startsWith('`') && part.endsWith('`'))) {
        return <span key={idx} className="text-[var(--syn-string)]">{part}</span>;
      }
      if (/^(import|export|from|const|let|var|function|return|async|await|interface|type|class|def|self|if|else|for|while|new|try|catch)$/.test(part)) {
        return <span key={idx} className="text-[var(--syn-keyword)] font-semibold">{part}</span>;
      }
      if (/^(true|false|null|undefined)$/.test(part)) {
        return <span key={idx} className="text-[var(--syn-number)]">{part}</span>;
      }
      if (/^\d+$/.test(part)) {
        return <span key={idx} className="text-[var(--syn-number)]">{part}</span>;
      }
      if (/^[A-Z][a-zA-Z0-9_]*$/.test(part)) {
        return <span key={idx} className="text-[var(--syn-type)]">{part}</span>;
      }

      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] font-mono text-xs overflow-hidden relative">
      {/* Code Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-1.5 bg-[var(--ide-bg)]/80 border-b border-[var(--ide-border)] text-2xs text-[var(--ide-text-muted)] select-none shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[var(--ide-text)] font-medium">
            <FileCode className="w-3.5 h-3.5 text-[var(--ide-accent)]" />
            <span>{filename}</span>
          </div>
          <span className="opacity-60">• {lines.length} lines</span>
          <span className="hidden sm:inline text-2xs text-[var(--ide-text-muted)] font-mono">
            • Representative Source
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-[var(--ide-text)] transition-colors"
          title="Copy Source Code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Lines Container */}
      <div className="flex-1 overflow-auto py-2 allow-select">
        <div className="min-w-full inline-block">
          {lines.map((line, index) => {
            const lineNum = index + 1;
            const isHovered = activeLine === lineNum;

            return (
              <div
                key={lineNum}
                onMouseEnter={() => setActiveLine(lineNum)}
                onMouseLeave={() => setActiveLine(null)}
                className={`flex leading-relaxed px-4 transition-colors ${
                  isHovered ? 'bg-[var(--ide-hover)]' : ''
                }`}
              >
                {/* Line Number Gutter */}
                <div className="w-10 select-none text-right pr-4 text-[var(--ide-text-muted)] opacity-60 text-2xs">
                  {lineNum}
                </div>

                {/* Line Code Content */}
                <div className="flex-1 whitespace-pre font-mono">
                  {highlightLine(line)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
