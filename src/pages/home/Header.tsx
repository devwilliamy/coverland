import dynamic from 'next/dynamic';
import Logo from '@/components/header/Logo';
import { Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import Models from '@/data/car_year_make_model_list.json';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
// import Cart from '@/components/header/Cart';
import {
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';
import { useHits } from 'react-instantsearch';
import algoliasearch from 'algoliasearch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { generationDefaultKeys } from '@/lib/constants';
// import { AlgoliaSearchbar } from '@/components/header/AlgoliaSearchbar';

const Cart = dynamic(() => import('@/components/header/Cart'), { ssr: false });
const AlgoliaSearchbar = dynamic(
  () => import('@/components/header/AlgoliaSearchbar'),
  { ssr: false }
);

function Header() {
  return (
    <header className="bg-white flex flex-col items-stretch pt-2.5">
      <section className="flex w-full flex-col items-stretch px-16 max-md:max-w-full max-md:px-5">
        <div className="flex w-full items-center justify-between max-md:max-w-full max-md:flex-wrap">
          <Logo />
          <div className="flex gap-5 md:order-last items-center">
            <Cart />
            {/* <User size={32} /> */}
          </div>
          <div className="flex w-full items-center self-center relative min-h-[39px] gap-2.5 pt-2.5 pb-1 px-5 max-md:max-w-full max-md:flex-wrap">
            <AlgoliaSearchbar />
            {/* <input
              className="relative flex text-lg p-2 bg-gray-100 rounded-2xl leading-6 self-center grow shrink basis-auto my-auto"
              aria-label="What vehicle are you looking for?"
              placeholder="What vehicle are you looking for?"
              onChange={(e) => filterModels(e.target.value)}
            /> */}
          </div>
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
      <div className="text-white text-center w-full  font-bold leading-6 bg-zinc-900 justify-center items-center mt-5 py-3.5 ">
        <p className="text-lg md:text-xl lg:text-4xl font-bold italic text-[#FF0000] uppercase">
          Flash Sale: 50% off{' '}
          <span className="text-white">sale ends this week! </span>{' '}
        </p>
      </div>
    </header>
  );
}

export default Header;
