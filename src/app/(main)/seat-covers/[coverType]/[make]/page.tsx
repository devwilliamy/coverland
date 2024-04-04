import { getAllMakes } from '@/lib/db';
import { notFound } from 'next/navigation';
import { TPathParams } from '@/app/(main)/utils';
import { deslugify } from '@/lib/utils';
import SeatCoverDataWrapper from '../../components/SeatCoverDataWrapper';
import {
  getSeatCoverProductData,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';

export type TCarCoverSlugParams = {
  make: string;
  model: string;
  year: string;
  productType: string;
};

//TODO: Refactor code so we can generate our dynamic paths as static HTML for performance

// export async function generateStaticParams({
//     params: { productType, coverType, make },
//   }: {
//     params: { productType: string; coverType: string; make: string };
//   }) {
//     const modelData = await getAllModels({
//       type: productType,
//       cover: coverType,
//       make: make,
//     });

//     return modelData.filter(Boolean).map((model) => ({
//       model: model,
//     }));
//   }

export async function generateMetadata({ params }: { params: TPathParams }) {
  const make = deslugify(params.make || '');
  return {
    title: `${make} Seat Covers, Custom Fit - Coverland`,
    description: `${make} Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

export default async function SeatCoverDataLayer({
  params,
}: {
  params: TPathParams;
}) {
  let modelData = [];
  try {
    // modelData = await getSeatCoverProductData({
    //   type: 'Seat Covers',
    //   cover: params.seatType,
    //   make: params.make,
    //   model: params.model,
    // });

    modelData = await getSeatCoverProductsByDisplayColor({
      type: 'Seat Covers',
      make: params.make,
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
