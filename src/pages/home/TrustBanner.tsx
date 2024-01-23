import { Star } from 'lucide-react';
import eBayTrustBanner from '../../../public/images/trust-banner/ebay.svg';
import amazon from '../../../public/images/trust-banner/amazon.svg';
import google from '../../../public/images/trust-banner/google.svg';
import Image from 'next/image';

const TrustBanner = () => {
  return (
    <div
      className="mb-0 mt-20 flex h-auto flex-col items-center justify-start bg-foreground py-7 text-center text-black lg:h-80"
      //   style={{
      //     background: 'linear-gradient(90deg, #FF9400 0%, #FF9400 100%)',
      //   }}
    >
      <div>
        <p className="text-md pt-3 uppercase text-white">
          Thousands of Happy Customers
        </p>
      </div>
      <div>
        <p className="pt-0 text-3xl font-black uppercase text-white">
          20 years of trust
        </p>
      </div>
      <div className="flex flex-row items-center justify-center pb-1">
        <div>
          <Star size={40} color="#FF9400" />
        </div>
        <div>
          <Star size={40} color="#FF9400" />
        </div>
        <div>
          <Star size={40} color="#FF9400" />
        </div>
        <div>
          <Star size={40} color="#FF9400" />
        </div>
        <div>
          <Star size={40} color="#FF9400" />
        </div>
      </div>
      <div className="py-4">
        <p className="pb-4 text-sm uppercase text-white">
          4.8 average star rating!
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center md:flex-row ">
        <div className="flex h-14 w-56 flex-row flex-nowrap items-center justify-evenly rounded-full bg-white lg:w-64 ">
          <div className="flex h-auto w-1/4 flex-row items-center justify-center">
            <Image
              src={eBayTrustBanner}
              className="h-7 w-auto object-contain"
              alt="coverland ebay 5-star reviews"
            />
          </div>{' '}
          <div className="flex flex-col items-center justify-center">
            <p className="text-s text-dark  font-bold !leading-tight">
              99.9% Positive
            </p>
            <p className="text-dark text-xs !leading-tight">Feedback on eBay</p>
          </div>
        </div>
        <div className="my-8 flex h-14 w-56  flex-row flex-nowrap items-center justify-evenly rounded-full bg-[#FF9400] md:mx-8 md:my-0 lg:w-64">
          <div className="flex h-auto w-1/4 flex-row items-center justify-center">
            <Image
              src={amazon}
              className="h-7 w-auto object-contain"
              alt="coverland amazon 5-star reviews"
            />
          </div>{' '}
          <div className="flex flex-col items-center justify-center">
            <p className="text-dark font-bold !leading-tight">
              Over 5k Positive
            </p>
            <p className="text-dark text-xs !leading-tight">
              Reviews on Amazon
            </p>
          </div>
        </div>
        <div className="flex h-14 w-56 flex-row flex-nowrap items-center justify-evenly rounded-full bg-white lg:w-64">
          <div className="flex h-auto w-1/4 flex-row items-center justify-center">
            <Image
              src={google}
              className="h-7 w-auto object-contain"
              alt="coverland google 5-star reviews"
            />
          </div>{' '}
          <div className="flex flex-col items-center justify-center">
            <p className="text-s text-dark font-bold !leading-tight">
              5-Star Rating
            </p>
            <p className="text-dark text-xs !leading-tight">on Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
