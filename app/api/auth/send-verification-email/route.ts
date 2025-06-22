// 📄 app/api/auth/send-verification-email/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    if (!email || !userId) {
      return NextResponse.json(
        { message: "Email and userId are required." },
        { status: 400 }
      );
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 saat

    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // ✅ Güvenli fallback destekli baseUrl tanımı
    const baseUrl =
  process.env.NEXTAUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL || // fallback
  (process.env.NODE_ENV === 'production'
    ? 'https://impactlens.co'
    : 'http://localhost:3000');


    console.log('baseUrl:', baseUrl); // TODO: Daha sonra silinecek

    const verificationUrl = `${baseUrl}/verify-email?token=${token}`;

    // 🔍 Debug için log (İsteğe bağlı, sonra kaldır)
    console.log("🔗 Sending verification link to:", verificationUrl);

    await resend.emails.send({
      from: "noreply@impactlens.co",
      to: email,
      subject: "Verify your email address",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`,
    });

    return NextResponse.json({ message: "Verification email sent." });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
