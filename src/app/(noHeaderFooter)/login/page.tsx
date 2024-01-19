'use client';
import dynamic from 'next/dynamic';
const DynamicSignIn = dynamic(() => import('@/components/login/SigninForm'), {
  ssr: false,
});

export default function Login() {
  return <DynamicSignIn />;
}
