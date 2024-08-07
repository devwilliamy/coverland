'use client';
import { useSearchParams } from 'next/navigation';

export default function CheckoutError() {
  const searchParams = useSearchParams();
  const responseMessage = searchParams?.get('RESPMSG') ?? '';
  const result = searchParams?.get('RESULT') ?? '';
  const extraMessage = generateExtraMessage(result);
  return (
    <>
      <h2>There was an error with your checkout</h2>
      <p>Please try again or contact our support team</p>
      <p>Error: {responseMessage}</p>
      <p>{extraMessage}</p>
    </>
  );
}
function generateExtraMessage(result: string) {
  switch (result) {
    case '7':
      return 'If this token has never been used, try incognito mode.';
    case '109':
      return 'Try again in a minute.';
    default:
      return '';
  }
}
