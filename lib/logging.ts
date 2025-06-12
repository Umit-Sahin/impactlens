// lib/logging.ts
import prisma from './prisma';

export async function logEvent({
  userId,
  action,
  level = 'info',
  ip = null,
}: {
  userId: string;
  action: string;
  level?: 'info' | 'warning' | 'error' | 'critical';
  ip?: string | null;
}) {
  await prisma.log.create({
    data: {
      userId,
      action,
      level,
      ip_address: ip,
    },
  });
}
