import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { TQueryParams } from '../../utils';

export default function VehicleSelector({
  searchParams,
}: {
  searchParams: TQueryParams;
}) {
  return <EditVehicleDropdown searchParams={searchParams} />;
}
