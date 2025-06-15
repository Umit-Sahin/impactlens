//app/api/admin/logs/system/route.ts

// ============================================================
// 📘 System Log API Endpoint
// GET isteği ile sistem loglarını listeler (sadece SUPER_ADMIN)
// Destekler: email filtresi, tarih aralığı ve log seviyesi (level) filtresi
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import prisma from '@lib/prisma';

export async function GET(req: NextRequest) {
  // ✅ 1. Oturum kontrolü
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ✅ 2. Query string'den filtre verilerini al
  const { searchParams } = req.nextUrl;
  const email = searchParams.get('email') || undefined;
  const level = searchParams.get('level') || undefined;
  const start = searchParams.get('start') || undefined;
  const end = searchParams.get('end') || undefined;

  // ✅ 3. Filtre koşullarını hazırla
  const where: any = {};
  if (email) {
    where.user = {
      email: {
        contains: email,
        mode: 'insensitive',
      },
    };
  }
  if (level) {
    where.level = {
      equals: level,
      mode: 'insensitive',
    };
  }
  if (start || end) {
    where.created_at = {};
    if (start) where.created_at.gte = new Date(start);
    if (end) where.created_at.lte = new Date(end + 'T23:59:59');
  }

  try {
    // ✅ 4. Veritabanından logları çek
    const logs = await prisma.log.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      take: 200, // SOC 2 uyumlu sınırlandırma
    });

    // ✅ 5. Cevap verisi
    return NextResponse.json(
      logs.map((log) => ({
        id: log.id,
        action: log.action,
        level: log.level,
        ip_address: log.ip_address,
        created_at: log.created_at,
        user: log.user ? {
          name: log.user.name,
          email: log.user.email,
        } : null,
      }))
    );
  } catch (error) {
    console.error('❌ Error fetching system logs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
