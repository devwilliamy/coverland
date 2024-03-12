import Image from 'next/image';
import Banner from '@/images/hero/hero.webp';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  weight: ['100', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'sans-serif'],
  variable: '--font-raleway',
});

function About() {
  return (
    <div className="my-[5vh]">
      <header className="relative h-28 overflow-hidden lg:h-44">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.50)] from-0% via-[rgba(0,0,0,0.50)] via-100%"></div> */}
        <Image
          className="w-full bg-gray-300 bg-no-repeat object-contain"
          alt="coverland-banner"
          src={Banner}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className={`${raleway.className} text-[32px] font-bold leading-[32px] text-white lg:text-[40px] lg:leading-[44px]`}
          >
            About Coverland
          </p>
        </div>
      </header>
      <h2 className="mb-[5vh] text-5xl"> About Us </h2>
      <p className="mb-[5vh]">
        <p className="mb-[5vh] text-3xl font-black">Coverland</p>
        <p className="font-semibold">Address</p>
        <br />
        15529 Blackburn Ave, Norwalk, CA 90650
        <br />
        Email: info@coverland.com
        <br />
        Phone: (800) 799-5165
      </p>
      <p>
        The view of the earth from the moon fascinated me - a small disk,
        240,000 miles away. It was hard to think that that little thing held so
        many problems, so many frustrations. Raging nationalistic interests,
        famines, wars, pestilence dont show from that distance. Im convinced
        that some wayward stranger in a space-craft, coming from some other part
        of the heavens, could look at earth and never know that it was inhabited
        at all. But the samw wayward stranger would certainly know instinctively
        that if the earth were inhabited, then the destinies of all who lived on
        it must inevitably be interwoven and joined. We are one hunk of ground,
        water, air, clouds, floating around in space. From out there it really
        is one world.
      </p>
    </div>
  );
}

export default About;
