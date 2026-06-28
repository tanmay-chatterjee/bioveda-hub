import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const tag = req.nextUrl.searchParams.get('tag') || 'products';
  revalidateTag(tag, 'everything');

  return NextResponse.json({ revalidated: true, tag, timestamp: new Date().toISOString() });
}
