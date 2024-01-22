'use client';
import FullWidthTabs from '../ui/full-width-tabs';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Warranty', href: '/policies/warranty-policy', current: false },
  { name: 'Returns', href: '/policies/return-policy', current: false },
  { name: 'Privacy', href: '/policies/privacy-policy', current: false },
  {
    name: 'Shipping',
    href: '/policies/shipping-policy',
    current: false,
  },
];

export default function PolicyTabs() {
  const pathname = usePathname();
  const updatedTabs = tabs.map((tab) => ({
    ...tab,
    current: pathname === tab.href,
  }));

  return <FullWidthTabs tabs={updatedTabs} />;
}
