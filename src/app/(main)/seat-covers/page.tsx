import { TPathParams } from '../utils';
import SeatCoverDataWrapper from './components/SeatCoverDataWrapper';
import {
  TSeatCoverDataDB,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';

export async function generateStaticParams() {
  return [{ coverType: 'leather' }];
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
