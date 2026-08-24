import type { Metadata } from 'next';
import './globals.css';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

export const metadata: Metadata = {
  title: 'Bhavishya Gupta | Software Engineer',
  description: 'Interactive developer workspace portfolio of Bhavishya Gupta — Software Engineer, Full Stack Developer, and AI/ML enthusiast. 810+ DSA problems solved, SDE internship experience, and full-stack systems engineering.',
  keywords: [
    'Bhavishya Gupta',
    'Software Engineer',
    'Full Stack Developer',
    'SDE Intern',
    'AI ML Engineer',
    'LeetCode',
    'React',
    'Node.js',
    'TypeScript',
    'Next.js',
    'MongoDB',
    'RAG',
    'Portfolio'
  ],
  authors: [{ name: 'Bhavishya Gupta', url: 'https://github.com/bhavishyagupta11' }],
  creator: 'Bhavishya Gupta',
  metadataBase: new URL('https://bhavishyaguptaportfolio.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bhavishya Gupta | Software Engineer',
    description: 'Explore Bhavishya Gupta’s interactive developer workspace portfolio, featuring verified engineering projects, DSA problem solving stats, and full-stack systems.',
    url: 'https://bhavishyaguptaportfolio.netlify.app',
    siteName: 'Bhavishya Gupta Workspace',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhavishya Gupta | Software Engineer',
    description: 'Interactive engineering portfolio of Bhavishya Gupta — Software Engineer & Full Stack Developer.',
  },
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e1e1e" rx="20"/><text x="50" y="68" font-size="52" font-weight="bold" text-anchor="middle" fill="%23007acc" font-family="monospace">BG</text></svg>',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bhavishya Gupta',
    jobTitle: 'Software Engineer',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'JECRC University',
    },
    url: 'https://bhavishyaguptaportfolio.netlify.app',
    sameAs: [
      'https://github.com/bhavishyagupta11',
      'https://www.linkedin.com/in/bhavishyagupta001/',
      'https://leetcode.com/u/bhavishyagupta001/'
    ],
    knowsAbout: [
      'Software Engineering',
      'Full Stack Web Development',
      'Data Structures & Algorithms',
      'React.js',
      'Node.js',
      'TypeScript',
      'AI & Machine Learning'
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <WorkspaceProvider>
          {children}
        </WorkspaceProvider>
      </body>
    </html>
  );
}
