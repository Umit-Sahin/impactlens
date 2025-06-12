// app/api/admin/payments/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

// GET: List all payments (only for SUPER_ADMIN)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const payments = await prisma.payment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const response = payments.map((p) => ({
    id: p.id,
    name: p.user?.name || "",
    email: p.user?.email || "",
    amount: p.amount,
    status: p.status,
    stripePaymentId: p.stripePaymentId,
    lastPaymentDate: p.createdAt,
  }));

  return NextResponse.json(response);
}

// POST: Create a payment intent and record (only for SUPER_ADMIN)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { userId, amount, email } = await req.json();

  if (!userId || !amount || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: "usd",
      receipt_email: email,
    });

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount,
        currency: "USD",
        status: "PENDING",
        stripePaymentId: paymentIntent.id,
      },
    });

    return NextResponse.json({
      paymentId: payment.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe/Prisma Payment Error:", error);
    return NextResponse.json({ error: "Payment creation failed." }, { status: 500 });
  }
}
