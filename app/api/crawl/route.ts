//app/api/crawl/route.ts

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: 'Playwright crawling is disabled in deployed environments.' },
    { status: 400 }
  );
}
