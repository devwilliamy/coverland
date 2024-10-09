import { useContext } from 'react';
import useDetermineType from './useDetermineType';
import { CarSelectionContext } from '@/contexts/CarSelectionContext';
import { SeatCoverSelectionContext } from '@/contexts/SeatCoverContext';
import { FloorMatSelectionContext } from '@/contexts/FloorMatContext';
import {
  CAR_COVERS_URL_PARAM,
  FLOOR_MAT_URL_PARAM,
  SEAT_COVERS_URL_PARAM,
} from '@/lib/constants';

const useStoreContext = () => {
  const { productType } = useDetermineType();
  const carSelectionContext = useContext(CarSelectionContext);
  const seatCoverContext = useContext(SeatCoverSelectionContext);
  const floorMatContext = useContext(FloorMatSelectionContext);
  // Determine the appropriate context based on the current route
  let storeContext;
  switch (productType) {
    case CAR_COVERS_URL_PARAM:
      storeContext = carSelectionContext;
      break;
    case SEAT_COVERS_URL_PARAM:
      storeContext = seatCoverContext;
      break;
    case FLOOR_MAT_URL_PARAM:
      storeContext = floorMatContext;
    default:
      storeContext = null;
      break;
  }
  return storeContext;
};

export default useStoreContext;
