//app/api/dataset/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { domains, githubLinks } = await req.json();

  if (!Array.isArray(domains) || !Array.isArray(githubLinks)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const existing = await prisma.userDataset.findUnique({
      where: { userId: session.user.id },
    });

    if (existing) {
      await prisma.userDataset.update({
        where: { userId: session.user.id },
        data: { domains, githubLinks },
      });
    } else {
      await prisma.userDataset.create({
        data: {
          userId: session.user.id,
          domains,
          githubLinks,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Dataset API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
