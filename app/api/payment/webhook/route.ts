// 📄 app/api/payment/webhook/route.ts

// ============================================================
// Stripe webhook handler
// Dinlenen eventler:
// 1) checkout.session.completed → Ödeme tamamlandıysa hasActivePayment = true yap
// 2) payment_intent.payment_failed → Ödeme başarısız olduysa log kaydı oluştur + uyarı mekanizması hazırlanır
// 3) Diğer tüm eventler → PaymentLog tablosuna INFO olarak kaydedilir
// ============================================================

// ✅ Bölüm 1: Stripe ve yardımcılar
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@lib/prisma";

// Stripe SDK
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {

});

// ✅ ÖNEMLİ: Webhook isteğinde body'nin orijinal haline ihtiyaç var
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Yardımcı: Raw body elde etmek için (Next.js 15 ile uyumlu)
async function getRawBody(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  return Buffer.concat(chunks);
}

// ✅ Bölüm 2: Webhook POST handler
export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req.body!);
    const signature = req.headers.get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // ✅ Bölüm 3: Email & UserId çıkarımı (checkout.session.completed için geçerli)
    let userEmail: string | undefined;
    let userId: string | undefined;

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      userEmail = session.customer_email || undefined;

      // Eğer metadata ile userId gönderildiyse al
      if (session.metadata?.userId) {
        userId = session.metadata.userId;
      }
    }

    // ✅ Bölüm 4: Log verileri
    const eventType = event.type;
    const status = event.type.includes("failed") ? "FAILED" : "SUCCESS";
    const message = `Stripe event received: ${eventType}`;

    // ✅ Logu veritabanına kaydet
    await prisma.paymentLog.create({
      data: {
        eventType,
        userEmail,
        status,
        raw: { message },
        createdAt: new Date(),
        ...(userId ? { userId } : {}), // varsa userId ilişkisini kur
      },
    });

    return new NextResponse("Webhook received and logged", { status: 200 });
  } catch (err: any) {
    console.error("Webhook error:", err.message);

    // Hata loglama (opsiyonel)
    await prisma.paymentLog.create({
      data: {
        eventType: "webhook.error",
        status: "ERROR",
        raw: { message: err.message },
        createdAt: new Date(),
      },
    });

    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }
}
