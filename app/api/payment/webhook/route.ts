// 📄 app/api/payment/webhook/route.ts

// ============================================================
// Stripe Webhook Handler
// Dinlenen eventler:
// 1) checkout.session.completed → Ödeme tamamlandı → hasActivePayment = true
// 2) payment_intent.payment_failed → Ödeme başarısız oldu → log
// 3) Diğer tüm eventler → PaymentLog tablosuna INFO olarak kaydedilir
// ============================================================

// ✅ Bölüm 1: Stripe ve yardımcılar
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@lib/prisma";

// Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

// ✅ ÖNEMLİ: Webhook için raw body gerekir (Next.js >=13)
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Yardımcı: ReadableStream → Buffer (raw body)
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

// ✅ Webhook handler
export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req.body!);
    const signature = req.headers.get("stripe-signature")!;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const eventType = event.type;
    let status: "SUCCESS" | "FAILED" | "INFO" = "INFO";
    let userEmail: string | undefined;
    let userId: string | undefined;

    // ✅ Ödeme başarılı → Kullanıcı aktif yapılır
    if (eventType === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      userEmail = session.customer_email || undefined;
      userId = session.metadata?.userId;

      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: { hasActivePayment: true },
        });
        status = "SUCCESS";
      }
    }

    // ✅ Ödeme başarısız
    if (eventType === "payment_intent.payment_failed") {
      status = "FAILED";
    }

    // ✅ Log kaydı (her durumda)
    await prisma.paymentLog.create({
      data: {
        eventType,
        userEmail,
        userId,
        status,
        raw: {
          message: `Stripe event received: ${eventType}`,
        },
        createdAt: new Date(),
      },
    });

    return new NextResponse("✅ Webhook received", { status: 200 });
  } catch (err: any) {
    console.error("❌ Webhook error:", err.message);

    // 🔴 Hata logla
    await prisma.paymentLog.create({
      data: {
        eventType: "webhook.error",
        status: "ERROR",
        raw: {
          message: err.message,
        },
        createdAt: new Date(),
      },
    });

    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }
}
