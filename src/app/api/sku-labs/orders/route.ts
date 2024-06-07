import { NextRequest, NextResponse } from 'next/server';

// Define the type for items within the stash
type SkuLabItem = {
  quantity: number;
  price: number;
  type: string;
  id: string;
  lineSku: string;
  lineName: string;
};

// Define the type for shipping information within the stash
type SkuLabShippingInformation = {
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  address: string;
  address_2: string;
  method: string;
};

// Define the type for the stash itself
type SkuLabStash = {
  store_id: string;
  type: string;
  id: string;
  notes: string;
  date: string;
  items: SkuLabItem[];
  discount: number;
  shipping: number;
  financial_status: string;
  tax: number;
  total: number;
  shipping_information: SkuLabShippingInformation;
  tags: string[];
};

// Define the type for the main structure
type SkuLabOrderDTO = {
  store_id: string;
  order_number: string;
  stash: SkuLabStash;
};

const SKU_LAB_URL = 'https://api.skulabs.com';

export async function POST(request: NextRequest) {
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
