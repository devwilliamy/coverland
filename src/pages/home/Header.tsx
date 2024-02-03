import dynamic from 'next/dynamic';
import Logo from '@/components/header/Logo';
import { Phone, UserRound } from 'lucide-react';
import { IoIosMenu } from 'react-icons/io';
import Link from 'next/link';
import AlgoliaSearchbar from '@/components/header/AlgoliaSearchbar';
import { MyGarage } from '@/components/PDP/components/icons';

const Cart = dynamic(() => import('@/components/header/Cart'), { ssr: false });

function Header() {
  return (
    <>
      <header className="hidden w-screen max-w-[1280px] flex-col items-stretch sm:mb-0  lg:ml-auto lg:flex lg:w-auto lg:pt-2.5">
        <section className="flex w-full items-center justify-between px-16 max-md:max-w-full max-md:px-5">
          <Logo />
          <div className="ml-[27px] mr-[50px] flex w-full">
            <AlgoliaSearchbar />
          </div>
          <div className="flex max-h-[24px] min-h-[24px] items-center gap-[30px]">
            <MyGarage />
            <Phone />
            <Link href="/login">
              <UserRound />
            </Link>
            <Cart />
          </div>
        </section>
        <section className="min-h-[7px] w-full bg-black" />
        <section className="whitespace-nowrap bg-white  px-20 text-center text-[18px] font-[600] uppercase text-black lg:text-4xl">
          <p>February Special Sale!</p>
        </section>
        <section className="whitespace-nowrap bg-black  px-20 text-center text-[18px] font-[500] uppercase text-white lg:text-4xl">
          <p>SAVE UP TO 50%</p>
        </section>
      </header>
      {/* Mobile Header */}
      <header className="flex w-screen max-w-[1280px] flex-col items-stretch lg:hidden">
        <section className="min-h-[7px] w-full bg-black" />
        <section className="whitespace-nowrap bg-white  px-20 text-center text-[18px] font-[600] uppercase text-black lg:text-4xl">
          <p>February Special Sale!</p>
        </section>
        <section className="whitespace-nowrap bg-black  px-20 text-center text-[18px] font-[500] uppercase text-white lg:text-4xl">
          <p>SAVE UP TO 50%</p>
        </section>
        <section className="flex w-full items-center justify-between px-16 max-md:max-w-full max-md:px-5">
          <Logo />
          <div className="flex items-center ">
            <Cart />
            <IoIosMenu className="ml-[14px] min-h-[20px] min-w-[20px]" />
          </div>
        </section>
        <section className="mb-[11px] mt-[3px] flex w-full place-self-center px-[14px]">
          <AlgoliaSearchbar />
        </section>
      </header>
    </>
  );
}

export default Header;
