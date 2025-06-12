// 📄 File: app/api/admin/payments/create/route.ts

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";



export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, amount } = body;

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
            product_data: {
              name: "ImpactLens Subscription",
            },
            unit_amount: amount * 100, // in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/payments?status=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/payments?status=cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
