// 📄 app/api/company/domains/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const dataset = await prisma.userDataset.findUnique({
    where: { userId: session.user.id },
  });

  return NextResponse.json(dataset);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { domains } = await req.json();

  if (!Array.isArray(domains)) {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const updated = await prisma.userDataset.upsert({
    where: { userId: session.user.id },
    update: { domains },
    create: {
      userId: session.user.id,
      domains,
      githubLinks: [],
    },
  });

  return NextResponse.json(updated);
}
