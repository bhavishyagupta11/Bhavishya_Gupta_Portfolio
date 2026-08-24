export interface AchievementItem {
  id: string;
  category: 'Competition' | 'Certification' | 'Leadership' | 'Milestone';
  title: string;
  issuerOrEvent: string;
  dateOrYear: string;
  description: string;
  badge?: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: "codehunt-winner",
    category: "Competition",
    title: "1st Place Winner — CodeHunt",
    issuerOrEvent: "Inter-College Coding Championship",
    dateOrYear: "2024",
    description: "Ranked 1st among 25 competitive programming teams by solving algorithmic challenges under strict time constraints.",
    badge: "🏆 1st of 25 Teams"
  },
  {
    id: "codeathon-finalist",
    category: "Competition",
    title: "Top 10 Finalist — CodeAThon 1.0",
    issuerOrEvent: "Regional Coding Hackathon",
    dateOrYear: "2024",
    description: "Advanced to the Top 10 finalist pool out of 500+ student participants after multi-round algorithmic and development assessments.",
    badge: "🏅 Top 10 of 500+"
  },
  {
    id: "dsa-810",
    category: "Milestone",
    title: "810+ Verified DSA Problems Solved",
    issuerOrEvent: "LeetCode, GeeksForGeeks, Code360",
    dateOrYear: "2024 - 2026",
    description: "Demonstrated sustained problem-solving discipline with 629 solved on LeetCode (1779 contest rating, 328-day streak), 120+ on GFG, and 70+ on Code360.",
    badge: "⚡ 810+ Solved"
  },
  {
    id: "servicenow-csa-cad",
    category: "Certification",
    title: "ServiceNow CSA & CAD Certified",
    issuerOrEvent: "ServiceNow, Jaipur (Virtual)",
    dateOrYear: "Jun 2026",
    description: "Certified System Administrator (CSA) and Certified Application Developer (CAD) credentials validating enterprise application architecture.",
    badge: "📜 Certified (Jun 2026)"
  },
  {
    id: "mckinsey-forward",
    category: "Certification",
    title: "McKinsey Forward Program (Certified)",
    issuerOrEvent: "McKinsey & Company",
    dateOrYear: "Jun 2026",
    description: "Selected and graduated from the competitive McKinsey Forward program focusing on structured problem-solving, digital agility, and leadership.",
    badge: "💼 Certified (Jun 2026)"
  },
  {
    id: "samatrix-ai",
    category: "Certification",
    title: "Foundation of AI & Data Science Suite",
    issuerOrEvent: "Samatrix.io, Jaipur",
    dateOrYear: "2023 - 2026",
    description: "Completed comprehensive certifications covering Probability Modeling & Statistics, Deep Learning, and Neural Networks.",
    badge: "🧠 AI Certified"
  },
  {
    id: "gcp-foundation",
    category: "Certification",
    title: "Google Cloud Computing Foundation",
    issuerOrEvent: "Google Cloud",
    dateOrYear: "2024",
    description: "Completed foundation training in cloud infrastructure, compute engines, storage buckets, and IAM security principles.",
    badge: "☁️ Cloud"
  },
  {
    id: "nptel-elite",
    category: "Certification",
    title: "NPTEL — Forests & Management (Elite 99/100)",
    issuerOrEvent: "NPTEL / IIT",
    dateOrYear: "2023",
    description: "Scored 99/100 in the nationwide NPTEL certification exam, earning an Elite medal certification.",
    badge: "🎖️ Elite (99/100)"
  },
  {
    id: "mygov-ambassador",
    category: "Leadership",
    title: "MyGov India Campus Ambassador",
    issuerOrEvent: "MyGov India (Government of India)",
    dateOrYear: "2024",
    description: "Organized 5+ digital governance and tech outreach initiatives engaging over 2,500 students across campus.",
    badge: "🌟 2500+ Students"
  },
  {
    id: "bits-ambassador",
    category: "Leadership",
    title: "BITS Pilani APOGEE Campus Ambassador",
    issuerOrEvent: "BITS Pilani",
    dateOrYear: "2024",
    description: "Mobilized 100+ student delegations to participate in annual technical festival events and project showcases.",
    badge: "🤝 100+ Delegates"
  }
];

export const certificationsData = achievementsData.filter(a => a.category === 'Certification');
export const competitionsData = achievementsData.filter(a => a.category === 'Competition');
export const leadershipData = achievementsData.filter(a => a.category === 'Leadership');
