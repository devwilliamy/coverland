import { TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { TCartItem } from '@/lib/cart/useCart';
import { detectFOrFB } from '@/lib/utils';

export default function OrderReviewItem({ item }: { item: TCartItem }) {
  const { type } = item;
  const imageUrl =
    type === 'Seat Covers' ? item?.product?.split(',')[0] : item?.feature;
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-items-center gap-2 text-2xl font-medium">
        <div className="h-9/12 w-3/12 justify-items-center ">
          <Image
            className="bg-gray-100 p-[6.5px] "
            src={(imageUrl as string) || ''}
            width={137.5}
            height={137.5}
            alt={`The image for a ${item?.product_name || ''} car cover`}
          />
        </div>
        <div className="flex w-7/12 flex-col gap-1">
          <div className="w-10/12 text-base font-bold lg:text-lg">
            {item?.display_id}&trade; {item?.type}
          </div>
          <div
            className={`text-sm font-normal ${!item?.make && 'hidden'} text-[#707070] lg:text-base`}
          >
            Vehicle: {item?.make} {item?.model} {item?.year_generation}{' '}
            {item?.submodel1 ?? ''} {item?.submodel2 ?? ''}
          </div>
          <div
            className={`text-sm font-normal ${item?.type === 'Seat Covers' ? 'flex' : 'hidden'}  text-[#707070] lg:text-base`}
          >
            {detectFOrFB(item.sku)} Seat Cover
          </div>
          <div className="text-sm font-normal text-[#707070] lg:text-base">
            Color: {item?.display_color}
          </div>
          <div className="flex gap-3 text-sm font-normal text-[#707070] lg:text-base">
            <div className="font-medium lg:text-base">
              Qty: {item?.quantity} @ ${item?.msrp}
            </div>
          </div>
          <div className="flex gap-3 text-sm font-normal text-[#707070] lg:text-base">
            <div className="font-medium lg:text-base">
              ${item?.quantity * item?.msrp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
