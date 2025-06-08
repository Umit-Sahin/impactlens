// app/api/verify-email/route.ts


import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is missing." },
        { status: 400 }
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    if (new Date(verificationToken.expires) < new Date()) {
      return NextResponse.json(
        { message: "Verification token has expired." },
        { status: 400 }
      );
    }

    // Kullanıcının email doğrulamasını yap
    await prisma.user.update({
      where: { email: verificationToken.email },
      data: { emailVerified: new Date() },
    });

    // Token'ı sil
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Başarılı yönlendirme
    return NextResponse.redirect(new URL("/verify-email", req.url));
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
