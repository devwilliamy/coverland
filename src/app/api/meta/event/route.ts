import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const hashData = (data: string): string => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export async function POST(request: NextRequest) {
  try {
    console.log('Headers', request?.headers.get('x-forwarded-for'));
    console.log('[/api/meta/event/route.ts] Start');

    const { metaCPIEvent: event } = await request.json();
    event.user_data.client_ip_address = request?.headers.get('x-forwarded-for');
    event.event_source_url = request.headers.get('referer') || '';

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [event],
        }),
      }
    );

    const data = await response.json();
    console.info('[Meta CAPI]: Response:', data);
    console.info('[Meta CAPI]: MetaCPIEvent', JSON.stringify(event, null, 2));
    if (!response.ok) {
      throw new Error(data.error.message || 'Error sending event');
    }

    return NextResponse.json({ message: 'Meta Event sent', data });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating meta event' });
  }
}
