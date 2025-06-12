// 📁 File: app/api/audit-log/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, action, level = 'info', details } = body;

    if (!userId || !action || !details) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const auditLog = await prisma.auditLog.create({
      data: {
        userId,
        action,
        level,
        details,
      },
    });

    return NextResponse.json(auditLog);
  } catch (error) {
    console.error('Audit log error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}