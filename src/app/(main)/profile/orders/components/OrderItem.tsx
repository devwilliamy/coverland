import Image from 'next/image';
import { TInitialOrderItemsDataDB } from '@/lib/db/profile/ordersHistory';

interface OrderItemProps {
  item: TInitialOrderItemsDataDB;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <li key={item.id}>
      <div className="md:m-0 md:flex justify-end">
        <div className="mt-4 mb-4 md:w-2/5 md:mt-2 md:mb-2">
          <div className="md:flex justify-end">
            <Image
              className="bg-gray-100 p-[6.5pxW]"
              src={item.product?.feature || ''}
              width={155}
              height={155}
              alt="Picture of the Order Item"
            />
          </div>
        </div>
        <div className="mt-4 mb-4 md:mt-2 md:mb-2 md:ml-5 md:w-3/5 pt-0 md:max-w-[325px]">
          <div className="mb-1 text-base md:text-base text-[#707070]">
            {`${item.product?.display_id}™ ${item.product?.type}`}
          </div>
          <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
            Vehicle: {item.product?.make} {item.product?.model} {item.product?.year_generation} {item.product?.submodel1}
          </div>
          <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
            Color: {item.product?.display_color}
          </div>
          <div className="mb-1 text-base font-normal text-[#707070] md:text-base">
            Qty: {item.quantity} @ ${item.product?.msrp}
          </div>
          <div className="text-base font-normal text-[#707070] md:text-base">
            {item.price}
          </div>
        </div>
      </div>
    </li>
  );
};

export default OrderItem;
