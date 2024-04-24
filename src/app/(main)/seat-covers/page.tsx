import { TPathParams } from '@/utils';
import SeatCoverDataWrapper from './components/SeatCoverDataWrapper';
import {
  TSeatCoverDataDB,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';

export async function generateStaticParams() {
  return [{ coverType: 'leather' }];
}

export async function generateMetadata() {
  return {
    title: `Seat Covers, Custom Fit - Coverland`,
    description: `Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
    alternates: {
      canonical: '/seat-covers',
    },
  };
}

export default async function SeatCoversPage({
  params,
}: {
  params: TPathParams;
}) {
  let modelData: TSeatCoverDataDB[] = [];

  try {
    modelData = await getSeatCoverProductsByDisplayColor({
      type: params.productType,
    });
  } catch (error) {
    console.error('Leatherette Error: ', error);
  }

  return <SeatCoverDataWrapper modelData={modelData} params={params} />;
}
