// In-memory cache store with TTL, stale-while-revalidate, and explicit invalidation

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  source: 'live' | 'snapshot';
}

const memoryCache = new Map<string, CacheEntry<any>>();

export function getCachedData<T>(key: string, ttlMs: number = 300000): { data: T; isFresh: boolean; ageSeconds: number; source: 'live' | 'snapshot' } | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;

  const now = Date.now();
  const ageMs = now - entry.timestamp;
  const isFresh = ageMs < ttlMs;

  return {
    data: entry.data as T,
    isFresh,
    ageSeconds: Math.floor(ageMs / 1000),
    source: entry.source
  };
}

export function setCachedData<T>(key: string, data: T, source: 'live' | 'snapshot' = 'live'): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
    source
  });
}

export function invalidateCache(key?: string): void {
  if (key) {
    memoryCache.delete(key);
  } else {
    memoryCache.clear();
  }
}
