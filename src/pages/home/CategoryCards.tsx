import Image from 'next/image';
import carCoverCategory from '../../../public/images/categories/carCoverImage.webp';
import suvCoverCategory from '../../../public/images/categories/suvCoverImage.webp';
import truckCoverCategory from '../../../public/images/categories/truckCoverImage.webp';
import vanCoverCategory from '../../../public/images/categories/vanCoverImage.webp';
import Link from 'next/link';

export default function CategoryCards() {
  return (
    <section className="flex h-auto w-screen max-w-[1280px] flex-col bg-[#F9F9FB] px-3 pt-20 text-center md:px-24 md:pt-20 lg:bg-white  lg:px-20">
      <div className="flex w-full flex-row flex-nowrap items-center justify-center md:justify-between">
        <Link
          href="/car-covers"
          className="cat-links lg:justify-right mr-2 flex h-auto w-[45%] flex-col-reverse items-center justify-center overflow-hidden rounded-xl bg-[#F9F9FB] lg:mr-0 lg:h-60 lg:w-[49%] lg:flex-row xl:justify-evenly"
        >
          <div className="relative bottom-5 flex flex-col items-center justify-center md:bottom-0 md:pl-3 lg:pb-0 lg:pr-12 lg:pt-0">
            <p className="xs:pt-0 hover-underline-animation-dark md:mg-10 pt-5 text-sm font-extrabold uppercase sm:text-2xl md:pb-10 lg:pb-0">
              Car <br className="hidden lg:block xl:hidden" /> Covers
            </p>
          </div>
          <div className="test">
            <Image
              src={carCoverCategory}
              className="h-auto w-auto lg:h-60"
              height={300}
              width={300}
              alt="coverland car covers"
            />
          </div>
        </Link>
        <Link
          href="/truck-covers"
          className="cat-links lg:justify-right ml-2 flex h-auto w-[45%] flex-col-reverse items-center justify-center overflow-hidden rounded-xl bg-[#F9F9FB] lg:ml-0 lg:h-60 lg:w-[49%] lg:flex-row xl:justify-evenly"
        >
          <div className="relative bottom-5 flex flex-col items-center justify-center md:bottom-0 md:pl-3 lg:pb-0 lg:pr-12 lg:pt-0">
            <p className="xs:pt-0 hover-underline-animation-dark md:mg-10 pt-5 text-sm font-extrabold uppercase sm:text-2xl md:pb-10 lg:pb-0">
              Truck <br className="hidden lg:block xl:hidden" /> Covers
            </p>
          </div>
          <div className="">
            {' '}
            <Image
              src={truckCoverCategory}
              className="h-auto w-auto lg:h-60"
              height={300}
              alt="coverland truck covers"
            />
          </div>
        </Link>
      </div>
      <div className="flex w-full flex-row flex-nowrap items-center justify-center pt-10 md:justify-between lg:pt-8">
        <Link
          href="/suv-covers"
          className="cat-links lg:justify-right mr-2 flex h-auto w-[45%] flex-col-reverse items-center justify-center overflow-hidden rounded-xl bg-[#F9F9FB] lg:mr-0 lg:h-60 lg:w-[49%] lg:flex-row xl:justify-evenly"
        >
          <div className="relative bottom-5 flex flex-col items-center justify-center md:bottom-0 md:pl-3 lg:pb-0 lg:pr-12 lg:pt-0">
            <p className="xs:pt-0 hover-underline-animation-dark md:mg-10 pt-5 text-sm font-extrabold uppercase sm:text-2xl md:pb-10 lg:pb-0">
              SUV <br className="hidden lg:block xl:hidden" /> Covers
            </p>
          </div>
          <div className="">
            <Image
              src={suvCoverCategory}
              className="h-auto w-auto lg:h-60"
              height={300}
              alt="coverland suv covers"
            />
          </div>
        </Link>
        <Link
          href="/van-cover"
          className="cat-links lg:justify-right ml-2 flex h-auto w-[45%] flex-col-reverse items-center justify-center overflow-hidden rounded-xl bg-[#F9F9FB] lg:ml-0 lg:h-60 lg:w-[49%] lg:flex-row xl:justify-evenly"
        >
          <div className="relative bottom-5 flex flex-col items-center justify-center md:bottom-0 md:pl-3 lg:pb-0 lg:pr-12 lg:pt-0">
            <p className="xs:pt-0 hover-underline-animation-dark md:mg-10 pt-5 text-sm font-extrabold uppercase sm:text-2xl md:pb-10 lg:pb-0">
              Van <br className="hidden lg:block xl:hidden" /> Covers
            </p>
          </div>
          <div className="">
            <Image
              src={vanCoverCategory}
              className="h-auto w-auto lg:h-60"
              height={300}
              alt="coverland van covers"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
