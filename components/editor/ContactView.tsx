'use client';

import React, { useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check, ExternalLink, Send, MapPin, Sparkles } from 'lucide-react';
import { profileData } from '@/data/profile';
import { CodeViewer } from './CodeViewer';

export const ContactView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'interactive' | 'code'>('interactive');

  const contactCode = `// Bhavishya Gupta — Contact Information & Direct Channels
export const contact = {
  name: "${profileData.name}",
  role: "Software Engineer",
  email: "${profileData.email}",
  phone: "${profileData.phone}",
  github: "${profileData.github}",
  linkedin: "${profileData.linkedin}",
  leetcode: "${profileData.leetcode}",
  location: "${profileData.location}",
  status: "Available for SDE Roles & Full Stack Opportunities"
};

export async function sendMessage(inquiry: { name: string; email: string; message: string }) {
  // Direct mailto link or email dispatch
  window.location.href = \`mailto:\${contact.email}?subject=Opportunity from \${inquiry.name}&body=\${inquiry.message}\`;
}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--ide-editor)] text-[var(--ide-text)] overflow-hidden">
      {/* Top Bar */}
      <div className="h-8 bg-[var(--ide-bg)]/80 border-b border-[var(--ide-border)] flex items-center justify-between px-4 text-2xs text-[var(--ide-text-muted)] select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[var(--ide-accent)] font-semibold">contact.ts</span>
          <span>•</span>
          <span>Direct Connection Channels</span>
        </div>

        <div className="flex items-center bg-[var(--ide-sidebar)] rounded p-0.5 border border-[var(--ide-border)]">
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
              viewMode === 'interactive'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
          >
            Interactive Form & Links
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`px-2 py-0.5 rounded text-2xs font-mono transition-colors ${
              viewMode === 'code'
                ? 'bg-[var(--ide-accent)] text-white font-semibold'
                : 'text-[var(--ide-text-muted)] hover:text-white'
            }`}
          >
            TypeScript Code
          </button>
        </div>
      </div>

      {viewMode === 'code' ? (
        <CodeViewer code={contactCode} language="typescript" filename="contact.ts" />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 max-w-3xl mx-auto w-full flex flex-col justify-center">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--ide-text)]">
              Let&apos;s Build Together
            </h1>
            <p className="text-xs md:text-sm text-[var(--ide-text-muted)] mt-1.5 max-w-md mx-auto">
              Open for full-time Software Engineer positions, SDE internships, and engineering discussions.
            </p>
          </div>

          {/* Email Copy Card */}
          <div className="p-4 md:p-5 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[var(--ide-accent)]/10 text-[var(--ide-accent)]">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-mono">Direct Email</div>
                <div className="text-sm md:text-base font-bold font-mono text-[var(--ide-text)]">{profileData.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1.5 rounded bg-[var(--ide-bg)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-xs text-[var(--ide-text)] font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="px-3.5 py-1.5 rounded bg-[var(--ide-accent)] hover:bg-[var(--ide-accent-hover)] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)] hover:border-sky-500/50 hover:bg-[var(--ide-hover)] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-sky-400" />
                <div>
                  <div className="font-semibold text-xs text-[var(--ide-text)]">LinkedIn Profile</div>
                  <div className="text-2xs text-[var(--ide-text-muted)]">Connect for professional inquiries</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--ide-text-muted)] group-hover:text-white" />
            </a>

            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-lg bg-[var(--ide-sidebar)]/80 border border-[var(--ide-border)] hover:border-[var(--ide-accent)] hover:bg-[var(--ide-hover)] flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-white" />
                <div>
                  <div className="font-semibold text-xs text-[var(--ide-text)]">GitHub Codebases</div>
                  <div className="text-2xs text-[var(--ide-text-muted)]">@bhavishyagupta11</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[var(--ide-text-muted)] group-hover:text-white" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
