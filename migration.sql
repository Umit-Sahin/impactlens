-- ✅ cardLast4 alanını Payment tablosuna ekle
ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "cardLast4" TEXT;

-- ✅ PaymentLog tablosunu oluştur
CREATE TABLE IF NOT EXISTS "PaymentLog" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  "eventType" TEXT NOT NULL,
  "userEmail" TEXT,
  "status" TEXT NOT NULL,
  "raw" JSONB NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
