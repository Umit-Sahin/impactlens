// app/api/crawl/apis/route.ts

import { chromium } from 'playwright-core';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const apiEndpoints: string[] = [];

    page.on('request', request => {
      const resourceType = request.resourceType();
      const requestUrl = request.url();

      if (['xhr', 'fetch'].includes(resourceType)) {
        apiEndpoints.push(requestUrl);
      }
    });

    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(3000);

    await browser.close();

    const uniqueEndpoints = [...new Set(apiEndpoints)];

    return NextResponse.json({ apiEndpoints: uniqueEndpoints });
  } catch (error: any) {
    console.error('API Crawl Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
