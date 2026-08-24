import { CodingProfile } from '@/types';

export const codingPlatformsMetadata = [
  {
    platform: "LeetCode",
    handle: "bhavishyagupta001",
    url: "https://leetcode.com/u/bhavishyagupta001/",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    verifiedFallback: {
      totalSolved: 600,
      easy: 170,
      medium: 285,
      hard: 95,
      ranking: "Top 13%",
      contestRating: 1779,
      streak: 260,
      acceptanceRate: "62.4%"
    }
  },
  {
    platform: "GeeksforGeeks",
    handle: "bhavishyarqb",
    url: "https://www.geeksforgeeks.org/profile/bhavishyarqb",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    verifiedFallback: {
      totalSolved: 120,
      codingScore: 380,
      instituteRank: "Top Tier",
      podSolved: 90
    }
  },
  {
    platform: "Code360 by Coding Ninjas",
    handle: "bhavigupta",
    url: "https://www.naukri.com/code360/profile/bhavigupta",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    verifiedFallback: {
      totalSolved: 70,
      rating: 1506,
      rank: "Master",
      ninjaStreak: 45
    }
  },
  {
    platform: "Codolio",
    handle: "bhavigupta",
    url: "https://codolio.com/profile/bhavigupta",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
    verifiedFallback: {
      totalQuestions: 800,
      activeDays: 320,
      contestsAttended: 42,
      cScore: 785
    }
  }
];

export const codingProfiles: CodingProfile[] = [
  {
    platform: "LeetCode",
    handle: "bhavishyagupta001",
    url: "https://leetcode.com/u/bhavishyagupta001/",
    stats: [
      { label: "Problems Solved", value: "600+" },
      { label: "Contest Rating", value: "1779" },
      { label: "Global Standing", value: "Top 13%" },
      { label: "Max Streak", value: "260+ Days" }
    ]
  },
  {
    platform: "GeeksforGeeks",
    handle: "bhavishyarqb",
    url: "https://www.geeksforgeeks.org/profile/bhavishyarqb",
    stats: [
      { label: "Problems Solved", value: "120+" },
      { label: "Coding Score", value: "380+" }
    ]
  },
  {
    platform: "Code360",
    handle: "bhavigupta",
    url: "https://www.naukri.com/code360/profile/bhavigupta",
    stats: [
      { label: "Problems Solved", value: "70+" },
      { label: "Contest Rating", value: "1506" }
    ]
  },
  {
    platform: "Codolio",
    handle: "bhavigupta",
    url: "https://codolio.com/profile/bhavigupta",
    stats: [
      { label: "Combined Solves", value: "800+" },
      { label: "Active Days", value: "320+" }
    ]
  }
];
