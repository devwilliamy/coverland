import { useCartContext } from '@/providers/CartProvider';
import Image from 'next/image';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { TCartItem } from '@/lib/cart/useCart';
import { isFullSet } from '@/lib/utils';
import { ChangeEvent, useState } from 'react';
import { formatISODate, formatISODateNoTimeZone } from '@/lib/utils/date';

export default function CartItemCard({ item }: { item: TCartItem }) {
  const { updateItemQuantity } = useCartContext();
  const [quantity, setQuantity] = useState(item?.quantity || 1);

  const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    updateItemQuantity(item.sku ?? '', newQuantity);
  };

  const { removeItemFromCart } = useCartContext();
  const { type } = item;
  const imageUrl =
    type === 'Seat Covers' ? item?.product?.split(',')[0] : item?.feature;
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-items-center gap-2 text-2xl font-medium">
        <div className="h-9/12 w-3/12 justify-items-center">
          <Image
            className="bg-gray-100 p-[6.5px]"
            src={(imageUrl as string) || ''}
            width={137.5}
            height={137.5}
            alt={`The image for a ${item?.make ?? ''} car cover`}
          />
        </div>
        <div className="flex w-7/12 flex-col gap-1">
          <div className="items-center md:flex md:space-x-2">
            <div className="w-10/12 text-base font-bold md:w-auto lg:text-lg">
              {item?.display_id}&trade; {item?.type}
            </div>
            {item?.preorder && (
              <div className="h-[27px] max-w-[90px] rounded bg-[#2BA45B] px-[8px] text-center text-sm font-bold leading-[27px] text-[#ffffff] lg:min-w-[80px]">
                Pre-Order
              </div>
            )}
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
            {isFullSet(item.display_set ?? '').toLowerCase() == 'full'
              ? 'Full Seat Set (Front + Rear Seat Set)'
              : 'Front Seats (Driver + Passenger seats)'}
          </div>
          <div className="text-sm font-normal text-[#707070] lg:text-base">
            Color: {item?.display_color}
          </div>
          <div className="flex gap-3 text-sm font-normal text-[#707070] lg:text-base">
            <div className="font-medium lg:text-base">Quantity</div>
            <select
              className="font-medium lg:text-base"
              value={quantity}
              onChange={handleQuantityChange}
            >
              {/* Generate options dynamically based on a hypothetical max quantity */}
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex w-2/12 flex-col text-right ">
          <div className="text-base font-bold lg:text-lg">
            $
            {item?.msrp
              ? (
                  (parseFloat(item?.msrp) -
                    (item?.preorder && item?.preorder_discount
                      ? parseFloat(item?.preorder_discount)
                      : 0)) *
                  item?.quantity
                ).toFixed(2)
              : ''}
          </div>
          {item.msrp !== item.price && (
            <div className="text-sm font-normal text-[#707070] line-through decoration-[#707070] lg:text-base">
              {item?.price &&
                `$${(parseFloat(item?.price as string) * item?.quantity).toFixed(2)}`}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-end justify-between pb-2 pt-0">
        <div className="flex flex-col">
          <div className="pt-2 text-sm font-normal text-[#343434] lg:pt-1 lg:text-base">
            {item?.preorder ? 'Pre-order Item' : 'Same-Day Shipping'}
          </div>
          <div
            className={`flex items-center gap-3 pt-1 text-sm font-normal ${item?.preorder ? `text-[#2BA45B]` : `text-[#343434]`} lg:text-base`}
          >
            {item?.preorder
              ? `Est. Ship Date: ${formatISODateNoTimeZone(item?.preorder_date ?? '')}`
              : `Free Delivery`}
          </div>
        </div>
        <IconContext.Provider
          // Trash Icon
          value={{
            className: 'cursor-pointer',
          }}
        >
          <FaRegTrashAlt
            size={20}
            color="grey"
            onClick={() => {
              removeItemFromCart(item?.sku);
            }}
          />
        </IconContext.Provider>
      </div>
    </div>
  );
}
