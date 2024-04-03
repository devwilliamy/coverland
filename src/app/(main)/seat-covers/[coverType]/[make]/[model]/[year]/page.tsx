import { getAllMakes } from '@/lib/db';
import { notFound } from 'next/navigation';
import { TPathParams } from '@/app/(main)/utils';
import { deslugify } from '@/lib/utils';

import {
  getSeatCoverProductData,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
import SeatCoverDataWrapper from '@/app/(main)/seat-covers/components/SeatCoverDataWrapper';

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

// export async function generateStaticParams({
//   params: { productType, coverType, make, model },
// }: {
//   params: {
//     productType: string;
//     coverType: string;
//     make: string;
//     model: string;
//   };
// }) {
//   const yearData = await getAllYears({
//     type: productType,
//     cover: coverType,
//     make: make,
//     model: model,
//   });

//   return yearData.filter(Boolean).map((year) => ({
//     year: year,
//   }));
// }

export async function generateMetadata({ params }: { params: TPathParams }) {
  const productType = deslugify(params.productType);
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  const year = deslugify(params.year || '');
  return {
    title: `${year} ${make} ${model} ${productType}, Custom Fit - Coverland`,
    description: `${year} ${make} ${model} ${productType} ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default async function SeatCoverDataLayer({
  params,
  searchParams,
}: {
  params: TPathParams;
  searchParams: { submodel?: string; second_submodel?: string };
}) {
  let modelData = [];
  try {
    // modelData = await getSeatCoverProductData({
    //   type: 'Seat Covers',
    //   cover: params.seatType,
    //   make: params.make,
    // model: params.model,
    // year: params.year,
    // });
    modelData = await getSeatCoverProductsByDisplayColor({
      type: 'Seat Covers',
      make: params.make,
      model: params.model,
      year: params.year,
    });

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }
  return <SeatCoverDataWrapper modelData={modelData} params={params} searchParams={searchParams} />;
}
