import { NextRequest, NextResponse } from 'next/server';

export type SkuLabOrderResponse = {
  data?: {
    success: boolean;
    store_id: string;
    order_number: string;
  };
  error?: string;
  status?: number;
};

const SKU_LAB_URL = 'https://api.skulabs.com';

export async function POST(request: NextRequest): Promise<SkuLabOrderResponse> {
  // TODO: Probably good to have schema validation here
  const { order } = await request.json();
  if (!order) {
    return NextResponse.json({ error: 'Order info is required', status: 400 });
  }
  try {
    const response = await fetch(`${SKU_LAB_URL}/order/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SKU_LABS_API_KEY}`,
      },
      body: JSON.stringify({
        ...order,
      }),
    });

    if (!response.ok) {
      throw new Error('[SKU Labs Orders POST]: Network response was not ok');
    }

    const data = await response.json();
    console.info('[SkulabPost] Data:', data);
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error(
      '[SKU Lab Orders POST]: An unexpected error occurred:',
      error
    );
    return NextResponse.json(
      { error: '[SKU Lab Orders POST]: An unexpected error occurred' },
      { status: 500 }
    );
  }
}
