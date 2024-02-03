'use client';

import { determineDeliveryByDate } from '@/lib/utils/deliveryDateUtils';

export default function DeliveryDate(): JSX.Element {
  return (
    <span className="font-[700]">
      Delivery by <span className="uppercase">{determineDeliveryByDate()}</span>
    </span>
  );
}
