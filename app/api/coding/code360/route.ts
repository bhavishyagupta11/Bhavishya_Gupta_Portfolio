import { NextResponse } from 'next/server';
import { fetchCode360Profile } from '@/lib/coding/code360';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'bhavigupta';
  const fresh = searchParams.get('fresh') === 'true' || request.headers.get('x-refresh') === 'true';

  try {
    const data = await fetchCode360Profile(username, fresh);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Code360 data' }, { status: 500 });
  }
}
