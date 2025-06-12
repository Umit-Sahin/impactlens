// 📁 File: app/api/log/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, action, level = 'info', ip_address } = body;

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing userId or action' }, { status: 400 });
    }

    const log = await prisma.log.create({
      data: {
        userId,
        action,
        level,
        ip_address,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error('Log creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}