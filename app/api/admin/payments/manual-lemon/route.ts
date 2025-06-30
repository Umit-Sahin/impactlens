// 📄 app/api/admin/payments/manual-lemon/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, amount } = await req.json();
  const numericAmount = parseFloat(amount);

  // ✅ Burada kontrol ekleniyor
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  if (!email || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // 📌 LemonSqueezy sabit ürün ID'si kullanılarak statik link döndürülür
  const checkoutUrl = `https://impactlens.lemonsqueezy.com/buy/4afdd99b-5cc0-438d-b2b5-adfc0f59fffb`;

  // Opsiyonel: Loglama yapılabilir

  return NextResponse.json({ url: checkoutUrl });
}
