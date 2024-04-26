import dynamic from 'next/dynamic';
const DynamicSignIn = dynamic(() => import('@/components/login/SigninForm'), {
  ssr: false,
});

export async function generateMetadata() {
  return {
    title: `Login – Coverland`,
    description: `Access your account to manage your orders, track shipments, and update your preferences seamlessly. Log in to your account for a personalized shopping experience tailored to your needs.`,
  };
}

export default function Login() {
  return <DynamicSignIn />;
}
