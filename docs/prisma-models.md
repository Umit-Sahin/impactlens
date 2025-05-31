
# 📘 Prisma Model Açıklamaları (`schema.prisma`)

Bu doküman, ImpactLens projesinde kullanılan Prisma modellerini açıklar.

---

## 🔧 Genel Yapı

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

## 👤 Kullanıcı Modeli (User)

```prisma
model User {
  id            String   @id @default(cuid())
  name          String?
  email         String   @unique
  emailVerified DateTime?
  password      String?
  image         String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

Açıklamalar:
- `id`: Her kullanıcı için benzersiz bir kimlik.
- `email`: Giriş ve eşleştirme için kullanılır. Unique olmalı.
- `password`: E-posta/şifre ile kayıt olan kullanıcılar için.
- `accounts`: OAuth sağlayıcılarına (örneğin GitHub) bağlanan hesaplar.
- `sessions`: Oturum yönetimi (NextAuth için).
- `createdAt` / `updatedAt`: Zaman damgaları.

---

## 🔐 Account Modeli (OAuth Provider)

```prisma
model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?
  access_token       String?
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?
  session_state      String?
  user               User    @relation(fields: [userId], references: [id])

  @@unique([provider, providerAccountId])
}
```

Açıklamalar:
- Her OAuth sağlayıcısı için kullanıcı bilgileri tutulur (GitHub, Google, vs).
- `provider` + `providerAccountId` benzersiz kombinasyon olmalı.

---

## 🛡 Session Modeli (Kullanıcı Oturumu)

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id])
}
```

Açıklamalar:
- NextAuth ile oluşturulan oturum bilgileri burada saklanır.
- `sessionToken`, oturumu tanımlar.

---

## 🔑 VerificationToken (Eposta Doğrulama vs.)

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

Açıklamalar:
- E-posta ile doğrulama veya şifre sıfırlama gibi durumlar için kullanılır.
- Otomatik silinmeli veya zamanla expire edilir.

---

## 📌 Notlar

- Tüm modeller SOC 2 uyumluluğuna uygun olarak şifrelenmiş veya kontrollü erişimle işlenebilir.
- `password` alanı şifrelenmiş halde (hashlenmiş) saklanmalıdır.
- Gerekirse `Project`, `Analysis`, `Organization` gibi modeller ileride eklenebilir.
