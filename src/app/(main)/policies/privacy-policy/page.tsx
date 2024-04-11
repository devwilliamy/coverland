'use server';
import PrivacyPolicyPage from '@/components/policy/PrivacyPolicyPage';

export async function generateMetadata() {
  return {
    title: `Privacy Policy – Coverland`,
    description: `Your privacy matters to us. Our privacy policy outlines how we collect, use, and protect your personal information when you browse or make purchases on our site. Rest assured, your data is safe with us`,
  };
}

export default async function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
