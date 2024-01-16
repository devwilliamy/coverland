import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TProductData } from "@/lib/db";
import { EditIcon } from "lucide-react";
import  EditVehicleDropdown from "../EditVehicleDropdown";

export default function EditVehiclePopover({selectedProduct, submodel}:{ selectedProduct: TProductData, submodel: string | undefined}) {
    return (
        <div className=" flex flex-col gap-2 z-50">
            <h2 className="text-2xl font-roboto font-extrabold text-[#1A1A1A]">
              {`${selectedProduct?.year_generation}
                        ${selectedProduct?.make} ${
                selectedProduct?.product_name
              } ${submodel ? selectedProduct?.submodel1 : ''}`}
            </h2>
            <div className="flex gap-2 items-center z-50">
              <EditIcon />
              <Popover modal={false}>
                <PopoverTrigger asChild>
                  <button className="underline">Edit Vehicle</button>
                </PopoverTrigger>
                <PopoverContent className="p-5 z-50 min-w-[100px] bg-white border border-gray-300 rounded-xl shadow-lg">
                  <EditVehicleDropdown />
                </PopoverContent>
              </Popover>
            </div>
          </div>
    )
}