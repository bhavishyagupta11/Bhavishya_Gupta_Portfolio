import { getCachedData, setCachedData, invalidateCache } from './cache';

export interface GitHubDayContribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubProfileData {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
  totalStars: number;
  totalContributions: number;
  topLanguages: Array<{ name: string; percentage: number; color: string }>;
  recentRepos: Array<{
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    updatedAt: string;
    url: string;
    topics: string[];
  }>;
  heatmapDays: GitHubDayContribution[];
  dataStatus: 'LIVE' | 'CACHED' | 'UNAVAILABLE';
  cacheAgeSeconds?: number;
  lastUpdated: string;
}

export async function fetchGitHubProfile(username: string = 'bhavishyagupta11', forceFresh: boolean = false): Promise<GitHubProfileData> {
  const cacheKey = `github_real_${username}`;

  if (forceFresh) {
    invalidateCache(cacheKey);
  } else {
    const cached = getCachedData<GitHubProfileData>(cacheKey, 1000 * 60 * 15); // 15 min TTL
    if (cached && cached.isFresh) {
      return {
        ...cached.data,
        dataStatus: cached.source === 'live' ? 'CACHED' : 'UNAVAILABLE',
        cacheAgeSeconds: cached.ageSeconds
      };
    }
  }

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'BG-Studio-Real-Portfolio-Audit'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    // 1. Fetch GitHub User Profile
    const userPromise = fetch(`https://api.github.com/users/${username}`, { headers, signal: controller.signal });
    
    // 2. Fetch GitHub Repos
    const reposPromise = fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`, { headers, signal: controller.signal });
    
    // 3. Fetch Real GitHub Contribution Calendar Data
    const contribPromise = fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: { 'User-Agent': 'BG-Studio-Real-Portfolio-Audit' },
      signal: controller.signal
    });

    const [userRes, reposRes, contribRes] = await Promise.allSettled([userPromise, reposPromise, contribPromise]);
    clearTimeout(timeoutId);

    if (userRes.status === 'fulfilled' && userRes.value.ok) {
      const user = await userRes.value.json();

      let repos: any[] = [];
      if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
        repos = await reposRes.value.json();
      }

      // Compute stars and language breakdown from real repos
      let totalStars = 0;
      const langCounts: Record<string, number> = {};

      repos.forEach(r => {
        totalStars += r.stargazers_count || 0;
        if (r.language) {
          langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
      });

      const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
      const langColors: Record<string, string> = {
        TypeScript: "#3178c6",
        JavaScript: "#f7df1e",
        Python: "#3572A5",
        "C++": "#f34b7d",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Go: "#00ADD8",
        "C#": "#178600"
      };

      const topLanguages = Object.entries(langCounts)
        .map(([name, count]) => ({
          name,
          percentage: Math.round((count / totalLangs) * 100),
          color: langColors[name] || '#8b949e'
        }))
        .sort((a, b) => b.percentage - a.percentage);

      // Extract real contribution calendar days
      let heatmapDays: GitHubDayContribution[] = [];
      let totalContributions = 0;

      if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
        const contribData = await contribRes.value.json();
        totalContributions = contribData.total?.lastYear || 0;
        if (Array.isArray(contribData.contributions)) {
          heatmapDays = contribData.contributions.map((c: any) => ({
            date: c.date,
            count: c.count || 0,
            level: (c.level >= 0 && c.level <= 4 ? c.level : 0) as 0 | 1 | 2 | 3 | 4
          }));
        }
      }

      const liveData: GitHubProfileData = {
        username: user.login,
        name: user.name || 'Bhavishya Gupta',
        avatar: user.avatar_url,
        bio: user.bio || 'Aspiring Software Developer',
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        createdAt: user.created_at,
        totalStars,
        totalContributions,
        topLanguages,
        recentRepos: repos.slice(0, 6).map(r => ({
          name: r.name,
          description: r.description || 'Public engineering repository',
          language: r.language || 'Code',
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          updatedAt: r.updated_at,
          url: r.html_url,
          topics: r.topics || []
        })),
        heatmapDays,
        dataStatus: 'LIVE',
        lastUpdated: new Date().toISOString()
      };

      setCachedData(cacheKey, liveData, 'live');
      return liveData;
    }
  } catch (error) {
    // Return unavailable on true network error
  }

  return {
    username: "bhavishyagupta11",
    name: "Bhavishya Gupta",
    avatar: "https://avatars.githubusercontent.com/u/185625224?v=4",
    bio: "Software Engineer • Full Stack Developer • AI/ML Enthusiast",
    publicRepos: 19,
    followers: 0,
    following: 2,
    createdAt: "2024-10-19T16:19:05Z",
    totalStars: 14,
    totalContributions: 720,
    topLanguages: [
      { name: "JavaScript", percentage: 36, color: "#f7df1e" },
      { name: "TypeScript", percentage: 18, color: "#3178c6" },
      { name: "C++", percentage: 9, color: "#f34b7d" },
      { name: "HTML", percentage: 9, color: "#e34c26" }
    ],
    recentRepos: [],
    heatmapDays: [],
    dataStatus: 'UNAVAILABLE',
    lastUpdated: new Date().toISOString()
  };
}
