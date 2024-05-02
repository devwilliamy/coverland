'use client';
import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import {
  AccessoryItem,
  CartProvider,
  useCartContext,
} from '@/providers/CartProvider';
import { getAccessoryBySKU, getAllAcessories } from '@/lib/db/accessories';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

type AccessoriesTheme = {
  bg: string;
  text: string;
  desc?: string;
};
const themes: Record<string, AccessoriesTheme> = {
  light: {
    bg: 'white',
    text: 'black',
    desc: '#707070',
  },
  dark: {
    bg: 'black',
    text: 'white',
    desc: '#d6d6d6',
  },
};

export default function AccessoryPage() {
  const [theme, setTheme] = useState<AccessoriesTheme>(themes.light);
  // const cart = useCart();
  const { addToCart, cartItems } = useCartContext();

  let accessoryFeatures: string[] = [];
  let accessoryBullets: string[] = [];
  let dummyProduct: AccessoryItem = {
    title: '',
    sku: '',
    msrp: '',
    description: [],
    images: '',
  };

  const [currentAccessory, setCurrentAccessory] = useState<AccessoryItem>();
  const [imageStrings, setImageStrings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { sku } = useParams();
  useEffect(() => {
    const gettingAcc = async () => {
      setLoading(true);
      const data = await getAccessoryBySKU(sku as string);
      const accessoryObj = data[0];
      const accessoryImages = accessoryObj.images.split(',');
      setCurrentAccessory(accessoryObj);
      setImageStrings(accessoryImages);
      setLoading(false);
      // const accessoryString = allAccessories[0]?.images;
      // console.log({ accessoryString });

      // return acc;
    };
    gettingAcc();
  }, []);

  useEffect(() => {
    console.log({ currentAccessory, imageStrings });
  }, [currentAccessory, imageStrings]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 " />
      </div>
    );
  }

  return (
    // <CartProvider>
    <Suspense
      fallback={
        <div className="p-4">
          <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 " />
        </div>
      }
    >
      <div
        className={`flex h-full w-full flex-col items-center px-2 py-[15px] lg:py-[30px] `}
        style={{
          background: theme.bg,
          color: theme.text,
        }}
      >
        <section className="relative grid w-full grid-cols-1 gap-14 md:grid-cols-2">
          <AccessoryGallery imageStrings={imageStrings} />
          <ProductHero product={currentAccessory as AccessoryItem} isComplete />
        </section>
        {/* -------------- Product Details Header Banner -------------- */}
        {/* <Image src={Header} alt="accessories-header" /> */}

        <Separator className=" mx-4 my-[40px] w-full lg:my-[80px]" />
        {/* <div className="mx-4 my-[40px] h-[1px] w-[calc(100vw_-_32px)] bg-[#C8C7C7] lg:my-[80px] "/> */}
        <span className="grid w-full max-w-[1024px] items-center gap-[56px] md:grid-cols-2 ">
          {imageStrings?.map((img, index) => {
            if (index > 3) {
              return null;
            }
            return (
              <div
                key={`product-gallery-${index}`}
                className="flex flex-col items-center "
              >
                <Image
                  src={img}
                  alt={`image-${index}`}
                  width={500}
                  height={500}
                  className="aspect-square w-full rounded-xl object-contain shadow-lg"
                />
                {/* {title && (
              <p className="w-full py-4 text-start text-[18px] font-[700] leading-[21px]">
                {title}
              </p>
            )}
            {desc && (
              <p
                className={`w-full text-[16px] leading-[22px]`}
                style={{
                  color: theme.desc,
                }}
              >
                {desc}
              </p>
            )} */}
              </div>
            );
          })}
        </span>
        {/* <button
        className={`my-4 rounded-full p-1 outline-[${theme.text}] outline outline-[1px]`}
        onClick={() => {
          if (theme === themes.light) {
            setTheme(themes.dark);
            return;
          }
          setTheme(themes.light);
        }}
      >
        {theme === themes.light ? <Sun /> : <Moon />}
      </button> */}
      </div>
    </Suspense>
    // </CartProvider>
  );
}

const ProductHero = ({
  isComplete,
  product,
}: {
  isComplete: boolean;
  product: AccessoryItem;
}) => {
  const { addToCart, cartItems } = useCartContext();
  const [test, setTest] = useState(true);
  const handleAddToCart = () => {
    addToCart({
      ...product,
      type: 'Accessories',
      feature: product.images.split(',')[0],
      price: product.msrp,
      quantity: 1,
    });
    console.log(cartItems);
  };

  return (
    <div className="relative flex h-full w-full flex-col ">
      <div className="sticky top-[20px] flex w-full flex-col gap-4 ">
        <h1 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
          {product?.title}
        </h1>
        <p
          className={`${isComplete && 'hidden'} mb-3 text-[16px] leading-[14px]`}
        >
          From
        </p>
        <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
          <div className="leading-[20px]">
            ${isComplete ? product?.msrp : '19.99'}
          </div>
          {/* {selectedProduct?.price && (
            <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
              <span className=" text-[#BEBEBE] line-through">
                ${isComplete ? `${Number(selectedProduct?.price)}` : defaultPrice}
              </span>
              <p>(-50%)</p>
            </div>
          )} */}
        </div>
        <div className="flex flex-col gap-0.5">
          <Rating
            name="read-only"
            value={4.5}
            precision={0.1}
            readOnly
            sx={{
              gap: '2px',
              '& .MuiRating-iconFilled': {
                color: '#BE1B1B',
              },
              '& .MuiRating-iconEmpty': {
                color: '#BE1B1B',
              },
            }}
          />
          {/* <ReviewsTextTrigger /> */}
        </div>
        <section className="flex flex-col">
          <div className="mt-1 flex items-center gap-2 ">
            {product && product?.msrp && (
              <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
                4 interest-free installments of{' '}
                <b className="font-[400] text-black">
                  ${(Number(product?.msrp) / 4 - 0.01).toFixed(2)}
                </b>
              </p>
            )}
            {/* <Image alt="paypal-installents" src={installments} /> */}
            {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
          </div>
        </section>
        <Separator />
        {/* <section className="flex flex-col gap-4 px-2 max-md:px-4 ">
          {product?.description?.map((text) => (
            <ul className="list-inside list-disc">
              <li className="list-item">{text}</li>
            </ul>
          ))}
        </section> */}
        <Button
          className=" flex h-[48px] w-full cursor-pointer items-center justify-center rounded bg-[#BE1B1B] text-lg font-bold uppercase text-white disabled:bg-[#BE1B1B] lg:h-[62px]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        {/* <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        searchParams={searchParams}
      /> */}
        {/* <CartSheet
        open={addToCartOpen}
        setOpen={setAddToCartOpen}
        selectedProduct={selectedProduct}
      /> */}
      </div>
    </div>
  );
};

const AccessoryGallery = ({ imageStrings }: { imageStrings: string[] }) => (
  <span className="flex flex-col gap-2">
    {imageStrings[0] && (
      <Image
        src={imageStrings[0]}
        width={700}
        height={700}
        alt="accessories-header"
        className="aspect-square w-full rounded-xl  "
      />
    )}
    <span className="hidden grid-cols-2 gap-2 md:grid">
      {imageStrings?.map((image, i) => {
        if (i === 0) {
          return null;
        }
        return (
          <Suspense
            fallback={
              <div className="p-4">
                <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 " />
              </div>
            }
          >
            <Image
              src={image}
              alt="accessories-header"
              width={700}
              height={700}
              className="aspect-square h-full w-full rounded-xl "
            />
          </Suspense>
        );
      })}
    </span>
  </span>
);
