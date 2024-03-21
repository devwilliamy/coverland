import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  const segments = pathname.split('/').filter(Boolean);
  const productTypes = ['car-covers', 'suv-covers', 'truck-covers'];
  const coverTypes = ['premium', 'premium-plus', 'standard', 'standard-pro'];

  if (productTypes.includes(segments[0])) {
    if (
      segments.length > 1 &&
      !coverTypes.some((type) => segments.includes(type))
    ) {
      return NextResponse.redirect(
        new URL(
          `/${segments[0]}/premium-plus/${segments.slice(1).join('/')}${search}`,
          request.url
        ),
        301
      );
    }
  }
  return NextResponse.next();
}
