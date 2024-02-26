import dynamic from 'next/dynamic';
import Logo from '@/components/header/Logo';
import { UserRound } from 'lucide-react';
import Link from 'next/link';

const Cart = dynamic(() => import('@/components/header/Cart'));
const coverTypes = [
  { title: 'Car Covers', link: '/car-covers' },
  { title: 'SUV Covers', link: '/suv-covers' },
  { title: 'Truck Covers', link: '/truck-covers' },
];

function Header() {
  return (
    <>
      <header className="hidden w-screen max-w-[1280px] flex-col items-stretch sm:mb-0  lg:ml-auto lg:flex lg:w-auto lg:pt-2.5">
        <section className="flex w-full items-center justify-between px-16 max-md:max-w-full max-md:px-5">
          <Logo />
          <div className="flex max-h-[24px] min-h-[24px] items-center gap-[30px]">
            {/* <MyGarage /> */}
            {/* <Phone /> */}
            <Link href="/login">
              <UserRound />
            </Link>
            <Cart />
          </div>
        </section>
        <section className="flex w-full items-center gap-[35px] px-16 py-[18px] text-[17px] font-[700] leading-[100%]">
          {coverTypes.map(({ title, link }) => (
            <Link href={link} key={link}>
              {title}
            </Link>
          ))}
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
        <section className="mb-[17px] flex w-full items-center justify-between px-16 max-md:max-w-full max-md:px-5">
          <Logo />
          <div className="flex items-center gap-[28px] ">
            <Cart />
            <Link href="/login">
              <UserRound className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
