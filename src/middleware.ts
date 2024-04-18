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
} from './lib/constants';
import { getProductWithoutType } from './lib/db';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const segments = pathname.split('/').filter(Boolean);
  const hyphenSegments = pathname.slice(1).split('-').filter(Boolean);

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

  const slashStartSegment = segments[0];
  const firstHyphenSegment = hyphenSegments[0];
  const secondHyphenSegment = hyphenSegments[1];
  const thirdHyphenSegment = hyphenSegments[2];
  const lastHyphenSegment = hyphenSegments[hyphenSegments.length - 1];
  const secondToLastHyphenSegment = hyphenSegments[hyphenSegments.length - 2];
  const hyphenTwoEndSegments = [secondToLastHyphenSegment, lastHyphenSegment];
  const endHyphenString = hyphenTwoEndSegments.join('-');
  const startsWithCarCoversAndPP = request.nextUrl.pathname
    .toString()
    .startsWith('/car-covers/premium-plus/');
  const startsWithSUVCoversAndPP = request.nextUrl.pathname
    .toString()
    .startsWith('/suv-covers/premium-plus/');
  const startsWithTruckCoversAndPP = request.nextUrl.pathname
    .toString()
    .startsWith('/truck-covers/premium-plus/');
  const urlHasPremiumPlus =
    startsWithCarCoversAndPP ||
    startsWithSUVCoversAndPP ||
    startsWithTruckCoversAndPP;
  const slashMakeSegment = urlHasPremiumPlus ? segments[2] : segments[1];
  const slashModelSegment = urlHasPremiumPlus ? segments[3] : segments[2];
  const slashYearSegment = urlHasPremiumPlus ? segments[4] : segments[3];
  const isVehicleCover =
    slashStartSegment === CAR_COVERS_URL_PARAM ||
    slashStartSegment === SUV_COVERS_URL_PARAM ||
    slashStartSegment === TRUCK_COVERS_URL_PARAM ||
    endHyphenString === CAR_COVERS_URL_PARAM ||
    endHyphenString === SUV_COVERS_URL_PARAM ||
    endHyphenString === TRUCK_COVERS_URL_PARAM;
  const unwantedSymbols = [',-', ',', '(', ')', '.', '&-', ',-', '-,'];
  const specificUrlObj: Record<string, string> = {
    'chevrolet/camaro/1982-1988': 'chevrolet/camaro/1982-1992',
    'chevrolet/camaro/1989-2002': 'chevrolet/camaro/1993-2002',
    'chevrolet/el-camino/1964-1972': 'chevrolet/el-camino/1964-1967',
    'ford/mustang/1979-1986': 'ford/mustang/1979-2004',
    'hyundai/ioniq-6/2023': 'hyundai/ioniq-6/2023-2024',
    'lexus/es/2013-2023': 'lexus/es/2013-2024',
    'e-class/2017-2023': 'e-class/2017-2025',
    'mercedes/e-class/2017-2023': 'mercedes/e-class/2017-2025',
    'mitsubishi/mirage/2014-2022': 'mitsubishi/mirage/2014-2024',
    'mitsubishi/mirage-g4/2017-2022': 'mitsubishi/mirage-g4/2017-2024',
    'pontiac/grand-am/1992-2006': 'pontiac/grand-am/1992-2005',
    'nash,-hudson/metropolitan/1954-1962': 'nashhudson/metropolitan/1954-1962',
  };

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

  const generateSearchObj = () => {
    const searchParams = search.replace('?', '').split('&').filter(Boolean);
    const searchParamObj: Record<string, string> = {};
    for (const paramCombination of searchParams) {
      const comb = paramCombination.split('=');
      searchParamObj[comb[0]] = comb[1];
    }
    return searchParamObj;
  };

  // Checking url of structure /{year}-{make}-{model}-{vehicle-type} or /{make}-{model}-{year}-{vehicle-type}
  if (
    isVehicleCover &&
    (!isNaN(Number(firstHyphenSegment)) || !isNaN(Number(thirdHyphenSegment)))
  ) {
    const determineNextResponse = async () => {
      let urlString = '/';
      let make = '';
      let model = '';
      let year;

      if (
        !isNaN(Number(firstHyphenSegment)) &&
        firstHyphenSegment.length === 4
      ) {
        await getProductWithoutType({
          year: firstHyphenSegment,
          make: secondHyphenSegment,
          model: thirdHyphenSegment,
        }).then((res) => {
          make = secondHyphenSegment;
          model = thirdHyphenSegment;
          year = res.year_generation;
        });
      } else if (
        !isNaN(Number(thirdHyphenSegment)) &&
        thirdHyphenSegment.length === 4
      ) {
        await getProductWithoutType({
          year: thirdHyphenSegment,
          make: firstHyphenSegment,
          model: secondHyphenSegment,
        }).then((res) => {
          make = firstHyphenSegment;
          model = secondHyphenSegment;
          year = res.year_generation;
        });
      }
      urlString +=
        endHyphenString +
        '/' +
        PREMIUM_PLUS_URL_PARAM +
        '/' +
        make +
        '/' +
        model +
        '/' +
        year;
      return NextResponse.redirect(new URL(urlString, request.url), 301);
    };
    return determineNextResponse();
  }

  // Has Product Type, but segments does not have coverType
  // MMY = Make Model Year
  if (productTypes.includes(slashStartSegment)) {
    for (const key in specificUrlObj) {
      const incomingMMYSegment = `${slashMakeSegment}/${slashModelSegment}/${slashYearSegment}`;
      if (key === incomingMMYSegment) {
        const correctMMYValue = specificUrlObj[key];
        return NextResponse.redirect(
          new URL(
            `/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}/${correctMMYValue}`,
            request.url
          ),
          301
        );
      }
    }

    if (segments.length === 1) {
      return NextResponse.redirect(
        new URL(`/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}`, request.url),
        301
      );
    }

    // Redirect outdated types to premium-plus
    else if (outdatedTypes.some((type) => segments.includes(type))) {
      return NextResponse.redirect(
        new URL(
          `/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }

    // Checking url of structure /{vehicleType}/{make}/{model}/?...year=1966-1976&...
    else if (
      isVehicleCover &&
      slashMakeSegment &&
      slashModelSegment &&
      search
    ) {
      const paramsObj = generateSearchObj();
      let urlString = `/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}/${slashMakeSegment.toLowerCase()}/${slashModelSegment.toLowerCase()}`;
      if (paramsObj.year) {
        urlString += '/' + paramsObj.year;
      }

      return NextResponse.redirect(new URL(urlString, request.url), 301);
    }

    // Checking make segment
    else if (
      slashMakeSegment &&
      segmentHasUnwantedSymbol(slashMakeSegment) &&
      isVehicleCover
    ) {
      const newMakeSegment = removeUnwantedSymbols(slashMakeSegment);
      return NextResponse.redirect(
        // Slicing modelSegment from url and replacing it with new segment
        new URL(
          `/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 2).join('/')}${newMakeSegment}/${segments.slice(3).join('/')}${search}`,
          request.url
        ),
        301
      );
    }

    // Checking model segment
    else if (
      slashModelSegment &&
      segmentHasUnwantedSymbol(slashModelSegment) &&
      isVehicleCover
    ) {
      const newModelSegment = removeUnwantedSymbols(slashModelSegment);
      // Removing specific cases from model
      return NextResponse.redirect(
        // Slicing modelSegment from url and replacing it with new segment
        new URL(
          `/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 3)}/${newModelSegment}/${segments.slice(4)}/${search}`,
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
      return NextResponse.redirect(
        new URL(
          `/${slashStartSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }
  } else if (outdatedTypes.includes(slashStartSegment)) {
    return PREMIUM_PLUS_REDIRECT;
  } else if (homeRedirects.includes(slashStartSegment)) {
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
  //     'Concat URL: ',
  //     `/${startSegment}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 3).join('/')}/${newModelSegment}/${segments.slice(4).join('/')}${search}`
  //   );
  // }

  // Removing commas from model name

  return NextResponse.next();
}
