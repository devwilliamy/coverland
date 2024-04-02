import { TPathParams } from '../utils';
import SeatCoverDataWrapper from './components/SeatCoverDataWrapper';
import {
  TSeatCoverDataNewDB,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';

export async function generateStaticParams() {
  return [{ seatType: 'leather' }];
}

export default async function SeatCoversPage({
  params,
}: {
  params: TPathParams;
}) {
  let modelData: TSeatCoverDataNewDB[] = [];

  try {
    modelData = await getSeatCoverProductsByDisplayColor({
      type: params.productType,
    });
  } catch (error) {
    console.error('Leatherette Error: ', error);
  }

  return <SeatCoverDataWrapper modelData={modelData} params={params} />;
}
