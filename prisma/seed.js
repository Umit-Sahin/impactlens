const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 seed.js başladı"); // <- bu en üstte olmalı

  if (process.env.NODE_ENV === 'production') {
    console.log("⛔ Üretim ortamında çalışmaz");
    throw new Error('Seed script cannot run in production!');
  }

  console.log("🌱 seed ortamı yüklendi");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("SUPERADMIN_PASSWORD:", process.env.SUPERADMIN_PASSWORD);

  const rawPassword = process.env.SUPERADMIN_PASSWORD || 'devpassword123!';
  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { email: 'info@impactlens.co' },
    update: {},
    create: {
      name: 'SuperAdmin',
      email: 'info@impactlens.co',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log("✅ SuperAdmin oluşturuldu veya zaten var");
}

main()
  .catch((e) => {
    console.error('❌ Seed script hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
