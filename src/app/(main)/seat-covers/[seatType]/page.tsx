import { notFound } from 'next/navigation';
import { TPathParams } from '../../utils';
import SeatCoverDataWrapper from '../components/SeatCoverDataWrapper';
import {
  TSeatCoverDataNewDB,
  getSeatCoverProductData,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ seatType: 'leather' }];
}

const seatTypes = ['leather'];
export default async function Leatherette({ params }: { params: TPathParams }) {
  if (!seatTypes.includes(params.seatType as string)) {
    return notFound();
  }
  let modelData: TSeatCoverDataNewDB[] = [];

  try {
    modelData = await getSeatCoverProductsByDisplayColor({
      type: 'Seat Covers',
    });
  } catch (error) {
    console.error('Leatherette Error: ', error);
  }
  return <SeatCoverDataWrapper modelData={modelData} params={params} />;
}
