'use client';
import FullWidthTabs from '../ui/full-width-tabs';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Warranty', href: '/policies/warranty-policy', current: false },
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

  // Trying to make it so if the selected tab is off screen it'll appear in the middle
  const currentIndex = updatedTabs.findIndex((tab) => tab.current);
  if (currentIndex !== -1 && currentIndex > 2) {
    const [currentTab] = updatedTabs.splice(currentIndex, 1);
    updatedTabs.splice(1, 0, currentTab);
  }

  return <FullWidthTabs tabs={updatedTabs} />;
}
