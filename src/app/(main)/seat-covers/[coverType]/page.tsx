import { notFound } from 'next/navigation';
import { TPathParams } from '../../utils';
import SeatCoverDataWrapper from '../components/SeatCoverDataWrapper';
import {
  TSeatCoverDataDB,
  getSeatCoverProductData,
  getSeatCoverProductsByDisplayColor,
} from '@/lib/db/seat-covers';
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ coverType: 'leather' }];
}

export async function generateMetadata({ params }: { params: TPathParams }) {
  return {
    title: `Seat Covers, Custom Fit - Coverland`,
    description: `Seat Covers ᐉ Coverland ⭐ Free, Same-Day Shipping ✔️ Free Returns & Purchase Protection ✔️ Made from premium quality, heavy-duty materials with a soft inner fabric.`,
  };
}

const coverTypes = ['leather'];
export default async function Leatherette({ params }: { params: TPathParams }) {
  if (!coverTypes.includes(params.coverType as string)) {
    return notFound();
  }
  let modelData: TSeatCoverDataDB[] = [];

  try {
    modelData = await getSeatCoverProductsByDisplayColor({
      type: 'Seat Covers',
    });
  } catch (error) {
    console.error('Leatherette Error: ', error);
  }
  return <SeatCoverDataWrapper modelData={modelData} params={params} />;
}
