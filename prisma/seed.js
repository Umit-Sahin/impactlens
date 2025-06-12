const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 seed.js başladı");

  if (process.env.NODE_ENV === 'production') {
    console.log("⛔ Üretim ortamında çalışmaz");
    throw new Error('Seed script cannot run in production!');
  }

  console.log("🌱 seed ortamı yüklendi");
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  console.log("SUPERADMIN_PASSWORD:", process.env.SUPERADMIN_PASSWORD);

  const rawPassword = process.env.SUPERADMIN_PASSWORD || 'devpassword123!';
  const hashedPassword = await bcrypt.hash(rawPassword, 12);

  // SUPER_ADMIN oluştur
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

  // Entity kayıtları
  const entities = [
    {
      name: 'Hero Section',
      description: 'Ana sayfa başlığı ve açıklama alanı',
      status: 'active',
      location: 'Homepage',
    },
    {
      name: 'Pricing Table',
      description: 'Ücret planlarını gösteren tablo',
      status: 'inactive',
      location: 'Pricing Page',
    },
    {
      name: 'Testimonials',
      description: 'Kullanıcı yorumlarını gösteren bileşen',
      status: 'active',
      location: 'About Page',
    },
  ];

  for (const entity of entities) {
    await prisma.entity.upsert({
      where: { name: entity.name },
      update: {},
      create: entity,
    });
  }

  console.log("✅ Entity kayıtları eklendi");
}

main()
  .catch((e) => {
    console.error('❌ Seed script hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
