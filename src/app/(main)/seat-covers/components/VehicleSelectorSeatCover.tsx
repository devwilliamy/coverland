import EditVehicleDropdown from "./EditVehicleDropdownSeatCover";

export default function VehicleSelector({
  searchParams,
}: {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
}) {
  return <EditVehicleDropdown searchParams={searchParams} />;
}