import React from 'react';
import ShippingPolicyPage from './components/ShippingPolicyPage';

export async function generateMetadata() {
  return {
    title: `Shipping Policy – Coverland`,
    description: `Learn about our efficient shipping policy designed to deliver your car cover or seat cover order promptly and reliably. From shipping methods to delivery times, we prioritize your convenience every step of the way.`,
  };
}

function ShippingPolicy({ showHeader }: { showHeader?: boolean }) {
  return <ShippingPolicyPage showHeader={showHeader} />;
}

export default ShippingPolicy;
