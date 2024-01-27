import {
  TProductData,
  TReviewData,
  fetchReviewData,
  getAllProductData,
} from '@/lib/db';
import CarSelector from '@/components/PDP/CarSelector';
import parentGenerationData from '@/data/parent_generation_data.json';
import { redirect } from 'next/navigation';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { colorOrder } from '@/lib/constants';
import { compareRawStrings } from '@/lib/utils';

export type TPDPPathParams = { productType: string; product: string[] };

export type TPDPQueryParams = {
  submodel: string | undefined;
  second_submodel: string | undefined;
};

export type TSkuJson = typeof parentGenerationData;

export default async function ProductPDP({
  params: pathParams,
  searchParams,
}: {
  params: TPDPPathParams;
  searchParams: TPDPQueryParams;
}) {
  const submodelParam = searchParams.submodel;
  const secondSubmodelParam = searchParams.second_submodel;
  const make = pathParams?.product[0];
  const model = pathParams?.product[1];
  const year = pathParams?.product[2]?.slice(0, 9);
  if (
    pathParams.productType !== 'car-covers' &&
    pathParams.productType !== 'suv-covers' &&
    pathParams.productType !== 'truck-covers' &&
    pathParams.productType !== 'van-covers'
  ) {
    redirect('/404');
  }
  // refreshRoute('/');
  const initialProductData = await getAllProductData({
    type: pathParams.productType,
    make,
    model,
    year,
  });

  const reviewData: TReviewData[] | null =
    (await fetchReviewData(searchParams, pathParams)) ?? [];

  // console.log(reviewData);

  if (!initialProductData) {
    console.error('Error fetching data:', initialProductData);
  }

  let modelData = initialProductData;

  modelData = modelData
    .filter((product) => product.msrp && product.price)
    .sort((a, b) => {
      let colorIndexA = colorOrder.indexOf(a?.display_color as string);
      let colorIndexB = colorOrder.indexOf(b?.display_color as string);

      if (colorIndexA === -1) colorIndexA = Infinity;
      if (colorIndexB === -1) colorIndexB = Infinity;

      return colorIndexA - colorIndexB;
    });

  if (submodelParam) {
    modelData = modelData.filter((product) =>
      compareRawStrings(product.submodel1, submodelParam)
    );
  }

  if (secondSubmodelParam) {
    modelData = modelData.filter((product) =>
      compareRawStrings(product.submodel2, secondSubmodelParam)
    );
  }

  if (modelData?.length === 0) {
    redirect('/');
  }

  const submodels = Array.from(
    new Set(modelData.map((model) => model.submodel1))
  ).filter(Boolean) as string[];

  const secondSubmodels = Array.from(
    new Set(modelData.map((model) => model.submodel2))
  ).filter(Boolean) as string[];

  return (
    <>
      <CarSelector
        modelData={modelData as TProductData[]}
        pathParams={pathParams}
        searchParams={searchParams}
        submodels={submodels}
        secondSubmodels={secondSubmodels}
        reviewData={reviewData}
        key={submodelParam ?? ''}
      />
      <div
        id="product-details"
        className="flex h-auto w-full max-w-[1280px] flex-col items-center justify-center lg:py-[110px]"
        // flex flex-col justify-center items-center max-w-[1280px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
      </div>
    </>
  );
}

// function BreadCrumbsTitle() {
//   return (
//     <div className="mt-8 w-full">
//       <h6 className="text-sm font-normal text-[#343434]">Home / Car Covers</h6>
//     </div>
//   );
// }
