import { NextResponse } from 'next/server';
import { fetchGitHubProfile } from '@/lib/coding/github';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'bhavishyagupta11';
  const fresh = searchParams.get('fresh') === 'true' || request.headers.get('x-refresh') === 'true';

  try {
    const data = await fetchGitHubProfile(username, fresh);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch GitHub profile' }, { status: 500 });
  }
}
