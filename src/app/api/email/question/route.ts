import { sendQuestionsEmail } from '@/lib/sendgrid/emails/questions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    await sendQuestionsEmail(req);
    return NextResponse.json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: 'Error sending Question Email',
      error,
    });
  }
}
