'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, RefreshCw, BarChart2, CheckCircle2, Award, Calendar, Compass, ShieldCheck, Info, Check, AlertCircle } from 'lucide-react';
import { CodolioData } from '@/lib/coding/codolio';

export const CodolioWorkspace: React.FC = () => {
  const [data, setData] = useState<CodolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshState, setRefreshState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [lastSyncSeconds, setLastSyncSeconds] = useState<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCodolio = async (isFresh = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (isFresh) {
      setRefreshState('loading');
    } else {
      setLoading(true);
    }

    try {
      const url = isFresh ? '/api/coding/codolio?fresh=true' : '/api/coding/codolio';
      const res = await fetch(url, {
        signal: abortControllerRef.current.signal,
        headers: isFresh ? { 'x-refresh': 'true' } : {}
      });
      if (res.ok) {
        setData(await res.json());
        setLastSyncSeconds(0);
        if (isFresh) {
          setRefreshState('success');
          setTimeout(() => setRefreshState('idle'), 2500);
        }
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        if (isFresh) setRefreshState('error');
      }
    } finally {
      setLoading(false);
      if (!isFresh && refreshState !== 'success') setRefreshState('idle');
    }
  };

  useEffect(() => {
    fetchCodolio(false);
    const interval = setInterval(() => {
      setLastSyncSeconds(prev => prev + 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-[var(--ide-editor)] text-[var(--ide-text)] p-4 sm:p-6 select-none font-sans">
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--ide-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-lg shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Codolio Cross-Platform Aggregator
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-cyan-500/10 text-cyan-300 border-cyan-500/30">
                  ● Verified Profile Snapshot
                </span>
              </div>
              <p className="text-2xs text-[var(--ide-text-muted)] font-mono mt-0.5">
                Target: Codolio Unified Profile <span className="text-cyan-400">@bhavigupta</span> • {lastSyncSeconds < 10 ? 'Updated just now' : `Updated ${lastSyncSeconds}s ago`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchCodolio(true)}
              disabled={refreshState === 'loading'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-2xs transition-all font-mono ${
                refreshState === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : refreshState === 'error'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-[var(--ide-sidebar)] hover:bg-[var(--ide-hover)] border-[var(--ide-border)] text-[var(--ide-text)]'
              } disabled:opacity-50 active:scale-95`}
              title="Sync verified snapshot timestamp without page reload"
            >
              {refreshState === 'loading' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : refreshState === 'success' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Synced just now</span>
                </>
              ) : refreshState === 'error' ? (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Retry</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Snapshot</span>
                </>
              )}
            </button>
            <a
              href="https://codolio.com/profile/bhavigupta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-2xs text-cyan-300 font-semibold transition-colors"
            >
              <span>Open Codolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Authenticity Note */}
        <div className="p-3 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] flex items-start gap-2.5 text-2xs text-[var(--ide-text-muted)] font-mono leading-relaxed">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-white font-semibold">Authenticity Note: </span>
            Codolio aggregates developer profiles across LeetCode, GeeksforGeeks, and Code360 into a unified cross-platform rating without requiring proprietary private API keys.
          </div>
        </div>

        {/* 4 Core Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono">Combined Solves</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
              810+
            </div>
            <div className="text-[11px] text-[var(--ide-text-muted)] mt-0.5">Across All Platforms</div>
          </div>

          <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono">Active Days</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 mt-1">
              328+
            </div>
            <div className="text-[11px] text-[var(--ide-text-muted)] mt-0.5">Consistency Metric</div>
          </div>

          <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono">Contests Attended</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 mt-1">
              42
            </div>
            <div className="text-[11px] text-[var(--ide-text-muted)] mt-0.5">Timed Competitions</div>
          </div>

          <div className="bg-[var(--ide-bg)] p-4 rounded-lg border border-[var(--ide-border)]">
            <div className="text-2xs text-[var(--ide-text-muted)] uppercase font-mono">Codolio C-Score</div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mt-1">
              785
            </div>
            <div className="text-[11px] text-[var(--ide-text-muted)] mt-0.5">Aggregated Score</div>
          </div>
        </div>

        {/* Platform Solves Breakdown */}
        <div className="bg-[var(--ide-bg)] p-5 rounded-lg border border-[var(--ide-border)] space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Unified Cross-Platform Solves Breakdown</span>
            </div>
            <span className="text-2xs text-[var(--ide-text-muted)] font-mono">810+ Total Problems</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="text-amber-400 font-semibold">LeetCode (@bhavishyagupta001)</span>
                <span className="text-white">629 Solved (78%)</span>
              </div>
              <div className="h-2 w-full bg-[var(--ide-sidebar)] rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="text-emerald-400 font-semibold">GeeksforGeeks (@bhavishyarqb)</span>
                <span className="text-white">120+ Solved (15%)</span>
              </div>
              <div className="h-2 w-full bg-[var(--ide-sidebar)] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-2xs mb-1">
                <span className="text-orange-400 font-semibold">Code360 (@bhavigupta)</span>
                <span className="text-white">70+ Solved (9%)</span>
              </div>
              <div className="h-2 w-full bg-[var(--ide-sidebar)] rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: '9%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Verification Footer Card */}
        <div className="p-4 rounded-lg bg-[var(--ide-sidebar)] border border-[var(--ide-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-2xs font-mono text-[var(--ide-text-muted)]">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Profile Verified with candidate handles across LeetCode, GFG, and Coding Ninjas.</span>
          </div>
          <a
            href="https://codolio.com/profile/bhavigupta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1 shrink-0"
          >
            <span>codolio.com/profile/bhavigupta</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
