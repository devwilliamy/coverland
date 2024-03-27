import EditVehiclePopover from './EditVehiclePopover';
import EditVehicleModal from '@/components/PDP/components/EditVehicleModal';
import EditVehicleIcon from './EditVehicleIcon';

type EditVehicleProps = {
  searchParams: { submodel?: string; second_submodel?: string } | undefined;
};
export default function EditVehicle({ searchParams }: EditVehicleProps) {
  return (
    <div className="grid grid-cols-[1fr_2fr] place-items-center ">
      <div className="flex max-h-[24px] max-w-[64px]  items-center justify-center lg:max-h-[42px] lg:max-w-[116px]">
        <EditVehicleIcon />
      </div>
      <EditVehicleModal searchParams={searchParams} />
      <EditVehiclePopover searchParams={searchParams} />
    </div>
  );
}
