// app/api/signup/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, surname, email, password } = body;

    // Zorunlu alanlar kontrolü
    if (!name || !surname || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // Mevcut kullanıcı kontrolü
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Benzersiz token üret
    const emailVerifyToken = crypto.randomBytes(32).toString("hex");

    // Kullanıcı oluştur
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        emailVerifyToken,
      },
    });

    // Doğrulama URL'si
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${emailVerifyToken}`;

    // Doğrulama e-postası gönder
    await resend.emails.send({
      from: "noreply@impactlens.co",
      to: email,
      subject: "Verify your email",
      html: `
        <p>Hello ${name},</p>
        <p>Please verify your email address by clicking the link below:</p>
        <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      `,
    });

    return NextResponse.json({ message: "User created. Please check your email to verify." });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
