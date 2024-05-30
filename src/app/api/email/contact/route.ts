import { sendContactEmail } from '@/lib/sendgrid/emails/contact';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { bodyData } = await request.json();

    await sendContactEmail(bodyData);
    return NextResponse.json({
      message: 'Email sent to ' + bodyData.email,
      code: true,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Error sending email' });
  }
}
