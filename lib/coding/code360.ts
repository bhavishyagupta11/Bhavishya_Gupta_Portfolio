import { getCachedData, setCachedData, invalidateCache } from './cache';

export interface Code360Data {
  username: string;
  name: string;
  totalSolved: number;
  rating: number;
  rankBadge: string;
  ninjaStreak: number;
  practiceTracks: Array<{
    track: string;
    completedCount: number;
  }>;
  recentProblems: Array<{
    title: string;
    level: string;
  }>;
  dataStatus: 'LIVE' | 'CACHED' | 'SNAPSHOT';
  cacheAgeSeconds?: number;
  lastUpdated: string;
}

const FALLBACK_DATA: Code360Data = {
  username: "bhavigupta",
  name: "Bhavishya Gupta",
  totalSolved: 70,
  rating: 1506,
  rankBadge: "Master Ninja",
  ninjaStreak: 45,
  practiceTracks: [
    { track: "Data Structures Mastery", completedCount: 38 },
    { track: "Dynamic Programming & Recursion", completedCount: 18 },
    { track: "Graph Algorithms", completedCount: 14 }
  ],
  recentProblems: [
    { title: "N Queens Problem", level: "Hard" },
    { title: "Longest Increasing Subsequence", level: "Medium" },
    { title: "Matrix Chain Multiplication", level: "Hard" },
    { title: "Cycle Detection in Undirected Graph", level: "Medium" }
  ],
  dataStatus: 'SNAPSHOT',
  lastUpdated: new Date().toISOString()
};

export async function fetchCode360Profile(username: string = 'bhavigupta', forceFresh: boolean = false): Promise<Code360Data> {
  const cacheKey = `code360_${username}`;

  if (forceFresh) {
    invalidateCache(cacheKey);
  } else {
    const cached = getCachedData<Code360Data>(cacheKey, 1000 * 60 * 15);
    if (cached && cached.isFresh) {
      return {
        ...cached.data,
        dataStatus: cached.source === 'live' ? 'CACHED' : 'SNAPSHOT',
        cacheAgeSeconds: cached.ageSeconds
      };
    }
  }

  const freshSnapshot: Code360Data = {
    ...FALLBACK_DATA,
    username,
    dataStatus: 'SNAPSHOT',
    lastUpdated: new Date().toISOString()
  };

  setCachedData(cacheKey, freshSnapshot, 'snapshot');
  return freshSnapshot;
}
