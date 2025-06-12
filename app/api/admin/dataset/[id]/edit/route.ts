//app/api/admin/dataset/[id]/edit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { domains, githubLinks } = body;
  const datasetId = params.id;

  await prisma.userDataset.update({
    where: { id: datasetId },
    data: {
      domains,
      githubLinks,
    },
  });

  // ✅ Mutlak URL ile yönlendirme yap
  return NextResponse.redirect(new URL('/admin/domains', req.url));
}
