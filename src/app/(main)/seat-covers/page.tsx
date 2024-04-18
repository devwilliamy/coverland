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
    title: `Shipping Policy – Coverland`,
    description: `Learn about our efficient shipping policy designed to deliver your car cover or seat cover order promptly and reliably. From shipping methods to delivery times, we prioritize your convenience every step of the way.`,
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
