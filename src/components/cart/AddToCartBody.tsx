import { TCartItem } from '@/lib/cart/useCart';
import { useCartContext } from '@/providers/CartProvider';
import Image from 'next/image';
import LineSeparator from '../ui/line-separator';
import { IProductData } from '@/utils';

type AddToCartBodyProps = {
  selectedProduct?: IProductData | null | undefined;
};

const AddToCartBody = ({ selectedProduct }: AddToCartBodyProps) => {
  const { cartItems } = useCartContext();
  const sortedCartItems = selectedProduct
    ? cartItems.sort((a, b) => (b.sku === selectedProduct.sku ? 1 : -1))
    : cartItems;

  return (
    <>
      {sortedCartItems.length > 0 ? (
        sortedCartItems.map((item) => {
          return <CartItem key={item.sku} item={item} />;
        })
      ) : (
        <div className="flex flex-row items-center justify-center pt-20">
          <p className="text-lg font-normal">Your cart is empty</p>
        </div>
      )}
    </>
  );
};

type CartItemProps = {
  item: TCartItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const imageUrl =
    item.type === 'Seat Covers' ? item?.product?.split(',')[0] : item?.feature;

  return (
    <>
      <div className="flex justify-center">
        <Image
          id="featured-image"
          src={imageUrl ?? ''}
          alt="a car with a car cover on it"
          width={180}
          height={180}
          className="h-[180px] w-[180px] md:h-[194px] md:w-[194px] lg:h-[194px] lg:w-[194px]"
          // onClick={console.log(selectedImage)}
        />
      </div>
      <div className="pb-3 pl-5">
        <div className="w-10/12 text-base font-bold lg:text-lg">
          {item?.display_id}&trade; {item.type}
        </div>
        <div className="text-sm font-normal text-[#707070] lg:text-sm">
          Vehicle: {item?.make} {item.model} {item.year_generation}
          {/* {item.submodel1 && item.submodel1} */}
        </div>
        <div className="text-sm font-normal text-[#707070] lg:text-sm">
          Color: {item.display_color}
        </div>
        <div className="flex text-sm font-normal text-[#707070] lg:text-sm">
          <div>Quantity: </div>
          <div className="pl-1">{item.quantity}</div>
        </div>
      </div>
      <LineSeparator />
      <div className="py-3 pr-4">
        <div className="flex flex-col text-right ">
          <div className="text-xl font-bold lg:text-lg">
            ${item.msrp ? (parseFloat(item.msrp) * 1).toFixed(2) : ''}
          </div>
          {item.msrp !== item.price && (
            <div className="text-sm font-normal text-[#707070] line-through decoration-[#707070] lg:text-base">
              {item?.price &&
                `$${parseFloat(item?.price as string).toFixed(2)}`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCartBody;
