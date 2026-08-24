'use client';

import dynamic from 'next/dynamic';

// Dynamically load WorkspaceShell to ensure client-side rendering with local storage and keyboard events
const WorkspaceShell = dynamic(
  () => import('@/components/workspace/WorkspaceShell').then((mod) => mod.WorkspaceShell),
  { ssr: false }
);

export default function HomePage() {
  return <WorkspaceShell />;
}
