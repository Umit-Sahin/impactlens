// middleware.ts

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isProtected = url.pathname.startsWith("/product");

  // Geliştirme ortamında kimlik kontrolünü atla
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  // Giriş yapılmamışsa signin'e yönlendir
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Stripe ödemesi yapılmadıysa ama kullanıcı SUPER_ADMIN veya whitelist değilse, ödeme sayfasına yönlendir
  const isExempt =
    token?.role === "SUPER_ADMIN" || token?.isWhitelisted === true;

  if (isProtected && token && !isExempt && token.hasActivePayment !== true) {
    return NextResponse.redirect(new URL("/onboarding/payment", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*"],
};
