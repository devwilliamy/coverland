import { Separator } from '@/components/ui/separator';
import { Rating } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import Header from '@/images/accessories-page/header.webp';
import Grid1 from '@/images/accessories-page/fg-1.webp';
import Grid2 from '@/images/accessories-page/fg-2.webp';
import Grid3 from '@/images/accessories-page/fg-3.webp';
import Grid4 from '@/images/accessories-page/fg-4.webp';
import { Moon, Sun } from 'lucide-react';
import AddToCart from '@/components/cart/AddToCart';
import { AccessoryItem } from '@/providers/CartProvider';

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

const accessoryFeatures = [
  'Size 210g',
  '0.2 lb head',
  'Available in Black or Orange',
  '3-in-1 multifunction tool',
  'Cuts through seat belts',
  'Break auto glass',
];

const accessoryBullets = [
  "Sturdy ABS Casing The casing is made from ABS (Acrylonitrile Butadiene Styrene), which gives it shock and thermal resistance. With this casing, your escape tool doesn't break or cause too many vibrations during usage.",
  'Top-notch 3-in-1 tool This emergency escape tool provides triple action if you are ever stuck. It has an alloy tip for shattering glass, a hammer for clearing broken glass, and a seatbelt cutter hidden with a safety edge.',
  'Wide and effective breaking tip The breaking tip of our Triton escape tool is made from heavy alloy. This allows it to have pin-point smooth action when shattering glass when your car is stuck.',
  'Low-light ultra visibility On the side, there is a reflective tape attachment to help this tool glow in the dark when needed. This highly reflective ability helps you recognize and locate it easily without any hassle.',
  "Sturdy ABS Casing The casing is made from ABS (Acrylonitrile Butadiene Styrene), which gives it shock and thermal resistance. With this casing, your escape tool doesn't break or cause too many vibrations during usage.",
];

const dummyProduct: AccessoryItem = {
  title: 'Trident Escape Hammer, 3in1 Emergency Escape Tool - Black',
  sku: 'CA-CL-ET-COB-OR',
  msrp: '24.99',
  description: accessoryBullets,
  image: '',
};

