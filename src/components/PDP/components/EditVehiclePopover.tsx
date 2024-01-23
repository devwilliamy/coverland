import { EditIcon } from 'lucide-react';
import EditVehicleDropdown from '../EditVehicleDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function EditVehiclePopover({
  fullProductName,
}: {
  fullProductName: string;
}) {
  return (
    <div className=" z-50 flex flex-col gap-2">
      <h2 className="font-roboto text-2xl font-extrabold text-[#1A1A1A]">
        {fullProductName}
      </h2>
      <div className="z-50 flex items-center gap-2">
        <EditIcon />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="underline">Edit Vehicle</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[100px] rounded-xl border border-gray-300 bg-white p-5 shadow-lg">
            <EditVehicleDropdown />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
