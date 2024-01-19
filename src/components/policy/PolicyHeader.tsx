import Image from 'next/image';
import PolicyBanner from '@/images/hero/home-hero_D.webp';
import { Raleway } from 'next/font/google';
import PolicyTabs from './PolicyTabs';

type PolicyHeaderProps = {
  headerText: string;
};

const raleway = Raleway({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-raleway',
});

export default function PolicyHeader({ headerText }: PolicyHeaderProps) {
  return (
    <>
      <div className="relative">
        <div className="h-28">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.50)] from-0% via-[rgba(0,0,0,0.50)] via-100%"></div>
          <Image
            className="h-28 bg-gray-300 bg-no-repeat object-cover "
            alt="policies banner"
            src={PolicyBanner}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className={`leading-32 text-[32px] font-bold text-white ${raleway.className}`}
          >
            {headerText}
          </p>
        </div>
      </div>
      <PolicyTabs />
    </>
  );
}
