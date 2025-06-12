//app/api/dataset/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import prisma from "@lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const form = await req.formData();
  const domains = form.get("domains")?.toString().split(",").map(d => d.trim()).filter(Boolean) || [];
  const githubLinks = form.get("githubLinks")?.toString().split(",").map(g => g.trim()).filter(Boolean) || [];

  try {
    await prisma.userDataset.update({
      where: { id: params.id },
      data: {
        domains,
        githubLinks,
      },
    });

    return NextResponse.redirect("/admin/datasets");
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
