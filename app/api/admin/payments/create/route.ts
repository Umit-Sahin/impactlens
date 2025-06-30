// 📄 File: app/api/admin/payments/create/route.ts

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@lib/stripe";

/**
 * POST /api/admin/payments/create
 * Amaç: Admin panelinden manuel ödeme başlatmak (örneğin kart limiti dolmuş kullanıcılar için)
 * Girdi: email (zorunlu), amount (zorunlu)
 * Çıktı: Stripe checkout session URL
 */
export async function POST(req: NextRequest) {
  // İstekten verileri al
  const body = await req.json();
  const { email, amount } = body;

  // Geçerli değerler kontrolü
  const numericAmount = parseFloat(amount);
  if (!email || !amount || isNaN(numericAmount) || numericAmount <= 0) {
    return NextResponse.json({ error: "Invalid or missing fields" }, { status: 400 });
  }

  try {
    // Stripe Checkout Session oluştur
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", // Tek seferlik ödeme
      customer_email: email, // Stripe bu email ile müşteri eşleştirmesi yapar
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "ImpactLens Manual Payment",
            },
            unit_amount: Math.round(numericAmount * 100), // Dolar cinsinden cent'e çevir
          },
          quantity: 1,
        },
      ],
      // Ödeme başarılı/iptal URL'leri
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin-super/payments?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin-super/payments?status=cancel`,
    });

    // Stripe yönlendirme linkini döndür
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[MANUAL_PAYMENT_ERROR]", err);
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
