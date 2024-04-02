import { TPathParams } from '../utils';
import SeatCoverDataWrapper from './components/SeatCoverDataWrapper';
import {
  TSeatCoverDataNewDB,
  getSeatCoverProductData,
} from '@/lib/db/seat-covers';

export async function generateStaticParams() {
  return [{ coverType: 'leather' }];
}

export default async function SeatCoversPage({ params }: { params: TPathParams }) {
  let modelData: TSeatCoverDataNewDB[] = [];

  try {
    modelData = await getSeatCoverProductData({ type: params.productType });
  } catch (error) {
    console.error('Leatherette Error: ', error);
  }

  return <SeatCoverDataWrapper modelData={modelData} params={params} />;
}
