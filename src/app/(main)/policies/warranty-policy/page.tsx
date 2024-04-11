import React from 'react';
import PolicyHeader from '@/components/policy/PolicyHeader';
import PolicyTitle from '@/components/policy/PolicyTitle';
import PolicyDetail from '@/components/policy/PolicyDetail';
import PolicyFurtherAssistance from '@/components/policy/PolicyFurtherAssistance';
import { usePathname } from 'next/navigation';
import WarrantyPolicyPage from './components/WarrantyPolicyPage';

export async function generateMetadata() {
  return {
    title: `Warranty Policy – Coverland`,
    description: `Discover peace of mind with our comprehensive warranty policy. We stand behind the quality of our car covers and seat covers, offering extensive coverage to protect your investment. Learn more about our warranty terms here.`,
  };
}

function WarrantyPolicy({ showHeader }: { showHeader?: boolean }) {
  return <WarrantyPolicyPage showHeader={showHeader} />;
}

export default WarrantyPolicy;
