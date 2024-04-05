import { useContext } from 'react';
import useDetermineType from './useDetermineType';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';

const useStoreContext = () => {
  const { isSeatCover } = useDetermineType();
  const carSelectionContext = useContext(CarSelectionContext);
  const seatCoverContext = useContext(SeatCoverSelectionContext);
  // Determine the appropriate context based on the current route
  const storeContext = isSeatCover ? seatCoverContext : carSelectionContext;
  return storeContext;
};

export default useStoreContext;
