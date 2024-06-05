import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_URL = `https://places.googleapis.com/v1/places:searchText`;
export async function POST(request: NextRequest) {
  const { addressInput } = await request.json();
  const res = await fetch(GOOGLE_PLACES_URL, {
    method: 'POST',
    headers: {
      'X-Goog-Api-Key': `${process.env.GOOGLE_MAPS_API_KEY}`,
      'X-Goog-FieldMask': 'places.formattedAddress,places.addressComponents',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      textQuery: addressInput,
    }),
  });

  const data = await res.json();
  //   console.log({ data: JSON.stringify(data.formattedAddress) });

  return NextResponse.json(data, { status: 200 });
}
