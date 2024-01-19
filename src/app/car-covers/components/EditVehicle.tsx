import EditVehicleDropdown from '@/components/PDP/EditVehicleDropdown';
import { EditIcon } from '@/components/PDP/components/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function EditVehicle() {
  return (
    <div className="flex items-center gap-2">
      <EditIcon />
      <Popover>
        <PopoverTrigger asChild>
          <button className="underline">Edit Vehicle</button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
          <EditVehicleDropdown />
        </PopoverContent>
      </Popover>
    </div>
  );
}
