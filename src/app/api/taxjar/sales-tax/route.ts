import { NextRequest, NextResponse } from 'next/server';

const TAXJAR_URL = `https://api.taxjar.com/v2/taxes`;
export async function POST(request: NextRequest) {
  const { bodyData } = await request.json();
  const res = await fetch(TAXJAR_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TAXJAR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
  const data = await res.json();

  return NextResponse.json({ tax: data.tax }, { status: 200 });
}
