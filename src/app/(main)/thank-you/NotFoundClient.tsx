'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function NotFoundClient() {
  const pathname = usePathname(); // Gets the current path
  const searchParams = useSearchParams(); // Gets the search params object
  const queryString = searchParams.toString();
  const fullUrl = `${pathname}${queryString ? `?${queryString}` : ''}`;
  return (
    <div>
      Clien shit
      <div>{fullUrl}</div>
    </div>
  );
}
