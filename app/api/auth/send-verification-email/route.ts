// app/api/auth/send-verification-email/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, userId } = await req.json();
  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 saat geçerli

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "noreply@impactlens.co",
    to: email,
    subject: "Verify your email address",
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`
  });

  return NextResponse.json({ message: "Verification email sent." });
}
