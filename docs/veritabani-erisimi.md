# Veritabanı Erişimi

Bu döküman, ImpactLens projesinde veritabanı erişiminin nasıl yönetildiğini açıklar. Kullanılan teknoloji Prisma ORM'dir.

---

## 📦 Kullanılan Teknolojiler

- **Veritabanı:** PostgreSQL  
- **ORM:** [Prisma](https://www.prisma.io/)  
- **Prisma Client:** Otomatik olarak `prisma/schema.prisma` dosyasına göre oluşturulur.

---

## 🔧 Yapılandırma

Tüm veritabanı modelleri `prisma/schema.prisma` dosyasında tanımlanır. Örnek:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String?
  name      String?
  createdAt DateTime @default(now())
}

Veritabanı URL’si .env dosyasındaki DATABASE_URL değişkeni ile tanımlanır:

DATABASE_URL="postgresql://username:password@localhost:5432/impactlens"


📥 Prisma Client Erişimi

Veritabanı işlemleri için @lib/prisma.ts dosyasındaki prisma örneği kullanılır:
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

🔍 CRUD İşlemleri
Prisma ile CRUD işlemleri çok basittir. Örnek: kullanıcı oluşturma
import { prisma } from "@lib/prisma";

await prisma.user.create({
  data: {
    email: "test@example.com",
    name: "Test User",
  },
});


Proje geliştirme sırasında aşağıdaki Prisma komutları sıkça kullanılır:
npx prisma generate       # Prisma Client'ı oluşturur
npx prisma migrate dev    # Yeni migration oluşturur ve uygular
npx prisma studio         # Web arayüzünde veritabanını görüntüleme
