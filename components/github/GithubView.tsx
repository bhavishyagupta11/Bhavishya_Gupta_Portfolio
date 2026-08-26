'use client';

import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, ExternalLink, Activity, BookOpen, Users, Wifi } from 'lucide-react';
import { profileData } from '@/data/profile';
import { projectsData } from '@/data/projects';

export const GithubView: React.FC = () => {
  const [stats, setStats] = useState<{ repos: number; followers: number } | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    // Fetch GitHub public user metadata through server route
    fetch('/api/github/profile')
      .then(res => res.json())
      .then(data => {
        if (data.publicRepos !== undefined) {
          setStats({
            repos: data.publicRepos,
            followers: data.followers
          });
          setIsLive(data.dataStatus === 'LIVE');
        }
      })
      .catch(() => {
        setStats({ repos: 19, followers: 0 });
        setIsLive(false);
      });
  }, []);

  return (
    <div className="flex flex-col h-full bg-[var(--ide-sidebar)] text-xs select-none overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-[var(--ide-border)]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold">
            GITHUB OVERVIEW
          </span>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-[var(--ide-accent)] hover:underline"
          >
            <span>Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Profile mini-card */}
        <div className="bg-[var(--ide-bg)] p-3 rounded border border-[var(--ide-border)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] flex items-center justify-center font-bold text-white text-xs font-mono">
              BG
            </div>
            <div>
              <div className="font-semibold text-[var(--ide-text)]">{profileData.name}</div>
              <div className="text-2xs text-[var(--ide-text-muted)] font-mono">@{profileData.handle}</div>
            </div>
          </div>

          <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border flex items-center gap-1 ${
            isLive ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-[var(--ide-sidebar)] text-[var(--ide-text-muted)] border-[var(--ide-border)]'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-neutral-400'}`} />
            <span>{isLive ? 'Live API' : 'Snapshot'}</span>
          </span>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-[var(--ide-bg)] p-2 rounded border border-[var(--ide-border)]">
            <div className="text-[10px] text-[var(--ide-text-muted)] uppercase flex items-center gap-1">
              <BookOpen className="w-3 h-3 text-sky-400" />
              <span>Public Repos</span>
            </div>
            <div className="text-sm font-bold text-[var(--ide-text)] mt-0.5">
              {stats ? stats.repos : '15+'}
            </div>
          </div>
          <div className="bg-[var(--ide-bg)] p-2 rounded border border-[var(--ide-border)]">
            <div className="text-[10px] text-[var(--ide-text-muted)] uppercase flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" />
              <span>Followers</span>
            </div>
            <div className="text-sm font-bold text-[var(--ide-text)] mt-0.5">
              {stats ? stats.followers : 'Active'}
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Heatmap Preview */}
      <div className="p-3 border-b border-[var(--ide-border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>Contribution Heatmap</span>
          </span>
        </div>
        <div className="bg-[var(--ide-bg)] p-2 rounded border border-[var(--ide-border)] overflow-x-auto">
          <img 
            src="https://ghchart.rshah.org/00d4ff/bhavishyagupta11" 
            alt="GitHub contribution chart"
            className="w-full min-w-[240px] opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      </div>

      {/* Top Repositories */}
      <div className="p-3">
        <span className="text-2xs uppercase tracking-wider text-[var(--ide-text-muted)] font-bold block mb-2">
          TOP REPOSITORIES
        </span>
        <div className="space-y-2">
          {projectsData.map(p => (
            <a
              key={p.id}
              href={p.githubUrl || profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 rounded bg-[var(--ide-bg)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)] transition-all group"
            >
              <div className="flex items-center justify-between font-semibold text-[var(--ide-accent)] group-hover:underline">
                <span className="truncate">{p.id}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 shrink-0" />
              </div>
              <p className="text-[11px] text-[var(--ide-text-muted)] line-clamp-2 mt-1 leading-snug">
                {p.tagline}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[10px] text-[var(--ide-text-muted)] font-mono">
                <span className="flex items-center gap-0.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  {p.category}
                </span>
                <span>•</span>
                <span>{p.year}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
