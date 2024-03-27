'use client';
import dynamic from 'next/dynamic';
import Logo from '@/components/header/Logo';
import { SearchIcon, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const Cart = dynamic(() => import('@/components/header/Cart'));
const coverTypes = [
  { title: 'Car Covers', link: '/car-covers' },
  { title: 'SUV Covers', link: '/suv-covers' },
  { title: 'Truck Covers', link: '/truck-covers' },
];

function Header() {
  const [searchText, setSearchText] = useState(
    'What vehicle are you looking for?'
  );
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchWidth, setSearchWidth] = useState<string | undefined>();

  useEffect(() => {
    const searchElWidth = document.getElementById('searchbar')?.style.width;
    setSearchWidth(searchElWidth);
  }, []);

  return (
    <>
      {searchModalOpen && (
        <div
          onClick={(e) => {
            setTimeout(() => {
              if (
                !document.activeElement?.closest('#header-search') &&
                !document.activeElement?.closest('#search-header-content')
              ) {
                setSearchModalOpen(false);
                document.body.style.overflow = '';
              }
            }, 40);
          }}
          className="fixed left-0 top-0 z-[2] flex h-screen w-screen bg-black/40 "
        >
          <div className="relative flex w-full px-[64px]  ">
            <Logo className={'invisible'} />
            <span
              id="search-header-content"
              className="relative flex w-full flex-col "
              tabIndex={0}
            >
              <div className="absolute flex h-[95vh] w-full flex-col rounded-lg bg-white px-[20px] pl-[27px] pr-[50px]  pt-[20px]">
                <div className="z-[10] flex max-h-[40px]  min-h-10 w-full cursor-pointer items-center gap-[10px] rounded-full bg-[#E7E7E7] px-5">
                  <SearchIcon size={20} />
                  <input
                    id="header-search"
                    className="h-full w-full cursor-auto bg-transparent text-[17px] leading-[17px] text-[#767676] outline-none"
                    placeholder={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                  />
                  {/* <p className="text-[17px] leading-[17px] text-[#767676]">
                    {searchText}
                  </p> */}
                </div>
              </div>
            </span>
            <div className="invisible flex max-h-[24px] min-h-[24px] items-center gap-[30px]">
              {/* <MyGarage /> */}
              {/* <Phone /> */}
              <UserRound />
              <Cart />
            </div>
            {/* <div className="absolute h-screen w-full bg-white"></div> */}
          </div>
        </div>
      )}
      <header className="hidden w-screen max-w-[1280px] flex-col items-stretch sm:mb-0   lg:ml-auto lg:flex lg:w-full lg:pt-2.5">
        <section className="flex w-full items-center justify-between px-16 max-md:max-w-full max-md:px-5">
          <Logo />
          <span className="flex w-full  pl-[27px] pr-[50px]">
            {/* <Popover open={searchModalOpen} onOpenChange={setSearchModalOpen}>
              <PopoverTrigger
                onClick={(e) => {
                  e.preventDefault();
                  setSearchModalOpen(true);
                  const headerSearch = document.getElementById('header-search');
                  headerSearch?.click();
                }}
                className="flex min-h-10 w-full cursor-pointer items-center gap-[10px] rounded-full bg-[#E7E7E7] px-5"
              >
                <div className="flex w-full items-center gap-[10px]">
                  <SearchIcon size={20} />
                  <p className="text-[17px] leading-[17px] text-[#767676]">
                    {searchText}
                  </p>
                  <input className="hidden" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex w-full ">
                <div className="h-[200px] min-w-[400px] bg-yellow-400"></div>
              </PopoverContent>
            </Popover> */}
            <div
              onClick={(e) => {
                setSearchModalOpen(true);
                document.body.style.overflow = 'hidden';
              }}
              className=" flex min-h-10 w-full cursor-pointer items-center gap-[10px] rounded-full bg-[#E7E7E7] px-5"
            >
              <SearchIcon size={20} />
              <input
                id="header-search"
                className="hidden"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <p className="text-[17px] leading-[17px] text-[#767676]">
                {searchText}
              </p>
            </div>
          </span>

          <div className="flex max-h-[24px] min-h-[24px] items-center gap-[30px]">
            {/* <MyGarage /> */}
            {/* <Phone /> */}
            <Link href="/login" aria-label="Go to login page">
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
        <section className="whitespace-nowrap bg-white px-20  py-1.5 text-center text-[18px] font-[700] uppercase lg:text-[24px] lg:leading-[28px]">
          <p>March Special Sale!</p>
        </section>
        <section className="whitespace-nowrap bg-black px-20 py-2 text-center text-[18px] font-[500] uppercase text-white lg:text-[24px] lg:leading-[26px]">
          <p>SAVE UP TO 50%</p>
        </section>
      </header>
      {/* Mobile Header */}
      <header className="flex w-screen max-w-[1280px] flex-col items-stretch lg:hidden">
        <section className="min-h-[7px] w-full bg-black" />
        <section className="whitespace-nowrap bg-white  px-20 text-center text-[18px] font-[600] uppercase text-black ">
          <p>March Special Sale!</p>
        </section>
        <section className="whitespace-nowrap bg-black  px-20 text-center text-[18px] font-[500] uppercase text-white ">
          <p>SAVE UP TO 50%</p>
        </section>
        <section className="mb-[17px] flex w-full items-center justify-between px-16 max-md:mb-2 max-md:max-w-full max-md:px-5">
          <Logo />
          <div className="flex items-center gap-[28px] ">
            <Cart />
            <Link href="/login" aria-label="Mobile go to login page">
              <UserRound className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </header>
    </>
  );
}

export default Header;
