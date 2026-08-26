import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw, CheckCircle2, TrendingUp, Code2, Calendar, AlertCircle, Check } from 'lucide-react';
import { LeetCodeData } from '@/lib/coding/leetcode';

export const LeetCodeWorkspace: React.FC = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshState, setRefreshState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lastSyncSeconds, setLastSyncSeconds] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async (isFresh = false) => {
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
      const url = isFresh ? '/api/coding/leetcode?fresh=true' : '/api/coding/leetcode';
      const res = await fetch(url, {
        signal: abortControllerRef.current.signal,
        headers: isFresh ? { 'x-refresh': 'true' } : {}
      });
      if (!res.ok) throw new Error('Failed to load LeetCode data');
      const json = await res.json();
      setData(json);
      setLastSyncSeconds(0);

      if (isFresh) {
        setRefreshState('success');
        setTimeout(() => setRefreshState('idle'), 2500);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Error fetching LeetCode data');
        if (isFresh) setRefreshState('error');
      }
    } finally {
      setLoading(false);
      if (!isFresh && refreshState !== 'success') setRefreshState('idle');
    }
  };

  useEffect(() => {
    fetchData(false);
    const interval = setInterval(() => {
      setLastSyncSeconds(prev => prev + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalQuestions = data?.totalQuestions || 3300;
  const easyRatio = data ? Math.min(100, Math.round((data.easySolved / 800) * 100)) : 0;
  const medRatio = data ? Math.min(100, Math.round((data.mediumSolved / 1600) * 100)) : 0;
  const hardRatio = data ? Math.min(100, Math.round((data.hardSolved / 700) * 100)) : 0;

  return (
    <div className="h-full overflow-y-auto bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 sm:p-6 select-none font-sans">
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Top Header & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--ide-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[var(--ide-sidebar)] border border-[var(--ide-border)] flex items-center justify-center font-bold text-amber-400 text-sm font-mono shrink-0">
              LC
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  LeetCode Analytics & Problem Solving
                </h1>
                {data && (
                  <span className={`text-2xs font-mono px-2 py-0.5 rounded border ${
                    data.dataStatus === 'LIVE' 
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}>
                    ● {data.dataStatus === 'LIVE' ? 'LIVE (Official GraphQL)' : 'Candidate Snapshot'}
                  </span>
                )}
              </div>
              <p className="text-2xs text-[var(--ide-text-muted)] font-mono mt-0.5">
                Target: LeetCode Handle <span className="text-amber-400">@bhavishyagupta001</span> • {lastSyncSeconds < 10 ? 'Updated just now' : `Updated ${lastSyncSeconds}s ago`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchData(true)}
              disabled={refreshState === 'loading'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-2xs transition-all font-mono ${
                refreshState === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : refreshState === 'error'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border-[var(--ide-border)] text-[var(--ide-text)]'
              } disabled:opacity-50 active:scale-95`}
              title="Refresh live data from LeetCode GraphQL without reloading page"
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
              href="https://leetcode.com/u/bhavishyagupta001/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-2xs text-amber-300 font-semibold transition-colors"
            >
              <span>Open Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && !data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
            <div className="h-44 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
            <div className="h-44 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
            <div className="h-44 bg-[var(--ide-sidebar)] rounded-lg border border-[var(--ide-border)]" />
          </div>
        )}

        {/* Error Fallback */}
        {error && !data && (
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Live LeetCode API temporarily unreachable. Click retry to query snapshot.</span>
            </div>
            <button onClick={() => fetchData(true)} className="px-3 py-1 bg-rose-500/20 rounded text-xs">Retry</button>
          </div>
        )}

        {data && (
          <>
            {/* Core Metrics 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Total Problems Solved */}
              <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)] relative overflow-hidden">
                <div className="flex items-center justify-between text-2xs text-[var(--ide-text-muted)] font-mono uppercase tracking-wider mb-2">
                  <span>Problems Solved</span>
                  <Code2 className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-white tracking-tight">
                    {data.totalSolved}
                  </span>
                  <span className="text-xs text-[var(--ide-text-muted)] font-mono">
                    / {totalQuestions} Solved
                  </span>
                </div>

                {/* Breakdown Sliders */}
                <div className="space-y-2 mt-4 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-2xs mb-1">
                      <span className="text-emerald-400">Easy</span>
                      <span className="text-white font-semibold">{data.easySolved}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--ide-sidebar)] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${easyRatio}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-2xs mb-1">
                      <span className="text-amber-400">Medium</span>
                      <span className="text-white font-semibold">{data.mediumSolved}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--ide-sidebar)] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${medRatio}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-2xs mb-1">
                      <span className="text-rose-400">Hard</span>
                      <span className="text-white font-semibold">{data.hardSolved}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[var(--ide-sidebar)] rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${hardRatio}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Contest Rating & Standing */}
              <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-2xs text-[var(--ide-text-muted)] font-mono uppercase tracking-wider mb-2">
                    <span>Contest Performance</span>
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-amber-400 tracking-tight">
                      {data.contestRating}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-semibold">
                      {data.contestGlobalStanding}
                    </span>
                  </div>
                  <p className="text-2xs text-[var(--ide-text-muted)] mt-1 font-mono">
                    Global Contest Rank: #{typeof data.contestRanking === 'number' ? data.contestRanking.toLocaleString() : data.contestRanking}
                  </p>
                </div>

                <div className="bg-[var(--ide-sidebar)] p-3 rounded border border-[var(--ide-border)] mt-4">
                  <div className="flex items-center justify-between text-2xs">
                    <span className="text-[var(--ide-text-muted)]">Acceptance Rate:</span>
                    <span className="text-white font-mono font-semibold">{data.acceptanceRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-2xs mt-1.5">
                    <span className="text-[var(--ide-text-muted)]">Global Ranking:</span>
                    <span className="text-white font-mono font-semibold">#{data.ranking}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Consistency & Active Streak */}
              <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-2xs text-[var(--ide-text-muted)] font-mono uppercase tracking-wider mb-2">
                    <span>Problem Solving Streak</span>
                    <Calendar className="w-4 h-4 text-[var(--ide-accent)]" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-mono text-orange-400 tracking-tight">
                      {data.currentStreak || data.streak || 328}
                    </span>
                    <span className="text-xs text-[var(--ide-text-muted)] font-mono">
                      Current Days (IST)
                    </span>
                  </div>
                  <p className="text-2xs text-[var(--ide-text-muted)] mt-1 font-mono">
                    Latest activity: Aug 23, 2026 (IST) • Continuous unbroken daily solves.
                  </p>
                </div>

                <div className="bg-[var(--ide-sidebar)] p-2.5 rounded border border-[var(--ide-border)] text-2xs font-mono space-y-1 mt-4">
                  <div className="flex items-center justify-between text-[var(--ide-text-muted)]">
                    <span>Longest Streak:</span>
                    <span className="text-amber-300 font-semibold">{data.longestStreak || 328} Days</span>
                  </div>
                  <div className="flex items-center justify-between text-[var(--ide-text-muted)]">
                    <span>Total Active Days:</span>
                    <span className="text-emerald-300 font-semibold">{data.totalActiveDays || 363} Days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Algorithmic Performance Analysis */}
            <div className="bg-[var(--ide-bg)] p-5 rounded-lg border border-[var(--ide-border)] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[var(--ide-accent)]" />
                <span>Algorithmic Profile Analysis</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--ide-text-muted)] leading-relaxed">
                <div className="space-y-2">
                  <div className="text-[var(--ide-text)] font-semibold text-2xs font-mono uppercase text-amber-300">
                    // Difficulty Distribution & Depth
                  </div>
                  <p>
                    With over <span className="text-white font-semibold font-mono">{data.mediumSolved} Medium</span> and <span className="text-white font-semibold font-mono">{data.hardSolved} Hard</span> problems solved, Bhavishya’s problem-solving focuses on complex algorithmic patterns including Graph traversals, Dynamic Programming state machines, and Binary Search boundary logic.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-[var(--ide-text)] font-semibold text-2xs font-mono uppercase text-sky-300">
                    // Contest Rating Significance
                  </div>
                  <p>
                    A peak contest rating of <span className="text-white font-semibold font-mono">{data.contestRating}</span> places this profile in the <span className="text-emerald-400 font-semibold">{data.contestGlobalStanding}</span> of all global competitors, demonstrating strong speed and accuracy under timed competition conditions.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Accepted Problems Table */}
            {data.recentSubmissions && data.recentSubmissions.length > 0 && (
              <div className="bg-[var(--ide-bg)] rounded-lg border border-[var(--ide-border)] overflow-hidden">
                <div className="p-3 bg-[var(--ide-sidebar)] border-b border-[var(--ide-border)] flex items-center justify-between text-2xs text-[var(--ide-text-muted)] font-mono uppercase">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Recent Accepted Submissions</span>
                  </span>
                  <span>Language / Timestamp</span>
                </div>
                <div className="divide-y divide-[var(--ide-border)]">
                  {data.recentSubmissions.map((sub, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between hover:bg-[var(--ide-hover)] transition-colors text-xs font-mono">
                      <div className="flex items-center gap-2 text-white">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-medium truncate">{sub.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-2xs text-[var(--ide-text-muted)] shrink-0">
                        <span className="px-1.5 py-0.5 rounded bg-[var(--ide-sidebar)] text-sky-400 border border-[var(--ide-border)]">
                          {sub.language || 'C++'}
                        </span>
                        <span className="hidden sm:inline">
                          {new Date(sub.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
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
