import ShippingPolicyContent from '@/components/policy/ShippingPolicyContent';

export async function generateMetadata() {
  return {
    title: `Shipping Policy – Coverland`,
    description: `Learn about our efficient shipping policy designed to deliver your car cover or seat cover order promptly and reliably. From shipping methods to delivery times, we prioritize your convenience every step of the way.`,
    // alternates: {
    //   canonical: '/policies/shipping-policy',
    // },
  };
}

export default async function ShippingPolicyPage() {
  return <ShippingPolicyContent />;
}
