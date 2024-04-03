import { TPathParams, TQueryParams } from '../../utils';
import { TSeatCoverDataDB } from '@/lib/db/seat-covers';
import SeatCoverSelectionProvider from '@/contexts/SeatCoverContext';
import SeatCovers from './SeatCovers';


export default async function SeatCoverDataWrapper({
  modelData,
  params,
  searchParams,
}: {
  modelData: TSeatCoverDataDB[];
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
