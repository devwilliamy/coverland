'use client';
import dynamic from 'next/dynamic';
const DynamicForgotPasswordForm = dynamic(
  () => import('@/components/forgot-password/ForgotPasswordForm'),
  {
    ssr: false,
  }
);
export default function ForgotPassword() {
  return <DynamicForgotPasswordForm />;
}
