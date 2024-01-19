'use client';
import FullWidthTabs from '../ui/full-width-tabs';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Warranty', href: '/policies/warranty', current: false },
  { name: 'Return Policy', href: '/policies/return-policy', current: false },
  { name: 'Privacy Policy', href: '/policies/privacy-policy', current: false },
  {
    name: 'Shipping Policy',
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
