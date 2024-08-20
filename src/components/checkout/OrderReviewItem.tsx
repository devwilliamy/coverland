import Image from 'next/image';
import { TCartItem } from '@/lib/cart/useCart';
import { isFullSet } from '@/lib/utils';

export default function OrderReviewItem({
  item,
  withPrice,
}: {
  item: TCartItem;
  withPrice?: boolean;
}) {
  const { type } = item;
  const imageUrl =
    type === 'Seat Covers' ? item?.product?.split(',')[0] : item?.feature;
  return (
    <div className=" flex flex-col">
      <div className=" flex w-full gap-4 text-2xl font-medium lg:justify-items-start">
        <div className="h-9/12 w-3/12 justify-items-center ">
          <Image
            className="bg-gray-100 p-[6.5px] "
            src={(imageUrl as string) || ''}
            width={137.5}
            height={137.5}
            alt={`The image for a ${item?.product_name || ''} car cover`}
          />
        </div>
        <div className="flex w-7/12 flex-col ">
          <div className="mb-4 w-10/12 text-base font-bold leading-5 lg:text-lg">
            {item?.display_id}&trade; {item?.type}
          </div>
          <div
            className={`text-sm font-normal ${!item?.make && 'hidden'} text-[#707070] lg:text-base`}
          >
            Vehicle: {item?.make} {item?.model} {item?.year_generation}{' '}
            {item?.submodel1 ?? ''} {item?.submodel2 ?? ''} {item?.submodel3 ?? ''}
          </div>
          <div
            className={`text-sm font-normal ${item?.type === 'Seat Covers' ? 'flex' : 'hidden'}  text-[#707070] lg:text-base`}
          >
            {isFullSet(item.display_set ?? "").toLowerCase() == 'full'
              ? 'Full Seat Set (Front + Rear Seat Set)'
              : ' Front Seats (Driver +  Passenger seats)'}
          </div>
          <div className="text-sm font-normal text-[#707070] lg:text-base">
            Color: {item?.display_color}
          </div>
          <div className="flex gap-3 text-sm font-normal text-[#707070] lg:text-base">
            <div className="font-medium lg:text-base">
            Qty: {item?.quantity} @ ${item?.preorder ? (parseFloat(item?.msrp) - parseFloat(item?.preorder_discount)).toFixed(2) : parseFloat(item?.msrp).toFixed(2)}
            </div>
          </div>
          <div className="flex gap-3 text-sm font-normal text-[#707070] lg:text-base">
            <div className="font-medium lg:text-base">
            ${(item?.quantity * (item?.preorder ? parseFloat(item?.msrp) - parseFloat(item?.preorder_discount) : parseFloat(item?.msrp))).toFixed(2)}
            </div>
          </div>
        </div>
        {withPrice && (
          <div className="flex h-full flex-col">
            <div className="flex w-2/12 flex-col text-right ">
              <div className="text-base font-bold lg:text-lg">
                $
                {item?.msrp
                  ? (parseFloat(item?.msrp) * item?.quantity).toFixed(2)
                  : ''}
              </div>
              <div className="text-sm font-normal text-[#707070] line-through decoration-[#707070] lg:text-base">
                {item?.price &&
                  `$${(parseFloat(item?.price as string) * item?.quantity).toFixed(2)}`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
