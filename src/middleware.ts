import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  CAR_COVERS_URL_PARAM,
  PREMIUM_PLUS_URL_PARAM,
  PREMIUM_URL_PARAM,
  SEAT_COVERS_LEATHER_URL_PARAM,
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
  const outdatedCoverTypes = [
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
  const WILLY_SPEEDWAY_REDIRECT = NextResponse.redirect(
    new URL(
      `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/willys/speedway/1939-1942`,
      request.url
    ),
    301
  );
  const SEAT_COVERS_LEATHER_REDIRECT = NextResponse.redirect(
    new URL(`/seat-covers/leather`, request.url),
    301
  );

  // Ex: car-covers or seat-covers
  let slashStartSegment = segments[0];
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
  const specificUrlsObj: Record<string, string> = {
    'chevrolet/camaro/1982-1988': 'chevrolet/camaro/1982-1992',
    'chevrolet/camaro/1989-2002': 'chevrolet/camaro/1993-2002',
    'chevrolet/el-camino/1964-1972': 'chevrolet/el-camino/1964-1967',
    'ford/mustang/1979-1986': 'ford/mustang/1979-2004',
    'hyundai/ioniq-6/2023': 'hyundai/ioniq-6/2023-2024',
    'lexus/es/2013-2023': 'lexus/es/2013-2024',
    'e-class/2017-2023': 'e-class/2017-2025',
    'mercedes/e-class/2017-2023': 'mercedes-benz/e-class/2017-2025',
    'mitsubishi/mirage/2014-2022': 'mitsubishi/mirage/2014-2024',
    'mitsubishi/mirage-g4/2017-2022': 'mitsubishi/mirage-g4/2017-2024',
    'pontiac/grand-am/1992-2006': 'pontiac/grand-am/1992-2005',
    'nash,-hudson/metropolitan/1954-1962': 'nashhudson/metropolitan/1954-1962',
    'ford/mustang/2005-2024': 'ford/mustang/2005-2025',
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

  const firstSegIsNum = !isNaN(Number(firstHyphenSegment));
  const thirdSegIsNum = !isNaN(Number(thirdHyphenSegment));

  // Checking url of structure /{year}-{make}-{model}-{vehicle-type} or /{make}-{model}-{year}-{vehicle-type}
  if (isVehicleCover && (firstSegIsNum || thirdSegIsNum)) {
    const determineNextResponse = async () => {
      let urlString = '/';
      let make = '';
      let model = '';
      let year;
      //     /{year}-{make}-{model}-{vehicle-type}
      if (firstSegIsNum && firstHyphenSegment.length === 4) {
        const { year_generation } = await getProductWithoutType({
          year: firstHyphenSegment,
          make: secondHyphenSegment,
          model: thirdHyphenSegment,
        });
        make = secondHyphenSegment;
        model = thirdHyphenSegment;
        year = year_generation;
      }
      //    /{make}-{model}-{year}-{vehicle-type}
      else if (thirdSegIsNum && thirdHyphenSegment.length === 4) {
        const { year_generation } = await getProductWithoutType({
          year: thirdHyphenSegment,
          make: firstHyphenSegment,
          model: secondHyphenSegment,
        });
        make = firstHyphenSegment;
        model = secondHyphenSegment;
        year = year_generation;
      }
      // Generate URL string for the NEXT response
      urlString +=
        CAR_COVERS_URL_PARAM +
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

  // Checks make for mercedes
  if (segments[2] === 'mercedes') {
    return redirectMercedes(segments, search, isVehicleCover, request.url);
  }

  // Has Product Type, and if segments does not have coverType
  // MMY = Make Model Year
  if (productTypes.includes(slashStartSegment)) {
    for (const segmentKey in specificUrlsObj) {
      const incomingMMYSegment = `${slashMakeSegment}/${slashModelSegment}/${slashYearSegment}`;
      if (segmentKey === incomingMMYSegment) {
        const correctMMYSegment = specificUrlsObj[segmentKey];
        return NextResponse.redirect(
          new URL(
            `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${correctMMYSegment}`,
            request.url
          ),
          301
        );
      }
    }

    if (segments.length === 1) {
      return NextResponse.redirect(
        new URL(
          `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}`,
          request.url
        ),
        301
      );
    }

    // Redirect outdated types to premium-plus
    else if (outdatedCoverTypes.some((type) => segments.includes(type))) {
      return NextResponse.redirect(
        new URL(
          `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}${search}`,
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
      const objectLength = Object.keys(paramsObj).length;
      let urlString = `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${slashMakeSegment.toLowerCase()}/${slashModelSegment.toLowerCase()}/`;

      if (objectLength > 0 && !paramsObj.submodel && !paramsObj.submodel2) {
        return NextResponse.redirect(
          new URL(
            `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}`,
            request.url
          ),
          301
        );
      }
      if (objectLength > 2 && paramsObj.submodel && paramsObj.submodel2) {
        return NextResponse.redirect(
          new URL(
            `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}?submodel=${paramsObj.submodel}&submodel2=${paramsObj.submodel2}`,
            request.url
          ),
          301
        );
      }
      if (paramsObj.year) {
        urlString += '/' + paramsObj.year + search;
        return NextResponse.redirect(new URL(urlString, request.url), 301);
      }
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
          `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments[2]}/${newMakeSegment}/${segments.slice(3).join('/')}${search}`,
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
          `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2, 3)}/${newModelSegment}/${segments.slice(4)}/${search}`,
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
          `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}${search}`,
          request.url
        ),
        301
      );
    }
  } else if (pathname.toLowerCase() === '/willys-speedway-car-covers') {
    return WILLY_SPEEDWAY_REDIRECT;
  } else if (outdatedCoverTypes.includes(slashStartSegment)) {
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

  if (
    slashStartSegment === SUV_COVERS_URL_PARAM ||
    slashStartSegment === TRUCK_COVERS_URL_PARAM
  ) {
    const searchObj = generateSearchObj();

    if (searchObj.submodel && searchObj.submodel2) {
      return NextResponse.redirect(
        new URL(
          `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}?submodel=${searchObj.submodel}&submodel2=${searchObj.submodel2}`,
          request.url
        ),
        301
      );
    }
    return NextResponse.redirect(
      new URL(
        `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/${segments.slice(2).join('/')}`,
        request.url
      ),
      301
    );
  }

  return NextResponse.next();
}

/**
 * 6/17/24: Mercedes got changed to Mercedes Benz, need to redirect
 * @param segments - ex: ['car-covers', 'premium-plus', 'mercedes']
 */
const redirectMercedes = (
  segments: string[],
  search: string,
  isVehicleCover: boolean,
  requestUrl: string
) => {
  if (isVehicleCover) {
    return NextResponse.redirect(
      new URL(
        `/${CAR_COVERS_URL_PARAM}/${PREMIUM_PLUS_URL_PARAM}/mercedes-benz/${segments.slice(3).join('/')}${search}`,
        requestUrl
      ),
      301
    );
  } else {
    return NextResponse.redirect(
      new URL(
        `/${SEAT_COVERS_LEATHER_URL_PARAM}/mercedes-benz/${segments.slice(3).join('/')}${search}`,
        requestUrl
      ),
      301
    );
  }
};
