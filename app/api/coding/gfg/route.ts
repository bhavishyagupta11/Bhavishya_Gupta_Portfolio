import { NextResponse } from 'next/server';
import { fetchGfgProfile } from '@/lib/coding/gfg';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'bhavishyarqb';
  const fresh = searchParams.get('fresh') === 'true' || request.headers.get('x-refresh') === 'true';

  try {
    const data = await fetchGfgProfile(username, fresh);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch GFG data' }, { status: 500 });
  }
}
