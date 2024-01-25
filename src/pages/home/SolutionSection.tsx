import Image from 'next/image';
import Link from 'next/link';
import Custom from '../../../public/images/solutions/custom-car-cover.webp';
import Waterproof from '../../../public/images/solutions/waterproof-cover.webp';

export default function SolutionSection() {
  return (
    <section className="xs:pb-2 flex h-auto w-screen max-w-[1280px] flex-col bg-white px-4 md:px-20">
      <div className="xs:justify-center flex h-full w-full flex-col items-center pb-8 md:pb-20">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-dark pb-5 text-3xl font-extrabold uppercase lg:text-5xl">
            Perfect Solution For All Weather
          </h1>
          <p className="text-lightGray text-xl font-bold uppercase lg:text-2xl">
            Ultimate Protection!
          </p>
        </div>
        <div className="mb-10 mt-10 text-center md:mb-0 md:flex">
          <div className="">
            <Link
              href="/car-covers"
              className="xs:mb-5 mb-5 rounded-full bg-black p-2 px-5 text-lg font-medium text-white md:mx-5 md:mb-0 md:text-xl"
            >
              Shop Car Covers
            </Link>
          </div>
          <div className=" my-4 lg:my-0">
            <Link
              href="/suv-covers"
              className="mb-5 rounded-full bg-black p-2 px-5 text-lg font-medium text-white md:mx-5 md:mb-0 md:text-xl"
            >
              Shop SUV Covers
            </Link>
          </div>
          <div>
            <Link
              href="/truck-covers"
              className="rounded-full bg-black p-2 px-5 text-lg font-medium text-white md:mx-5 md:text-xl"
            >
              Shop Truck Covers
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-col items-start justify-end object-cover px-4 md:mr-2 lg:p-0">
          <Image
            src={Custom}
            className=" w-full rounded-xl backdrop-brightness-50 backdrop-filter"
            alt="a grey car cover on a vehicle"
          />
          <div className="absolute flex flex-col items-start justify-end pb-8 pl-4">
            <p className="text-lg font-bold capitalize text-white sm:text-lg lg:text-2xl">
              Customized Car Car Solutions
            </p>
            <div className="pt-4">
              <Link
                href="/car-covers"
                className="text-dark rounded-full bg-white px-4 py-2 text-lg font-semibold"
              >
                Shop Custom Covers
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-end object-cover px-4 md:ml-2 lg:p-0">
          <Image
            src={Waterproof}
            className=" w-full rounded-xl backdrop-brightness-50 backdrop-filter"
            alt="a woman pulling a car cover over her vehicle"
          />
          <div className="absolute flex flex-col items-start justify-end pb-8 pl-4">
            <p className="text-lg font-bold capitalize text-white sm:text-lg lg:text-2xl">
              Rain-Repellent Shield For your Car
            </p>
            <div className="pt-4">
              <Link
                href="/car-covers"
                className="text-dark rounded-full bg-white px-4 py-2 text-lg font-semibold"
              >
                Shop Waterproof Covers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
