'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw, Github, Star, GitFork, BookOpen, Users, Code, Activity, AlertCircle, Check } from 'lucide-react';
import { GitHubProfileData } from '@/lib/coding/github';

export const GitHubWorkspace: React.FC = () => {
  const [data, setData] = useState<GitHubProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshState, setRefreshState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const [lastSyncSeconds, setLastSyncSeconds] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchGitHub = async (isFresh = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (isFresh) {
      setRefreshState('loading');
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const url = isFresh ? '/api/github/profile?fresh=true' : '/api/github/profile';
      const res = await fetch(url, {
        signal: abortControllerRef.current.signal,
        headers: isFresh ? { 'x-refresh': 'true' } : {}
      });
      if (!res.ok) throw new Error('Failed to load GitHub data');
      const json = await res.json();
      setData(json);
      setLastSyncSeconds(0);

      if (isFresh) {
        setRefreshState('success');
        setTimeout(() => setRefreshState('idle'), 2500);
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setError(e.message || 'Error fetching GitHub analytics');
        if (isFresh) setRefreshState('error');
      }
    } finally {
      setLoading(false);
      if (!isFresh && refreshState !== 'success') setRefreshState('idle');
    }
  };

  useEffect(() => {
    fetchGitHub(false);
    const interval = setInterval(() => {
      setLastSyncSeconds(prev => prev + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getHeatmapColor = (level: number, count: number) => {
    if (count === 0 || level === 0) return 'bg-[var(--ide-sidebar)] border-[var(--ide-border)]';
    switch (level) {
      case 1: return 'bg-emerald-950 border-emerald-800';
      case 2: return 'bg-emerald-700 border-emerald-600';
      case 3: return 'bg-emerald-500 border-emerald-400';
      case 4: return 'bg-emerald-300 border-emerald-200';
      default: return 'bg-emerald-600 border-emerald-500';
    }
  };

  const renderContributionMatrix = () => {
    if (!data?.heatmapDays || data.heatmapDays.length === 0) {
      return (
        <div className="p-8 text-center text-xs text-[var(--ide-text-muted)] font-mono">
          {loading ? 'Fetching real GitHub contribution calendar...' : 'Contribution calendar currently syncing with GitHub API.'}
        </div>
      );
    }

    return (
      <div className="min-w-[700px]">
        {/* Days Grid: 7 rows x ~53 columns */}
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {data.heatmapDays.map((d, idx) => {
            const formattedDate = new Date(d.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredDay({ date: formattedDate, count: d.count })}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-2.5 h-2.5 rounded-xs border transition-all cursor-pointer hover:scale-125 ${getHeatmapColor(d.level, d.count)}`}
                title={`${d.count} contributions on ${formattedDate}`}
              />
            );
          })}
        </div>

        {/* Footer legend and date range */}
        <div className="flex items-center justify-between mt-3 text-2xs text-[var(--ide-text-muted)] font-mono">
          <span>{data.heatmapDays[0]?.date}</span>
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            <div className="w-2.5 h-2.5 rounded-xs bg-[var(--ide-sidebar)] border border-[var(--ide-border)]" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-950 border border-emerald-800" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-700 border border-emerald-600" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500 border border-emerald-400" />
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-300 border border-emerald-200" />
            <span>More</span>
          </div>
          <span>{data.heatmapDays[data.heatmapDays.length - 1]?.date}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 sm:p-6 select-none font-sans">
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--ide-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] flex items-center justify-center text-white shrink-0">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  GitHub Live Engineering Analytics
                </h1>
                {data && (
                  <span className={`text-2xs font-mono px-2 py-0.5 rounded border ${
                    data.dataStatus === 'LIVE' 
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : data.dataStatus === 'CACHED'
                      ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  }`}>
                    ● {data.dataStatus === 'LIVE' ? 'Profile: Official GitHub REST API | Calendar: Public Contribution Service' : data.dataStatus === 'CACHED' ? `Cached (${Math.round((data.cacheAgeSeconds || 0) / 60)}m ago)` : 'Data Unavailable'}
                  </span>
                )}
              </div>
              <p className="text-2xs text-[var(--ide-text-muted)] font-mono mt-0.5">
                Target: GitHub Profile <span className="text-sky-400">@bhavishyagupta11</span> • Official REST API & Public Contribution Graph • {lastSyncSeconds < 10 ? 'Updated just now' : `Updated ${lastSyncSeconds}s ago`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchGitHub(true)}
              disabled={refreshState === 'loading'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-2xs transition-all font-mono ${
                refreshState === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : refreshState === 'error'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border-[var(--ide-border)] text-[var(--ide-text)]'
              } disabled:opacity-50 active:scale-95`}
              title="Refresh live metrics from GitHub API without page reload"
            >
              {refreshState === 'loading' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Refreshing...</span>
                </>
              ) : refreshState === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Updated just now</span>
                </>
              ) : refreshState === 'error' ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Retry</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/bhavishyagupta11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border border-[var(--ide-border)] text-2xs text-white font-semibold transition-colors"
            >
              <span>Open GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && !data && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-pulse">
            <div className="h-24 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
            <div className="h-24 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
            <div className="h-24 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
            <div className="h-24 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
          </div>
        )}

        {/* Error Fallback */}
        {error && !data && (
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>GitHub API rate limit reached or network unavailable. Click retry to refresh.</span>
            </div>
            <button onClick={() => fetchGitHub(true)} className="px-3 py-1 bg-rose-500/20 rounded">Retry</button>
          </div>
        )}

        {data && (
          <>
            {/* 4-Stat Metrics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[var(--ide-bg)] p-3.5 rounded-lg border border-[var(--ide-border)]">
                <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-sky-400" />
                  <span>Public Repos</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {data.publicRepos}
                </div>
              </div>

              <div className="bg-[var(--ide-bg)] p-3.5 rounded-lg border border-[var(--ide-border)]">
                <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  <span>Year Contributions</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {data.totalContributions}
                </div>
              </div>

              <div className="bg-[var(--ide-bg)] p-3.5 rounded-lg border border-[var(--ide-border)]">
                <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span>Followers</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                  {data.followers}
                </div>
              </div>

              <div className="bg-[var(--ide-bg)] p-3.5 rounded-lg border border-[var(--ide-border)]">
                <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono flex items-center gap-1">
                  <Code className="w-3 h-3 text-purple-400" />
                  <span>Top Language</span>
                </div>
                <div className="text-xl font-bold font-mono text-purple-400 mt-1 truncate">
                  {data.topLanguages[0]?.name || 'TypeScript'}
                </div>
              </div>
            </div>

            {/* REAL 52-Week Contribution Heatmap Panel */}
            <div className="bg-[var(--ide-bg)] p-5 rounded-lg border border-[var(--ide-border)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Real 52-Week Contribution Calendar ({data.totalContributions} total)</span>
                </div>
                {hoveredDay ? (
                  <span className="text-2xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    {hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''} on {hoveredDay.date}
                  </span>
                ) : (
                  <span className="text-2xs text-[var(--ide-text-muted)] font-mono">
                    Hover over any day square to inspect real contributions
                  </span>
                )}
              </div>

              {/* Heatmap Grid Container */}
              <div className="p-3 bg-[var(--ide-sidebar)] rounded border border-[var(--ide-border)] overflow-x-auto">
                {renderContributionMatrix()}
              </div>
            </div>

            {/* Top Languages Distribution */}
            {data.topLanguages && data.topLanguages.length > 0 && (
              <div className="bg-[var(--ide-bg)] p-5 rounded-lg border border-[var(--ide-border)] space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Repository Language Distribution</span>
                  <span className="text-2xs text-[var(--ide-text-muted)] font-mono">Computed from {data.publicRepos} public repositories</span>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-[var(--ide-sidebar)]">
                  {data.topLanguages.map((l, idx) => (
                    <div
                      key={idx}
                      style={{ width: `${l.percentage}%`, backgroundColor: l.color }}
                      title={`${l.name}: ${l.percentage}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 pt-1 text-2xs font-mono">
                  {data.topLanguages.map((l, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                      <span className="text-white font-medium">{l.name}</span>
                      <span className="text-[var(--ide-text-muted)]">{l.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pinned Repositories Grid */}
            {data.recentRepos && data.recentRepos.length > 0 && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Public Repositories
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.recentRepos.map((repo, idx) => (
                    <a
                      key={idx}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-lg bg-[var(--ide-bg)] border border-[var(--ide-border)] hover:border-[var(--ide-accent)] transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-sm font-semibold text-[var(--ide-accent)] group-hover:underline">
                          <span className="truncate">{repo.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 shrink-0" />
                        </div>
                        <p className="text-xs text-[var(--ide-text-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-[var(--ide-border)]/50 text-2xs font-mono text-[var(--ide-text-muted)]">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-sky-400" />
                          <span>{repo.language}</span>
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3" />
                            <span>{repo.stars}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            <span>{repo.forks}</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
