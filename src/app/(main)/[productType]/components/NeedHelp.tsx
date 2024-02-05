import Image from 'next/image';
import AgentProfile from '@/images/PDP/agent_profile.png';
import React from 'react';
import Link from 'next/link';

export default function NeedHelp() {
  return (
    <div className="flex flex-row items-center gap-2.5 pb-[46px] pt-8">
      <div className="flex h-[58px] w-[58px] flex-col items-center justify-center">
        <Image
          src={AgentProfile}
          alt="agent-profile"
          width={58}
          height={58}
          className="h-full w-full rounded-full"
        />
      </div>
      <div className="flex flex-col items-start justify-center">
        <p className="text-lg font-black text-[#1A1A1A]">Need Help?</p>
        <div className="flex gap-2">
          <Link
            href="tel:1-800-799-5165"
            className="hover-underline-animation-dark text-lg font-normal text-[#1A1A1A]"
          >
            1-800-799-5165
          </Link>
          {/* <Link
              href="#"
              className="text-base font-normal capitalize text-[#0C87B8] underline"
            >f
              live chat
            </Link> */}
        </div>
      </div>
    </div>
  );
}
