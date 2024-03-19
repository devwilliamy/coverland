'use client';
import Image, { StaticImageData } from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react';
import SeatCoverFreeDetails from './SeatCoverFreeDetails';
import CompatibleVehiclesTrigger from './CompatibleVehiclesTrigger';
import installments from '@/images/PDP/Product-Details-Redesign-2/paypal-installments.webp';
import { Rating } from '@mui/material';
import { useMediaQuery } from '@mantine/hooks';
import { SeatData, SeatImageDataObject, SeatString } from '../util';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Check, X } from 'lucide-react';
import FrontCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/front-covers.webp';
import BackCovers from '@/images/PDP/Product-Details-Redesign-2/seat-covers/back-covers.webp';
import { SeatItem, useCartContext } from '@/providers/CartProvider';
import { TCartItem } from '@/lib/cart/useCart';
import { redirect } from 'next/navigation';
import { TSeatCoverDataDB, getAllSeatCovers } from '@/lib/db/seat-covers';
import { useRouter } from 'next/navigation';

const seatColors: { color: SeatString; data: SeatData }[] = [
  { color: 'BlackRedData', data: SeatImageDataObject.BlackRedData },
  { color: 'BlackData', data: SeatImageDataObject.BlackData },
  { color: 'GrayData', data: SeatImageDataObject.GrayData },
  { color: 'BeigeData', data: SeatImageDataObject.BeigeData },
];

const colorMap = {
  BlackRedData: 'Solid Black with Red Stitching',
  BlackData: 'Solid Black',
  GrayData: 'Solid Gray',
  BeigeData: 'Solid Beige',
};

function findObjectByPart(
  seatCoverData: TSeatCoverDataDB[],
  position: 'front' | 'back'
): TSeatCoverDataDB | null {
  const targetPart = position === 'front' ? 'LCF' : 'LCB';
  return (
    seatCoverData.find((seatCover) => seatCover.sku.includes(targetPart)) ||
    null
  );
}

