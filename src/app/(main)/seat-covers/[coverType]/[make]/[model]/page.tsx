import { getAllMakes } from '@/lib/db';
import { notFound } from 'next/navigation';
import { TPathParams } from '@/utils';
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
//   params: { productType, coverType, make },
// }: {
//   params: { productType: string; coverType: string; make: string };
// }) {
//   const modelData = await getAllModels({
//     type: productType,
//     cover: coverType,
//     make: make,
//   });

//   return modelData.filter(Boolean).map((model) => ({
//     model: model,
//   }));
// }

export async function generateMetadata({ params }: { params: TPathParams }) {
  const make = deslugify(params.make || '');
  const model = deslugify(params.model || '');
  const productType = deslugify(params.productType || '');
  return {
    title: `${make} ${model} Seat Covers, Custom Fit - Coverland`,
    description: `${make} ${model} Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: `/${productType}/${make}/${model}`,
    },
  };
}

export default async function SeatCoverDataLayer({
  params,
}: {
  params: TPathParams;
}) {
  let modelData = [];
  try {
    modelData = await getSeatCoverProductsByDisplayColor({
      type: 'Seat Covers',
      cover: 'Leather',
      make: params.make,
      model: params.model,
    });

    if (!modelData || modelData.length === 0) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }
  return <SeatCoverDataWrapper modelData={modelData} params={params} />;
}
