import Image from 'next/image';
import { TOrderItem } from '@/lib/db/profile/ordersHistory';

type OrderItemProps = {
  item: TOrderItem;
};

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li key={item.id} className="">
      <div className="justify-start md:flex">
        <div className="my-6 md:my-0">
          <div className="justify-start md:flex">
            <Image
              className="bg-gray-100 p-[6.5px]"
              src={item.product?.feature || ''}
              width={155}
              height={155}
              alt="Picture of the Order Item"
            />
          </div>
        </div>
        <div className="my-6 md:m-0 pt-0 text-base text-[#707070] md:pl-8 md:w-[320px]">
          <div className="mb-2">
            {`${item.product?.display_id}™ ${item.product?.type}`}
          </div>
          <div className="mb-2">
            Vehicle: {item.product?.make} {item.product?.model}{' '}
            {item.product?.year_generation} {item.product?.submodel1}
          </div>
          <div className="mb-2">Color: {item.product?.display_color}</div>
          <div className="mb-2">
            Qty: {item.quantity} @ ${item.price / item.quantity}
          </div>
          <div>${item.price}</div>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
