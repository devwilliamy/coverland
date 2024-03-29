import { TPathParams, TQueryParams } from '../../utils';
import { TSeatCoverDataNewDB } from '@/lib/db/seat-covers';
import SeatCoverSelectionProvider from '@/contexts/SeatCoverContext';
import SeatCovers from './SeatCover';


export default async function SeatCoverDataWrapper({
  modelData,
  params,
  searchParams,
}: {
  modelData: TSeatCoverDataNewDB[];
  params: TPathParams;
  searchParams?: TQueryParams | undefined;
}) {
  const initialState = {
    modelData,
    params,
    searchParams,
  };
  return (
    <SeatCoverSelectionProvider initialState={initialState}>
      <SeatCovers params={params} searchParams={searchParams} />
    </SeatCoverSelectionProvider>
  );
}
