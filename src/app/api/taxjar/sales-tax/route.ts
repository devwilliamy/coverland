import {
  TaxJarErrorResponse,
  TaxJarRequestBody,
  TaxJarResponse,
  isTaxJarErrorResponse,
} from '@/lib/types/taxjar';
import { NextRequest, NextResponse } from 'next/server';

const TAXJAR_URL = `https://api.taxjar.com/v2/taxes`;
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { bodyData }: { bodyData: TaxJarRequestBody } = await request.json();

    const res = await fetch(TAXJAR_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TAXJAR_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const data: TaxJarResponse = await res.json();

    console.log({ data, bodyData: JSON.stringify(bodyData, null, 2) });

    if (isTaxJarErrorResponse(data)) {
      return NextResponse.json(data, { status: data.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(
      '[TaxJar Sales Tax POST]: An unexpected error occurred:',
      error
    );
    return NextResponse.json(
      { error: '[TaxJar Sales Tax POST]: An unexpected error occurred' },
      { status: 500 }
    );
  }
}
