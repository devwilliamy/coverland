import dynamic from 'next/dynamic';
import Logo from '@/components/header/Logo';
import { UserRound } from 'lucide-react';
import Link from 'next/link';

const Cart = dynamic(() => import('@/components/header/Cart'), { ssr: false });

function Header() {
  return (
    <header className="mx-auto flex w-screen max-w-[1280px] flex-col items-stretch bg-white sm:mb-0 lg:ml-auto lg:w-auto lg:pt-2.5">
      <section className="flex w-full flex-col items-stretch px-16 max-md:max-w-full max-md:px-5">
        <div className="flex w-full items-center justify-between max-md:max-w-full max-md:flex-wrap">
          <div className="mr-auto">
            <Logo />
          </div>
          <div className="flex flex-row items-center">
            <Link href="/login" className="mr-4 mt-1 lg:pr-8">
              <UserRound size={20} />
            </Link>
            <Cart />
          </div>
          {/* <User size={32} /> */}
          {/* <div className="relative flex min-h-[39px] w-full items-center gap-2.5 self-center pb-1 pt-2.5 max-md:max-w-full max-md:flex-wrap lg:px-5"> */}
          {/* <AlgoliaSearchbar /> */}
          {/* <input
              className="relative flex text-lg p-2 bg-gray-100 rounded-2xl leading-6 self-center grow shrink basis-auto my-auto"
              aria-label="What vehicle are you looking for?"
              placeholder="What vehicle are you looking for?"
              onChange={(e) => filterModels(e.target.value)}
            /> */}
          {/* </div> */}
        </div>
        {/* <div className="items-start flex justify-between gap-5 mt-5 pr-14 self-start max-md:max-w-full max-md:flex-wrap max-md:pr-5">
          <div
            className="text-zinc-900 text-lg font-bold leading-4 grow whitespace-nowrap self-start"
            aria-label="Car Covers"
          >
            Car Covers
          </div>
          <div
            className="text-zinc-900 text-lg font-bold leading-4 self-start"
            aria-label="SUV Covers"
          >
            SUV Covers
          </div>
          <div
            className="text-zinc-900 text-lg font-bold leading-4 self-start"
            aria-label="Truck Covers"
          >
            Truck Covers
          </div>
        </div> */}
      </section>
      <div className="order-first w-full items-center justify-center bg-zinc-900  text-center font-bold leading-6 text-white lg:order-none lg:mt-5 lg:py-3.5 ">
        <p className="text-[35px] font-[600] uppercase italic leading-[41px] tracking-wider text-[#F0FF3F] lg:text-4xl">
          *Today&apos;s Special: 50% OFF!*
        </p>
      </div>
    </header>
  );
}

export default Header;
