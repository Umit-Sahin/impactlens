// app/api/admin/payments/manual-stripe/route.ts

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@lib/stripe";

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json();
  const numericAmount = parseFloat(amount);

  // ✅ Burada kontrol ekleniyor
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }


  if (!email || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Manual Payment" },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin-super/payments?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin-super/payments?status=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe manual payment error:", error);
    return NextResponse.json({ error: "Stripe payment failed" }, { status: 500 });
  }
}
