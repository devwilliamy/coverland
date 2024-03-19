import { useParams } from 'next/navigation';

type ParamsType = {
  make?: string;
  model?: string;
  year?: string;
  productType?: string;
  coverType?: string;
};
function useDetermineType() {
  const params = useParams<ParamsType>();

  // Product Types
  const productType = params?.productType;
  const isTruckCover = productType === 'truck-covers';
  const isSUVCover = productType === 'suv-covers';
  const isCarCover = productType === 'car-covers';

  // Cover Types
  const coverType = params?.coverType;
  const isPremiumPlus = coverType === 'premium-plus';
  const isPremium = coverType === 'premium';
  const isStandardPro = coverType === 'standard-pro';
  const isStandard = coverType === 'standard';
  const isDefaultCoverType = isPremiumPlus || coverType === undefined;
  const isPremiumType = isDefaultCoverType || isPremium;
  const isStandardType = isStandard || isStandardPro;

  const { make, model } = params as ParamsType;

  return {
    make,
    model,
    productType,
    isCarCover,
    isSUVCover,
    isTruckCover,
    coverType,
    isPremiumPlus,
    isPremium,
    isStandardPro,
    isStandard,
    isDefaultCoverType,
    isPremiumType,
    isStandardType,
  };
}

export default useDetermineType;
