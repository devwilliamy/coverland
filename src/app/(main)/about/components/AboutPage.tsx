import PolicyFurtherAssistance from '@/components/policy/PolicyFurtherAssistance';
import PolicyHeader from '@/components/policy/PolicyHeader';
import Image from 'next/image';
import { Lato, Raleway } from 'next/font/google';
import HalfCover from '@/images/about/half-cover.webp';
import LogoBlack from '@/images/about/logo-blk-wide.webp';
import Money from '@/images/about/money.webp';
import Heart from '@/images/about/heart.webp';
import Star from '@/images/about/star.webp';
import Workers from '@/images/about/office-people.webp';

const raleway = Raleway({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-raleway',
});
const lato = Lato({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-lato',
});
const extraPerksGrid = [
  {
    img: Money,
    title: 'Reasonable cost',
    text: "Get exceptional quality products at a highly affordable price range that won't weigh heavily on your pocket.",
  },
  {
    img: Star,
    title: 'Limitless options',
    text: 'We design specialized products to fit all kinds of vehicles. You name it; we make it happen!',
  },
  {
    img: Heart,
    title: 'We value you',
    text: 'Take a look at all the honest reviews and feedback on our products provided by our valued customers.',
  },
];

export default function AboutPage() {
  return (
    <div className="-mt-[1px] mb-[65px] flex w-full flex-col items-center lg:mb-[100px]">
      <PolicyHeader headerText="About Us" />
      <section className="flex w-full max-w-[850px] flex-col items-center gap-[50px] px-5">
        <p className="flex w-full items-center justify-center pt-[30px] text-sm lg:text-center">
          For over 20 years, Coverland has offered car covers, seat covers, and
          many other accessories, helping us become an industry leader in
          premium automotive accessories. We cover vehicles ranging from cars
          and trucks to more.
        </p>

        <span className="flex w-full gap-2.5 lg:gap-7 ">
          <Image alt="Half Cover" src={HalfCover} className="flex w-1/2" />
          <div className="flex w-1/2 flex-col items-center justify-center">
            <Image
              alt="Coverland Logo Black"
              src={LogoBlack}
              className="flex w-full"
            />
            <p className="text-sm font-[600]">
              We care for your vehicle just as you do! All our resources are
              dedicated to providing you with an unforgettable experience
              through superior service and products.
            </p>
          </div>
        </span>
        <p
          className={`-mb-[20px] hidden w-full text-center text-[28px] font-[800] leading-[21px] text-[#0A083B] lg:flex ${lato.className} justify-center`}
        >
          EXTRA PERKS
        </p>
        <span className="flex w-full items-center justify-center gap-[30px] max-lg:flex-col lg:items-start ">
          <p
            className={`mb-[10px] flex w-full text-center text-[28px] font-[800] leading-[21px] text-[#0A083B] lg:hidden ${lato.className} justify-center`}
          >
            EXTRA PERKS
          </p>
          {extraPerksGrid.map(({ img, title, text }) => (
            <div
              key={`contact-item-${img}`}
              className="flex max-w-[200px] flex-col items-center justify-center"
            >
              <Image src={img} alt="contact-grid-image" />
              <p
                className={`${lato.className} whitespace-nowrap pt-3 text-[16px] font-[900] uppercase leading-[21px] text-[#053B79] `}
              >
                {title}
              </p>
              <p className={`pt-[14px] text-center text-[14px] leading-[18px]`}>
                {text}
              </p>
            </div>
          ))}
        </span>
        <div className="lg: flex w-full items-center max-lg:flex-col">
          <Image
            alt="office workers"
            src={Workers}
            className=" flex w-full  max-lg:max-h-[150px] max-lg:overflow-hidden max-lg:object-cover lg:w-1/2"
          />
          <span className=" flex w-full flex-col bg-gray-100 px-[18px] py-6 max-lg:mb-[10px] max-lg:mt-4 lg:w-1/2">
            <div
              className={`${lato.className} mb-[18px]  flex min-h-[48px] w-full items-center justify-center rounded-[10px] bg-gradient-to-r from-[#072c58] from-5% to-[#034998] to-80%  text-[25px] font-[700] leading-[21px] text-white `}
            >
              OUR SUCCESS STORY
            </div>
            <p className="flex w-full text-center text-[14px] leading-[21px] ">
              Originally built from a garage in sunny California, we have grown
              from being one of the first online distributors into a global
              brand. Our success is owed to our dedicated and highly qualified
              team of professionals, who are as passionate about cars as any car
              enthusiast. Most importantly, we believe in caring for your
              vehicle as if it were our own. This is why, from production and
              purchase to delivery, we have taken every step to ensure that you
              receive high-quality items that fit seamlessly and are convenient
              for everyday use.
            </p>
          </span>
        </div>
        <PolicyFurtherAssistance />
      </section>
    </div>
  );
}
