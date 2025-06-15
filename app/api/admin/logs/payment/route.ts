// 📄 app/api/admin/logs/payment/route.ts

// ============================================================
// 📘 Payment Log API Endpoint
// GET isteği ile ödeme loglarını listeler (sadece SUPER_ADMIN)
// Destekler: email filtresi, tarih aralığı filtresi
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

  // ✅ 2. Query string'den filtreleri al
  const { searchParams } = req.nextUrl;
  const email = searchParams.get('email') || undefined;
  const start = searchParams.get('start') || undefined;
  const end = searchParams.get('end') || undefined;

  // ✅ 3. Filtre koşulları oluştur
  const where: any = {};
  if (email) {
    where.userEmail = {
      contains: email,
      mode: 'insensitive',
    };
  }
  if (start || end) {
    where.createdAt = {};
    if (start) where.createdAt.gte = new Date(start);
    if (end) where.createdAt.lte = new Date(end + 'T23:59:59');
  }

  try {
    // ✅ 4. Veritabanından logları çek
    const logs = await prisma.paymentLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 200, // Maksimum 200 kayıt getir
    });

    // ✅ 5. JSON response döndür
    return NextResponse.json(
      logs.map((log) => ({
        id: log.id,
        eventType: log.eventType,
        status: log.status,
        userEmail: log.userEmail,
        createdAt: log.createdAt,
      }))
    );
  } catch (error) {
    console.error('❌ Error fetching payment logs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
