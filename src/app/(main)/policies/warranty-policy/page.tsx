'use server';
import WarrantyPolicyPage from '@/components/policy/WarrantyPolicyPage';

export async function generateMetadata() {
  return {
    title: `Warranty Policy – Coverland`,
    description: `Discover peace of mind with our comprehensive warranty policy. We stand behind the quality of our car covers and seat covers, offering extensive coverage to protect your investment. Learn more about our warranty terms here.`,
  };
}

export default async function WarrantyPolicy({
  showHeader,
}: {
  showHeader?: boolean;
}) {
  return <WarrantyPolicyPage showHeader={showHeader} />;
}
