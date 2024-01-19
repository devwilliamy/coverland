import {
  TProductData,
  TReviewData,
  fetchPDPData,
  fetchReviewData,
} from '@/lib/db';
import CarSelector from '@/components/PDP/CarSelector';
import skuDisplayData from '@/data/skuDisplayData.json';
import { redirect } from 'next/navigation';
import { ExtraProductDetails } from '@/components/PDP/OtherDetails';
import { colorOrder } from '@/lib/constants';
import { deslugify, slugify } from '@/lib/utils';

export type TPDPPathParams = { productType: string; product: string[] };

export type TPDPQueryParams = {
  submodel: string | undefined;
  second_submodel: string | undefined;
};

export type TSkuJson = typeof skuDisplayData;

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
  const year = pathParams?.product[2];
  if (
    pathParams.productType !== 'car-covers' &&
    pathParams.productType !== 'suv-covers' &&
    pathParams.productType !== 'truck-covers' &&
    pathParams.productType !== 'van-covers'
  ) {
    redirect('/404');
  }
  const initialProductData = await fetchPDPData(pathParams);

  const reviewData: TReviewData[] | null =
    (await fetchReviewData(searchParams, pathParams)) ?? [];

  if (!initialProductData) {
    redirect('/');
  }

  const parentGeneration = skuDisplayData.find(
    (row) =>
      row.year_generation === year &&
      slugify(row.make) === make &&
      slugify(row.model) === model
  );

  const jsonForSku = (fk: number) => {
    return skuDisplayData.find((row) => row.fk === fk);
  };

  const generationDefaultChildren = parentGeneration?.generation_default
    ? initialProductData.filter((product) => {
        return (
          jsonForSku(product.fk as number)?.generation_default ===
          parentGeneration?.generation_default
        );
      })
    : initialProductData.filter(
        (product) => product.fk === parentGeneration?.fk
      );

  const productsWithSubmodels = generationDefaultChildren.filter(
    (product) =>
      product.submodel1 &&
      generationDefaultChildren.map((p) => p.fk).includes(product.fk)
  );
  const submodels = Array.from(
    new Set(productsWithSubmodels.map((product) => product.submodel1))
  ).filter(Boolean) as string[];

  const secondSubmodels = Array.from(
    new Set(productsWithSubmodels.map((product) => product.submodel2))
  ).filter(Boolean) as string[];

  let modelData = submodelParam
    ? productsWithSubmodels
    : generationDefaultChildren;

  // !year && (modelData = initialProductData);

  modelData = modelData
    .filter((product) => product.msrp && product.price)
    .sort((a, b) => {
      let colorIndexA = colorOrder.indexOf(a?.display_color as string);
      let colorIndexB = colorOrder.indexOf(b?.display_color as string);

      if (colorIndexA === -1) colorIndexA = Infinity;
      if (colorIndexB === -1) colorIndexB = Infinity;

      return colorIndexA - colorIndexB;
    });

  if (secondSubmodelParam) {
    modelData = modelData.filter(
      (product) => product.submodel2?.toLowerCase() === secondSubmodelParam
    );
  }

  if (modelData?.length === 0) {
    redirect('/');
  }

  return (
    <>
      <CarSelector
        modelData={modelData as TProductData[]}
        pathParams={pathParams}
        searchParams={searchParams}
        submodels={submodels}
        secondSubmodels={secondSubmodels}
        reviewData={reviewData}
        parentGeneration={parentGeneration}
        key={submodelParam ?? ''}
      />
      <div
        id="product-details"
        className="h-auto w-full"
        // flex flex-col justify-center items-center max-w-[1440px] py-4 lg:py-20 px-4 md:px-20"
      >
        <ExtraProductDetails reviewData={reviewData} />
      </div>
    </>
  );
}

function BreadCrumbsTitle() {
  return (
    <div className="mt-8 w-full">
      <h6 className="text-sm font-normal text-[#343434]">Home / Car Covers</h6>
    </div>
  );
}
