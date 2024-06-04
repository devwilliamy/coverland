import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_PLACES_URL = `https://places.googleapis.com/v1/places:autocomplete?fields=*&access_token=${process.env.GOOGLE_MAPS_API_KEY}`;

export async function POST(request: NextRequest) {
  const { addressInput } = await request.json();
  const res = await fetch(GOOGLE_PLACES_URL, {
    method: 'POST',
    headers: {
      //   Authorization: `Bearer ${process.env.GOOGLE_MAPS_API_KEY}`,
      'X-Goog-Api-Key': `${process.env.GOOGLE_MAPS_API_KEY}`,
      //   Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // body: {},
    body: JSON.stringify({
      input: addressInput,
      includeQueryPredictions: true,
      includedPrimaryTypes: [
        'street_address',
        'street_number',
        'premise',
        'geocode',
        'postal_code',
      ],
    }),
  });

  const data = await res.json();
  const suggestions = data['suggestions'];
  console.log({ data: JSON.stringify(data.suggestions) });

  return NextResponse.json(suggestions, { status: 200 });
  //   return NextResponse.json(data, { status: 200 });
}
