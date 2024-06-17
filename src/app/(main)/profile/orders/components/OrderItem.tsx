import Image from 'next/image';
import { TInitialOrderItemsDataDB } from '@/lib/db/profile/ordersHistory';

type OrderItemProps = {
  item: TInitialOrderItemsDataDB;
};

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li key={item.id}>
      <div className="justify-end md:m-0 md:flex">
        <div className="my-4 md:my-2 md:w-2/5">
          <div className="justify-end md:flex">
            <Image
              className="bg-gray-100 p-[6.5px]"
              src={item.product?.feature || ''}
              width={155}
              height={155}
              alt="Picture of the Order Item"
            />
          </div>
        </div>
        <div className="my-4 pt-0 text-base text-[#707070] md:my-2 md:ml-5  md:w-3/5 md:max-w-[325px]">
          <div className="mb-1">
            {`${item.product?.display_id}™ ${item.product?.type}`}
          </div>
          <div className="mb-1">
            Vehicle: {item.product?.make} {item.product?.model}{' '}
            {item.product?.year_generation} {item.product?.submodel1}
          </div>
          <div className="mb-1">Color: {item.product?.display_color}</div>
          <div className="mb-1">
            Qty: {item.quantity} @ ${item.product?.msrp}
          </div>
          <div>{item.price}</div>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
