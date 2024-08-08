'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const isPreview = process.env.NEXT_PUBLIC_IS_PREVIEW === 'PREVIEW';

const coverlandUrl = isPreview
  ? process.env.NEXT_PUBLIC_HOSTNAME
  : 'https://coverland.com';

/*
  Testing AVS:
    Doesnt pass
    const line1 = "49354 Main" N
    const postal_code = "94303" N
    'AVSADDR' => 'N',
    'AVSZIP' => 'Y',
    'AVSDATA' => 'NYY',
    'IAVS' => 'N',
      'PROCAVS' => 'Z',
    Passes
    const line1 = "24285 Elm" Y
    const postal_code = "00382" Y
    'AVSADDR' => 'Y',
    'AVSZIP' => 'Y',
    'AVSDATA' => 'YYY',
    'IAVS' => 'N',
    No PROCAVS

    Passes (would fail on full)
    const line1 = "24285 Elm" Y
    const postal_code = "94303" N
    'AVSADDR' => 'Y',
    'AVSZIP' => 'N',
    'AVSDATA' => 'YNY',

    Passes (would fail on full)
    const line1 = "49354 Maple" N
    const postal_code = "00382" Y

    'AVSADDR' => 'N',
    'AVSZIP' => 'Y',
    'AVSDATA' => 'NYY',
    'PROCAVS' => 'Z',

    const line1 = "79232 Maple" X
    const postal_code = "00382" Y
    'AVSADDR' => 'X',
    'AVSZIP' => 'X',
    'AVSDATA' => 'XXN',
    'PROCAVS' => 'U',

    const line1 = "49354 Main" N
    const postal_code = "94303" N
    AVSADDR=N
    AVSZIP=N
    PROCAVS=N
  */
export default function CheckoutError() {
  const searchParams = useSearchParams();
  let responseMessage = searchParams?.get('RESPMSG') ?? '';
  const result = searchParams?.get('RESULT') ?? '';
  const avsAddr = searchParams?.get('AVSADDR') ?? '';
  const avsZip = searchParams?.get('AVSZIP') ?? '';
  const isAvsZipAddrBothN = avsAddr === 'N' && avsZip === 'N';
  const isAvsZipAddrBothX = avsAddr === 'X' && avsZip === 'X';
  const isOneOfAvsZipAddrN = avsAddr === 'N' || avsZip === 'N';
  const isOneOfAvsZipAddrX = avsAddr === 'X' || avsZip === 'X';
  const extraMessage = generateExtraMessage(result);
  const pathname = usePathname(); // Gets the current path
  const queryString = searchParams.toString();
  const fullUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
  const redirectUrl = `${coverlandUrl}${fullUrl}`;
  const [isClient, setIsClient] = useState(false);

  responseMessage = 'Approved' ? 'Something went wrong' : responseMessage;
  useEffect(() => {
    setIsClient(true);
    if (window && window.top && window.top !== window.self) {
      window.top.location.href = redirectUrl;
    }
  }, []);

  return (
    <>
      {isClient && window && window.top && window.top !== window.self ? (
        <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin" />
      ) : (
        <>
          <h2>There was an error with your checkout</h2>
          <p>Please try again or contact our support team</p>
          <p>
            Error:{' '}
            {isOneOfAvsZipAddrN ||
            isAvsZipAddrBothN ||
            isAvsZipAddrBothX ||
            isOneOfAvsZipAddrX
              ? 'Card verification failed. Please check your billing address.'
              : responseMessage}
          </p>
          <p>{extraMessage}</p>
        </>
      )}
    </>
  );
}
function generateExtraMessage(result: string) {
  switch (result) {
    case '7':
      return 'If you did not have a successful purchase, try opening a new tab, or use incognito mode.';
    case '25':
      return 'We do not accept this payment. Please try another provider.';
    case '109':
      return 'Try again in a minute.';
    default:
      return '';
  }
}
