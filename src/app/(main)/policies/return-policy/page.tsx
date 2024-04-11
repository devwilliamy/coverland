'use server';
import ReturnPolicyPage from '@/components/policy/ReturnPolicyPage';

export async function generateMetadata() {
  return {
    title: `Return Policy – Coverland`,
    description: `Explore our transparent return policy designed to ensure your complete satisfaction with your cover purchase. Learn about our hassle-free return process and make your buying experience worry-free.`,
  };
}

export default async function ReturnPolicy() {
  return <ReturnPolicyPage />;
}
