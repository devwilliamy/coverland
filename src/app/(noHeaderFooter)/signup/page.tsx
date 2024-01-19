import dynamic from 'next/dynamic';
const DynamicSignUp = dynamic(() => import('@/components/signup/SignupForm'), {
  ssr: false,
});
export default function Signup() {
  return <DynamicSignUp />;
}
