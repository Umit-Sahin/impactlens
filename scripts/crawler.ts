import { NextRequest, NextResponse } from 'next/server';
import { chromium, Page } from 'playwright-core';

// Yardımcı fonksiyon: belirli bir URL'yi ziyaret eder ve içindeki linkleri döner
async function extractLinksFromPage(page: Page, baseUrl: string): Promise<string[]> {
  const links = await page.$$eval('a', (as) => as.map((a) => a.href));
  return links
    .filter((href) => href.startsWith('http'))
    .filter((href) => href.startsWith(baseUrl)); // sadece aynı domain
}

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ message: 'URL is required' }, { status: 400 });
  }

  const visited = new Set<string>();
  const results: { level: number; url: string }[] = [];

  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Level 1 (Ana sayfa)
    await page.goto(url, { timeout: 15000, waitUntil: 'domcontentloaded' });
    visited.add(url);
    results.push({ level: 1, url });

    const level1Links = await extractLinksFromPage(page, url);

    // Level 2
    const level2Links: string[] = [];
    for (const link of level1Links) {
      if (!visited.has(link)) {
        try {
          await page.goto(link, { timeout: 10000 });
          visited.add(link);
          results.push({ level: 2, url: link });

          const nestedLinks = await extractLinksFromPage(page, url);
          for (const l2 of nestedLinks) {
            if (!visited.has(l2)) {
              level2Links.push(l2);
            }
          }
        } catch (err) {
          console.warn(`Level 2 skip: ${link}`);
        }
      }
    }

    // Level 3
    for (const link of level2Links) {
      if (!visited.has(link)) {
        try {
          await page.goto(link, { timeout: 8000 });
          visited.add(link);
          results.push({ level: 3, url: link });
        } catch (err) {
          console.warn(`Level 3 skip: ${link}`);
        }
      }
    }

    await browser.close();
    return NextResponse.json({ results });
  } catch (error: any) {
    console.error('Crawl Error:', error);
    return NextResponse.json(
      { message: error.message || 'Crawl failed' },
      { status: 500 }
    );
  }
}