export default function AccessoriesContent() {
  const [theme, setTheme] = useState<AccessoriesTheme>(themes.light);

  return (
    <div
      className={`flex h-full w-full flex-col items-center pb-[60px] lg:pb-[120px]`}
      style={{
        background: theme.bg,
        color: theme.text,
      }}
    >
      <section className="relative grid w-full grid-cols-1 md:grid-cols-2">
        <AccessoryGallery />
        <ProductHero product={dummyProduct} isComplete />
      </section>

      <Image src={Header} alt="accessories-header" />
      <button
        className={`my-4 rounded-full p-1 outline-[${theme.text}] outline outline-[1px]`}
        onClick={() => {
          if (theme === themes.light) {
            setTheme(themes.dark);
            return;
          }
          setTheme(themes.light);
        }}
      >
        {theme === themes.light ? <Moon /> : <Sun />}
      </button>
      <p className="w-full pb-[26px] pt-[30px] text-center text-[40px] font-[700] leading-[40px] lg:pb-[56px] lg:pt-[180px]">
        Features
      </p>
      <p className={`w-[80%] max-w-[650px] `}>
        Be prepared for any eventuality with an Emergency Escape Tool. For
        example, this tool can quickly break the glass for a safe escape in a
        vehicle submersion or fire. This multi-use tool can break glass, cut
        through a seat belt, and hammer away. If the seatbelts do not unlock,
        the sharp blade can cut through all passenger's seatbelts allowing for a
        quick escape. In the event of a fire or water hazard, the safety hammer
        can break the glass with the sharp tip, and the flat end can knock out
        any remaining jagged glass. Install this safety hammer in the car with
        the included screw or hold it in place with double-sided adhesive. In
        case of emergency, you should always keep this safety hammer within easy
        reach of the driver.
      </p>
      <ul className=" w-[80%] max-w-[650px] list-inside list-disc pt-8">
        {accessoryFeatures.map((item) => (
          <li key={item} className="list-item">
            {item}
          </li>
        ))}
      </ul>
      <span className="grid w-full max-w-[1024px] items-center gap-[56px] pt-[60px] max-lg:px-4 lg:pt-[110px] min-[1024px]:grid-cols-2">
        {[
          {
            img: Grid2,
            title: 'Heavy Alloy Tip',
            desc: 'This premium Triton Escape tool has a heavy alloy striking tip. This comes in really handy when you’re stuck because it can break glass and obstructions within seconds. It is rust-resistant and has high durability.',
          },
          {
            img: Grid4,

            title: 'Safety Black Seatbelt Cutter',
            desc: 'Our black Triton escape tool comes with a sharp cutter in case your seatbelt gets stuck during an emergency. It has an easily removed cover clip to ensure it remains razor-sharp and is only exposed when needed.',
          },
          {
            img: Grid1,
            title: 'Reflective Tape',
            desc: 'This escape tool is equipped and wrapped stylishly with reflective tape for easy recognition in the dark. Due to its high reflective ability, this tape helps you locate the tool for quick use during an emergency.',
          },
          {
            img: Grid3,
            title: '3 in 1 Breaker, Cutter, and Hammer',
            desc: 'Our quality Triton Escape is fully equipped with its three-in-one feature. It bears a breaker to shatter glasses, a cutter to make way through entangling ropes and seatbelts, and a hammer to break obstacles.',
          },
        ].map(({ img, title, desc }, index) => (
          <div key={''} className="flex flex-col items-center ">
            <Image
              src={img}
              alt={`image-${index}`}
              className="w-full object-cover"
            />
            <p className="w-full py-4 text-start text-[18px] font-[700] leading-[21px]">
              {title}
            </p>
            <p
              className={`w-full text-[16px] leading-[22px]`}
              style={{
                color: theme.desc,
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </span>
      <button
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
      </button>
    </div>
  );
}

const ProductHero = ({
  isComplete,
  product,
}: {
  isComplete: boolean;
  product: AccessoryItem;
}) => (
  <div className="relative flex h-full w-full flex-col">
    <div className="sticky top-0 w-full p-2">
      <h1 className="mt-[24px] text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:mt-0 lg:text-[28px] lg:leading-[30px] ">
        {product.title}
      </h1>
      <p className="mb-3 text-[16px] leading-[14px]">
        {isComplete ? '' : 'From'}
      </p>
      <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]">
          ${isComplete ? product.msrp : '19.99'}
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
          {product && product.msrp && (
            <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
              4 interest-free installments of{' '}
              <b className="font-[400] text-black">
                ${(Number(product.msrp) / 4 - 0.01).toFixed(2)}
              </b>
            </p>
          )}
          {/* <Image alt="paypal-installents" src={installments} /> */}
          {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
        </div>
      </section>
      <div className="lg:hidden"></div>
      <Separator className="" />
      <section className="">
        {product.description.map((text) => (
          <ul className="list-inside list-disc">
            <li className="list-item">{text}</li>
          </ul>
        ))}
      </section>
      <div className="lg:py-4"></div>
      {/* <AddToCart
        selectedProduct={selectedProduct}
        handleAddToCart={handleAddToCart}
        searchParams={searchParams}
        isSticky
      /> */}
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

const AccessoryGallery = () => (
  <span className="">
    <Image
      src={Grid1}
      alt="accessories-header"
      className="aspect-square w-full rounded-xl p-2 "
    />
    <span className="hidden grid-cols-2 md:grid ">
      {[Grid1, Grid3, Grid4, Grid2, Grid1, Grid3, Grid4, Grid2].map((image) => (
        <Image
          src={image}
          alt="accessories-header"
          className="aspect-square h-full w-full rounded-xl p-2 "
        />
      ))}
    </span>
  </span>
);