export default function SeatContent({
  seatData,
  setSeatData,
  colorIndex,
  setColorIndex,
}: {
  seatData: SeatData;
  setSeatData: React.Dispatch<SetStateAction<SeatData>>;
  colorIndex: number;
  setColorIndex: React.Dispatch<SetStateAction<number>>;
}) {
  const isMobile = useMediaQuery('(max-width:1024px)');
  const coverPrice = 99.95;
  const [selectedSeatCoverType, setSelectedSeatCoverType] = useState<string[]>(
    []
  );
  const [total, setTotal] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('BlackRedData');
  const seatSelectedStyle =
    'bg-white text-black hover:bg-black hover:text-white';
  const seatDeselectedStyle = 'bg-black hover:bg-white hover:text-black';
  const { addToCart } = useCartContext();
  const [seatCoverData, setSeatCoverData] = useState<TSeatCoverDataDB[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchCovers = async () => {
      try {
        let seatData: TSeatCoverDataDB[] = [];

        seatData = await getAllSeatCovers();
        setSeatCoverData(seatData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCovers();
  }, []);

  const SeatOption = ({
    src,
    option,
  }: {
    src: StaticImageData;
    option: 'front' | 'back';
  }) => {
    return (
      <span className="flex min-h-[150px] w-full items-center justify-between gap-3.5 overflow-hidden rounded-md bg-white ">
        <Image
          alt={option + '-covers'}
          src={src}
          className="max-h-[88px] w-1/2 max-w-[139px] pl-4"
        />
        <div className="flex w-1/2 flex-col pr-4">
          <p className="whitespace-nowrap text-[16px] font-[700] capitalize leading-[29px]">
            {option} seat covers
          </p>
          <div className="flex items-center gap-1 text-[14px] leading-[26px]">
            <p className="font-[700]">${coverPrice}</p>
            <p className="text-[#9C9C9C]">$200</p>
            <p className="text-[#BE1B1B]">(-50%)</p>
          </div>
          <Button
            onClick={() => {
              if (selectedSeatCoverType.includes(option)) {
                setTotal((e) => {
                  if (e > coverPrice) {
                    return e - coverPrice;
                  }
                  return 0;
                });
              } else {
                setTotal((e) => {
                  return e + coverPrice;
                });
              }
              setSelectedSeatCoverType((e) => {
                if (e.includes(option)) {
                  return e.filter((e) => e !== option);
                }

                return [...e, option];
              });
            }}
            className={`mt-4  flex gap-1 ${selectedSeatCoverType.includes(option) ? seatSelectedStyle : seatDeselectedStyle} uppercase  outline outline-[1px] `}
          >
            {selectedSeatCoverType.includes(option) ? (
              <>
                <Check className="text-[#43A047]" />
                <p>Selected</p>
              </>
            ) : (
              <p>Select</p>
            )}
          </Button>
        </div>
      </span>
    );
  };
  const handleAddToCart = () => {
    const selectedSeatCovers = seatCoverData?.filter(
      (seatCover) => seatCover.display_color === colorMap[selectedColor]
    );
    for (const coverType of selectedSeatCoverType) {
      const cartProduct = findObjectByPart(selectedSeatCovers, coverType);
      addToCart({ ...cartProduct, quantity: 1 });
    }
    router.push('/checkout');
  };

  return (
    <section className="flex h-full w-full flex-col max-lg:px-4 max-lg:pt-[34px] lg:sticky lg:top-8 lg:w-1/2">
      <div className="flex flex-col ">
        <div className="flex flex-col gap-0.5">
          {/* Product Title */}
          <h2 className="text-[24px] font-[900] leading-[27px] text-[#1A1A1A] lg:text-[28px] lg:leading-[30px] ">
            Leatherette <br className="lg:hidden" /> Front Seat Covers
          </h2>
          {/* Rating(s) */}
          <div className="flex pb-[36px] ">
            <Rating
              name="read-only"
              value={5}
              readOnly
              style={{
                height: '25px',
                color: '#BE1B1B',
              }}
            />
          </div>
        </div>
      </div>
      <div className=" flex  items-end gap-[9px]   text-center text-[28px] font-[900]  lg:text-[32px] lg:leading-[37.5px] ">
        <div className="leading-[20px]"> ${99.95}</div>
        <div className="flex gap-1.5 pb-[1px] text-[22px] font-[400] leading-[14px] text-[#BE1B1B] lg:text-[22px] ">
          <span className=" text-[#BEBEBE] line-through">${200}</span>
          <p>(-50%)</p>
        </div>
      </div>
      <div className="pb-4.5 mt-1.5 flex items-center gap-2 ">
        <p className=" text-[14px] leading-[16px] text-[#767676] lg:text-[16px]">
          4 interest-free installments of{' '}
          <b className="font-[400] text-black">$24.99</b>
        </p>
        <Image alt="paypal-installents" src={installments} />
        {/* <Info className="h-[17px] w-[17px] text-[#767676]" /> */}
      </div>
      <section
        id="select-color"
        className="mb-[30px] mt-[24px] flex  w-full flex-col py-1"
      >
        <h3 className="mb-[6px] max-h-[13px] text-[16px] font-[400] leading-[14px] text-black ">
          Select Color
        </h3>
        <div className="flex w-full min-w-[288px]  gap-[11px] overflow-x-auto py-[1px] md:overflow-x-hidden">
          {seatColors &&
            seatColors.map((i, index) => {
              return (
                <div
                  key={`car-color-${index}`}
                  className={`flex ${index === colorIndex && 'border-1 border border-[#6F6F6F] '} cursor-pointer flex-col place-content-center rounded-full p-[2px] `}
                  onClick={() => {
                    setColorIndex(index);
                    setSeatData(i.data);
                    setSelectedColor(i.color);
                  }}
                >
                  <Image
                    alt="cover-color"
                    src={i.data[0] as StaticImageData}
                    className="rounded-full"
                  />
                </div>
              );
            })}
        </div>
      </section>
      <SeatCoverFreeDetails />
      <CompatibleVehiclesTrigger />
      <Sheet>
        <SheetTrigger className="mb-[37px] lg:mb-0">
          <div className=" flex h-full max-h-[48px] min-h-[48px] w-full items-center justify-center rounded-[4px] bg-[#BE1B1B] text-center text-[18px] font-[700] uppercase leading-[22px] tracking-[2%] text-white ">
            Add to Cart
          </div>
        </SheetTrigger>
        <SheetContent
          side={isMobile ? 'bottom' : 'right'}
          className={`${isMobile ? 'min-h-[75vh] rounded-t-lg ' : 'w-[30vw]'} flex flex-col justify-between  bg-[#323232]`}
        >
          <SheetHeader className="flex w-full flex-col items-end">
            <SheetClose className="mr-4 mt-[20px] rounded-full bg-[#F0F0F099] p-1.5">
              <X size={28} />
            </SheetClose>
          </SheetHeader>
          <section className={`flex w-full flex-col px-5`}>
            <div className="flex flex-col gap-4 ">
              <p className="w-full pb-2 pt-[30px] text-center text-[24px] font-black uppercase leading-[29px] text-white lg:mt-auto lg:pb-[50px]">
                select your option
              </p>
              <SeatOption option="front" src={FrontCovers} />
              <SeatOption option="back" src={BackCovers} />
            </div>
          </section>
          <span className="flex min-h-[126px] w-full flex-col items-center justify-center self-end bg-white px-4">
            <p className="w-full pb-5 text-end text-[16px] font-black leading-[19px] ">
              Total: ${Number(total).toFixed(2)}
            </p>
            <Button
              disabled={total <= 0}
              className={`max-h-[48px] min-h-[48px] w-full ${total <= 0 ? 'disabled:bg-[#BE1B1B80]' : 'bg-[#BE1B1B]'} uppercase lg:max-h-[62px] lg:min-h-[62px] `}
              onClick={() => {
                if (selectedSeatCoverType.length > 0) {
                  handleAddToCart();
                }
              }}
            >
              Add to Cart
            </Button>
          </span>
        </SheetContent>
      </Sheet>
    </section>
  );
}
