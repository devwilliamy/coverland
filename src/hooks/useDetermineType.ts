import {
  CAR_COVERS_URL_PARAM,
  PREMIUM_PLUS_URL_PARAM,
  PREMIUM_URL_PARAM,
  SEAT_COVERS,
  SEAT_COVERS_URL_PARAM,
  SEAT_COVERS_URL_PARAM_WITH_SLASH,
  STANDARD_PRO_URL_PARAM,
  STANDARD_URL_PARAM,
  SUV_COVERS_URL_PARAM,
  TRUCK_COVERS_URL_PARAM,
} from '@/lib/constants';
import { useParams, usePathname } from 'next/navigation';

type ParamsType = {
  make?: string;
  model?: string;
  year?: string;
  productType?: string;
  coverType?: string;
};
function useDetermineType() {
  const params = useParams<ParamsType>();
  const pathname = usePathname();
  const { make, model, year } = params as ParamsType;

  // Product Types
  const isSeatCover = pathname.startsWith(SEAT_COVERS_URL_PARAM_WITH_SLASH);

  const productType = isSeatCover ? SEAT_COVERS_URL_PARAM : params?.productType;
  const isTruckCover = productType === TRUCK_COVERS_URL_PARAM;
  const isSUVCover = productType === SUV_COVERS_URL_PARAM;
  const isCarCover = productType === CAR_COVERS_URL_PARAM;
  const isVehicleCover = isCarCover || isSUVCover || isTruckCover;

  // Cover Types
  const coverType = params?.coverType;
  const isPremiumPlus = coverType === PREMIUM_PLUS_URL_PARAM;
  const isPremium = coverType === PREMIUM_URL_PARAM;
  const isStandardPro = coverType === STANDARD_PRO_URL_PARAM;
  const isStandard = coverType === STANDARD_URL_PARAM;
  const isDefaultCoverType = isPremiumPlus || coverType === undefined;
  const isPremiumType = isDefaultCoverType || isPremium;
  const isStandardType = isStandard || isStandardPro;
  const isModelPage = Boolean(productType && make && model && !year);
  const isYearPage = Boolean(productType && make && model && year);

  return {
    make,
    model,
    year,
    productType,
    isCarCover,
    isSUVCover,
    isTruckCover,
    isVehicleCover,
    isSeatCover,
    coverType,
    isPremiumPlus,
    isPremium,
    isStandardPro,
    isStandard,
    isDefaultCoverType,
    isPremiumType,
    isStandardType,
    isModelPage,
    isYearPage,
  };
}

export default useDetermineType;
