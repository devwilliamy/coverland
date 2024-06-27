'use server'; 

import { testMyRoute } from '@/lib/sendgrid/emails/shipping-confirmation';// Mark this as a client component
import { useState } from 'react';

export default async function OrderDetails({ order }) {

    testMyRoute();
  return (
    <div>
      <h1>Order Details</h1>
      {/* Render order details */}
      <button>Send Email</button>
    </div>
  );
}