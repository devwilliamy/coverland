import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  const segments = pathname.split('/').filter(Boolean);
  console.log('Path 1', segments);
  const productTypes = ['car-covers', 'suv-covers', 'truck-covers'];
  const coverTypes = ['premium-plus'];
  const outdatedTypes = ['premium', 'standard-pro', 'standard', 'coupon-codes'];
  const homeRedirects = ['faqs'];

  const PREMIUM_PLUS_REDIRECT = NextResponse.redirect(
    new URL(`/car-covers/premium-plus/`, request.url),
    301
  );

  const HOME_REDIRECT = NextResponse.redirect(new URL(`/`, request.url), 301);

  if (productTypes.includes(segments[0])) {
    if (
      segments.length === 1 &&
      !coverTypes.some((type) => segments.includes(type))
    ) {
      return NextResponse.redirect(
        new URL(`/${segments[0]}/premium-plus`, request.url),
        301
      );
    }
    if (outdatedTypes.some((type) => segments.includes(type))) {
      console.log(segments);

      console.log(
        'Path 2',
        `/${segments[0]}/premium-plus/${segments.slice(2).join('/')}${search}`
      );

      return NextResponse.redirect(
        new URL(
          `/${segments[0]}/premium-plus/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }

    if (
      segments.length > 1 &&
      !coverTypes.some((type) => segments.includes(type))
    ) {
      return NextResponse.redirect(
        new URL(
          `/${segments[0]}/premium-plus/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }
  } else if (outdatedTypes.includes(segments[0])) {
    return PREMIUM_PLUS_REDIRECT;
  } else if (homeRedirects.includes(segments[0])) {
    return HOME_REDIRECT;
  } else if (pathname.startsWith('/premium-plus')) {
    return PREMIUM_PLUS_REDIRECT;
  }
  return NextResponse.next();
}
