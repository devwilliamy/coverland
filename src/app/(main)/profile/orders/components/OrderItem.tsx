import Image from 'next/image';
import { TOrderItem } from '@/lib/db/profile/ordersHistory';
import { formatMoneyAsNumber } from '@/lib/utils/money';

type OrderItemProps = {
  item: TOrderItem;
  marginClass?: string;
  version: 'short' | 'regular';
};

const OrderItem = ({
  item,
  marginClass = 'md:mb-2',
  version = 'regular',
}: OrderItemProps) => {
  return (
    <li key={item.id} className={`${marginClass}`}>
      <div className="justify-start md:flex">
        <div className="my-6 md:my-0">
          <div className="w-[152px] bg-gray-100 p-[6.5px] md:w-[152px]">
            <Image
              className="h-auto w-full"
              src={item.product?.feature || ''}
              width={152}
              height={152}
              alt="Picture of the Order Item"
            />
          </div>
        </div>
        <div className="text-md my-6 pt-0 text-[#707070] md:m-0 md:w-[320px] md:pl-8 md:text-base">
          <div className="mb-1.5">
            {item.product?.type === 'Car Covers' ? `${item.product?.display_id}™ Custom ${item.product?.type}`: `Fine Comfort ${item.product?.display_id}™ ${item.product?.type}`}
          </div>
          <div className="mb-1.5">
            Vehicle: {item.product?.make} {item.product?.model}{' '}
            {item.product?.year_generation} {item.product?.submodel1}
          </div>
          <div className="mb-1.5">Color: {item.product?.display_color}</div>
          {version === 'short' ? (
            <div className="mb-1.5">Qty: {item.quantity}</div>
          ) : (
            <>
              <div className="mb-1.5">
                Qty: {item.quantity} 
              </div>
              <div>Total: ${item.price}</div>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
