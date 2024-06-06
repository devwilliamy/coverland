'use client';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { AccessoryItem, CartProvider } from '@/providers/CartProvider';
import { getAccessoryBySKU, getAllAcessories } from '@/lib/db/accessories';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ProductHero } from './ProductHero';
import { AccessoryGallery } from './AccessoryGallery';

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
  const [currentAccessory, setCurrentAccessory] = useState<AccessoryItem>();
  const [imageStrings, setImageStrings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { sku } = useParams();
  useEffect(() => {
    const getAccessoryData = async () => {
      setLoading(true);
      const data = await getAccessoryBySKU(sku as string);
      const accessoryObj = data[0];
      const accessoryImages =
        accessoryObj && accessoryObj.images
          ? accessoryObj.images.split(',')
          : [''];
      setCurrentAccessory(accessoryObj);
      setImageStrings(accessoryImages);
      setLoading(false);
    };
    getAccessoryData();
  }, []);

  // useEffect(() => {
  //   console.log({ currentAccessory, imageStrings });
  // }, [currentAccessory, imageStrings]);

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="min-h-screen w-full bg-[#BE1B1B]/80 ">
          <AiOutlineLoading3Quarters className="animate-spin" />
        </Skeleton>
      </div>
    );
  }

  return (
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

        <Separator className=" mx-4 my-4 w-full lg:my-[80px]" />
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
  );
}
