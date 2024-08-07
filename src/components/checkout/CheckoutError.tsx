'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW';

const coverlandUrl = isPreview
  ? process.env.NEXT_PUBLIC_HOSTNAME
  : 'https://coverland.com';

export default function CheckoutError() {
  const searchParams = useSearchParams();
  const responseMessage = searchParams?.get('RESPMSG') ?? '';
  const result = searchParams?.get('RESULT') ?? '';
  const extraMessage = generateExtraMessage(result);
  const pathname = usePathname(); // Gets the current path
  const queryString = searchParams.toString();
  const fullUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
  const redirectUrl = `${coverlandUrl}${fullUrl}`;

  useEffect(() => {
    console.log('Inside useEffect');
    if (window.top !== window.self) {
      window.top.location.href = redirectUrl;
    }
  }, []);

  return (
    <>
      {window.top && window.top !== window.self ? (
        <AiOutlineLoading3Quarters
          className="animate-spin h-8 w-8"
        />
      ) : (
        <>
          <h2>There was an error with your checkout</h2>
          <p>Please try again or contact our support team</p>
          <p>Error: {responseMessage}</p>
          <p>{extraMessage}</p>
        </>
      )}
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
