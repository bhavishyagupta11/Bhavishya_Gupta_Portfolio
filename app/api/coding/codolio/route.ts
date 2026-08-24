import { NextResponse } from 'next/server';
import { fetchCodolioProfile } from '@/lib/coding/codolio';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || 'bhavigupta';
  const fresh = searchParams.get('fresh') === 'true' || request.headers.get('x-refresh') === 'true';

  try {
    const data = await fetchCodolioProfile(username, fresh);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Codolio data' }, { status: 500 });
  }
}
