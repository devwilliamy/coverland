'use client';

import { useSendViewAnalytics } from '@/lib/hooks/useSendInternalAnalytics';

//Use this in server components in order to send view analytics without
//having to make the component a client component.

export function ViewAnalytics() {
  useSendViewAnalytics();
  return <></>;
}
