import { getCachedData, setCachedData, invalidateCache } from './cache';

export interface CodolioData {
  username: string;
  name: string;
  totalQuestions: number;
  activeDays: number;
  contestsAttended: number;
  cScore: number;
  platformBreakdown: {
    leetcode: number;
    gfg: number;
    code360: number;
  };
  dataStatus: 'LIVE' | 'CACHED' | 'SNAPSHOT';
  cacheAgeSeconds?: number;
  lastUpdated: string;
}

const FALLBACK_DATA: CodolioData = {
  username: "bhavigupta",
  name: "Bhavishya Gupta",
  totalQuestions: 800,
  activeDays: 320,
  contestsAttended: 42,
  cScore: 785,
  platformBreakdown: {
    leetcode: 629,
    gfg: 120,
    code360: 70
  },
  dataStatus: 'SNAPSHOT',
  lastUpdated: new Date().toISOString()
};

export async function fetchCodolioProfile(username: string = 'bhavigupta', forceFresh: boolean = false): Promise<CodolioData> {
  const cacheKey = `codolio_${username}`;

  if (forceFresh) {
    invalidateCache(cacheKey);
  } else {
    const cached = getCachedData<CodolioData>(cacheKey, 1000 * 60 * 15);
    if (cached && cached.isFresh) {
      return {
        ...cached.data,
        dataStatus: cached.source === 'live' ? 'CACHED' : 'SNAPSHOT',
        cacheAgeSeconds: cached.ageSeconds
      };
    }
  }

  const freshSnapshot: CodolioData = {
    ...FALLBACK_DATA,
    username,
    dataStatus: 'SNAPSHOT',
    lastUpdated: new Date().toISOString()
  };

  setCachedData(cacheKey, freshSnapshot, 'snapshot');
  return freshSnapshot;
}
