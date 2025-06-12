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
    const { name, email, username, password } = body;

    if (!name || !email || !username || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or username already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerifyToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
        emailVerifyToken,
      },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${emailVerifyToken}`;

    await resend.emails.send({
      from: "noreply@impactlens.co",
      to: email,
      subject: "Verify your email",
      html: `<p>Hello ${name},</p><p>Please verify your email by clicking the link below:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
    });

    return NextResponse.json({ message: "User created. Please check your email to verify." });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
