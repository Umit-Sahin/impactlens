// app/api/admin/dataset/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();
    const domains = formData.get("domains")?.toString().split(",").map((s) => s.trim()) || [];
    const githubLinks = formData.get("githubLinks")?.toString().split(",").map((s) => s.trim()) || [];

    await prisma.userDataset.update({
      where: { id: params.id },
      data: {
        domains,
        githubLinks,
      },
    });

    const redirectUrl = new URL("/admin/domains", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Dataset update error:", error);
    return NextResponse.json(
      { message: "Failed to update dataset", error },
      { status: 500 }
    );
  }
}
