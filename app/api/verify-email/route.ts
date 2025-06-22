// 📄 app/api/verify-email/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is missing." }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        emailVerifyToken: token,
        isEmailVerified: false,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifiedAt: new Date(),
        emailVerifyToken: null, // Token tekrar kullanılmasın
      },
    });

    // ✅ Sabit fallback URL – güvenlidir (SOC 2 uyumlu)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://impactlens.co";
    return NextResponse.redirect(`${baseUrl}/auth/verified`);
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
