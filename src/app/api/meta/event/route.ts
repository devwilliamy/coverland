import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const hashData = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export async function POST(request: NextRequest) {
  try {
    console.log('requies.theader.referer:', request.headers.get('referer'));
    console.log('Headers', request?.headers.get('x-forwarded-for'));
    console.log('[/api/meta/event/route.ts] Start');
    const { metaCPIEvent: event } = await request.json();
    // const event = {
    //   event_name: 'Purchase',
    //   event_time: Math.floor(Date.now() / 1000),
    //   action_source: 'website',
    //   user_data: {
    //     em: [hashData('hashed_email@example.com')],
    //     ph: [hashData('123-456-7890')],
    //     ct: [hashData('Irvine')],
    //     country: [hashData('US')],
    //     fn: [hashData('William')],
    //     ln: [hashData('Yang')],
    //     st: [hashData('CA')],
    //     zp: [hashData('92782')],
    //     fbp: 'fb.1.1706144823803.1653715885',
    //     client_ip_address: '192.168.1.66', // Replace with the user's IP address
    //     client_user_agent: navigator.userAgent, // Browser user agent string
    //   },
    //   custom_data: {
    //     currency: 'USD',
    //     value: 123.45,
    //     order_id: 'CL-TEST-1000',
    //     content_ids: 'SKU-1, SKU-2',
    //     contents: [
    //       {
    //         id: 'product123',
    //         quantity: 1,
    //         delivery_category: 'home_delivery',
    //       },
    //     ],
    //   },
    //   event_source_url: 'http://localhost:3000/checkout', // Current page URL
    // };
    event.user_data.client_ip_address = request?.headers.get('x-forwarded-for')
    event.event_source_url = request.headers.get('referer') || ""
    console.log('[Event]:', event);
    const response = await fetch(
      // `https://graph.facebook.com/v13.0/${process.env.FACEBOOK_PIXEL_ID}/events`,
      `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [event],
          // access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        }),
      }
    );

    const data = await response.json();
    console.log('[Meta CAPI]: Data:', data);
    if (!response.ok) {
      throw new Error(data.error.message || 'Error sending event');
    }

    return NextResponse.json({ message: 'Meta Event sent', data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating meta event' });
  }
}
