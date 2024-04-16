import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  CAR_COVERS_URL_PARAM,
  PREMIUM_PLUS_URL_PARAM,
  PREMIUM_URL_PARAM,
  SEAT_COVERS_URL_PARAM,
  STANDARD_PRO_URL_PARAM,
  STANDARD_URL_PARAM,
  SUV_COVERS_URL_PARAM,
  TRUCK_COVERS_URL_PARAM,
  SEAT_COVERS_LEATHER_URL_PARAM,
} from './lib/constants';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const segments = pathname.split('/').filter(Boolean);

  const productTypes = [
    CAR_COVERS_URL_PARAM,
    SUV_COVERS_URL_PARAM,
    TRUCK_COVERS_URL_PARAM,
  ];
  const coverTypes = [PREMIUM_PLUS_URL_PARAM];
  const outdatedTypes = [
    PREMIUM_URL_PARAM,
    STANDARD_PRO_URL_PARAM,
    STANDARD_URL_PARAM,
    'coupon-codes',
    'geo-car-covers',
  ];
  const homeRedirects = ['faqs', 'blog'];

  const PREMIUM_PLUS_REDIRECT = NextResponse.redirect(
    new URL(`/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/`, request.url),
    301
  );

  const HOME_REDIRECT = NextResponse.redirect(new URL(`/`, request.url), 301);
  const SEAT_COVERS_LEATHER_REDIRECT = NextResponse.redirect(
    new URL(`/seat-covers/leather`, request.url),
    301
  );

  const startSegment = segments[0];
  const makeSegment = segments[2];
  const modelSegment = segments[3];
  const isVehicleCover =
    startSegment === CAR_COVERS_URL_PARAM ||
    startSegment === SUV_COVERS_URL_PARAM ||
    startSegment === TRUCK_COVERS_URL_PARAM;

  const unwantedSymbols = [',-', ',', '(', ')', '.', '&-', ',-', '-,'];

  const segmentHasUnwantedSymbol = (segment: string) => {
    for (const uSymbol of unwantedSymbols) {
      if (segment.includes(uSymbol)) {
        return true;
      }
    }
    return false;
  };

  const removeUnwantedSymbols = (modelParam: string) => {
    let newString = modelParam;
    for (const uSymbol of unwantedSymbols) {
      newString = newString.replace(uSymbol, '');
    }
    return newString;
  };

  if (productTypes.includes(startSegment)) {
    // Has Product Type, but segments does not have coverType
    if (segments.length === 1) {
      return NextResponse.redirect(
        new URL(`/${startSegment}/${PREMIUM_PLUS_URL_PARAM}`, request.url),
        301
      );
      // Redirect outdated types to premium-plus
    } else if (outdatedTypes.some((type) => segments.includes(type))) {
      return NextResponse.redirect(
        new URL(
          `/${startSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }

    // Checking make segment
    else if (
      makeSegment &&
      segmentHasUnwantedSymbol(makeSegment) &&
      isVehicleCover
    ) {
      const newMakeSegment = removeUnwantedSymbols(makeSegment);
      return NextResponse.redirect(
        // Slicing modelSegment from url and replacing it with new segment
        new URL(
          `/${startSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 2).join('/')}${newMakeSegment}/${segments.slice(3).join('/')}${search}`,
          request.url
        ),
        301
      );
    }

    // Checking model segment
    else if (
      modelSegment &&
      segmentHasUnwantedSymbol(modelSegment) &&
      isVehicleCover
    ) {
      const newModelSegment = removeUnwantedSymbols(modelSegment);
      // Removing specific cases from model
      return NextResponse.redirect(
        // Slicing modelSegment from url and replacing it with new segment
        new URL(
          `/${startSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 3)}/${newModelSegment}/${segments.slice(4)}/${search}`,
          request.url
        ),
        301
      );
    }
    // Checking if segments are not in cover type
    else if (
      segments.length > 1 &&
      !coverTypes.some((type) => segments.includes(type))
    ) {
      console.log('Before In Cover Type Check');

      return NextResponse.redirect(
        new URL(
          `/${startSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }
  } else if (outdatedTypes.includes(startSegment)) {
    return PREMIUM_PLUS_REDIRECT;
  } else if (homeRedirects.includes(startSegment)) {
    return HOME_REDIRECT;
  } else if (pathname.toLowerCase().startsWith(`/${PREMIUM_PLUS_URL_PARAM}`)) {
    return PREMIUM_PLUS_REDIRECT;
  } else if (
    segments.length === 1 &&
    pathname.toLowerCase().startsWith(`/${SEAT_COVERS_URL_PARAM}`)
  ) {
    return SEAT_COVERS_LEATHER_REDIRECT;
  }

  // if (isVehicleCover && modelSegment) {
  //   newModelSegment = modelSegment.replace(',', '');
  //   console.log('New Segment: ', newModelSegment);
  //   console.log(
  //     'Concat URL: ',
  //     `/${startSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 3).join('/')}/${newModelSegment}/${segments.slice(4).join('/')}${search}`
  //   );
  // }

  // Removing commas from model name

  return NextResponse.next();
}
