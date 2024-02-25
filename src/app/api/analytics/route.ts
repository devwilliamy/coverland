import {
  AnalyticsData,
  sendAnalyticsServer,
} from '@/lib/analytics/CoverlandAnalytics';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = (await req.json()) as AnalyticsData;

  if (!data) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 });
  }

  await sendAnalyticsServer(data);

  return NextResponse.json(
    { message: 'Successful analytics evenr' },
    { status: 200 }
  );
}
