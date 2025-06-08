//app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// .env veya .env.local içine RESEND_API_KEY eklenmiş olmalı
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const emailResponse = await resend.emails.send({
      from: 'ImpactLens Contact <noreply@impactlens.co>',
      to: 'info@impactlens.co', // Mail gelecek eposta adresi
      subject: `New Contact Message from ${name}`,
      reply_to: email,
      html: `
        <h2>Yeni mesaj!</h2>
        <p><strong>Ad:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br/>${message}</p>
      `,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CONTACT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
