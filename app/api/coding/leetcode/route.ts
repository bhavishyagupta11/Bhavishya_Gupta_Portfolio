import { NextResponse } from 'next/server';
import { fetchLeetCodeProfile } from '@/lib/coding/leetcode';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'bhavishyagupta001';
  const fresh = searchParams.get('fresh') === 'true' || request.headers.get('x-refresh') === 'true';

  try {
    const data = await fetchLeetCodeProfile(username, fresh);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 500 });
  }
}
