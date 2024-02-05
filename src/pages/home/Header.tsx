import dynamic from 'next/dynamic';
import Logo from '@/components/header/Logo';
import { UserRound } from 'lucide-react';
import { IoIosMenu } from 'react-icons/io';
import Link from 'next/link';
import AlgoliaSearchbar from '@/components/header/AlgoliaSearchbar';

const Cart = dynamic(() => import('@/components/header/Cart'), { ssr: false });

function Header() {
  return (
    <header className="mx-auto flex w-screen max-w-[1280px] flex-col items-stretch  sm:mb-0 lg:ml-auto lg:w-auto lg:pt-2.5">
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
        {/* <div className="flex flex-row items-center">
            <Link href="/login" className="mr-4 mt-1 lg:pr-8">
              <UserRound size={20} />
            </Link>
          </div>
          <User size={32} />
          <div className="relative flex min-h-[39px] w-full items-center gap-2.5 self-center pb-1 pt-2.5 max-md:max-w-full max-md:flex-wrap lg:px-5">
          <input
              className="relative flex text-lg p-2 bg-gray-100 rounded-2xl leading-6 self-center grow shrink basis-auto my-auto"
              aria-label="What vehicle are you looking for?"
              placeholder="What vehicle are you looking for?"
              onChange={(e) => filterModels(e.target.value)}
            /> */}
      </section>
      <section className="flex w-full items-center justify-between px-16 pb-3 pt-2 max-md:max-w-full max-md:px-5">
        {/* <AlgoliaSearchbar /> */}
      </section>
    </header>
  );
}

export default Header;
