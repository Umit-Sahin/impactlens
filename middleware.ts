// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Geliştirme ortamında kimlik kontrolünü atla
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  const isProtected = req.nextUrl.pathname.startsWith("/product");
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}
