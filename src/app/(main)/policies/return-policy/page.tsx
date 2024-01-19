import React from 'react';
import PolicyHeader from '@/components/policy/PolicyHeader';
import Link from 'next/link';
import { PolicyTitle } from '@/components/policy/PolicyTitle';
import { PolicyDetail } from '@/components/policy/PolicyDetail';
import LineSeparator from '@/components/ui/line-separator';
import CallIcon from '@/components/icons/CallIcon';

function ReturnPolicy() {
  return (
    <>
      <PolicyHeader headerText="Return Policy" />
      <div className="relative px-5 pt-8">
        {/* <PolicyDetailItem title="FREE RETURNS"> */}
        <PolicyTitle title="FREE RETURNS" />
        {/* <p className="text-normal font-normal leading-6"> */}
        <PolicyDetail>
          We are currently offering 30-Day hassle free returns. If you are not
          satisfied or have simply changed your mind, feel free to contact us
          via email at
          <Link href="mailto:returns@coverland.com" target="_blank">
            <span className="text-normal font-bold text-[#185CFF]">
              {' '}
              returns@coverland.com{' '}
            </span>
          </Link>
          or call us at (800)799-5165 and we will process the return. We will
          provide a free shipping return label anytime for the first 30-days
          after the item is being delivered.
        </PolicyDetail>
        {/* </p> */}
        <PolicyDetail>
          Please do not return the merchandise to the shipping center. Return it
          only to our main hub in California.
        </PolicyDetail>
        <PolicyDetail>
          If you are not appeased with the item you ordered, you can print and
          complete this Return/Exchange Form and return to the following
          address.
        </PolicyDetail>
        <ul className="text-normal list-none pt-5 font-normal leading-6">
          <li>Coverland </li>
          <li>15529 Blackburn Ave</li>
          <li>Norwalk, CA 90650</li>
        </ul>
        <div className="pt-5"></div>
        <PolicyTitle title="FREE EXCHANGES" />
        <PolicyDetail>
          If you wish to exchange an item purchased, please contact our Customer
          Service Department directly at (800) 799-5165. They will check the
          availability of the replacement item requested by you and further
          explain the steps needed to make the exchange.
        </PolicyDetail>
        <PolicyDetail>
          Merchandise that is exchangeable can be returned by mailing to the
          address mentioned above. There are no additional fees for an exchange.
          Once the original item is received, the replacement merchandise will
          arrive to you within 2-3 business days.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyTitle title="RETURN INSTRUCTIONS" />
        <PolicyDetail>
          All return labels are sent via email in PDF file format, service
          provider will be FedEx or UPS unless otherwise stated. Please allow 1
          to 2 billing cycles for refunds to appear on your credit card
          statement.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyTitle title="INTERNATIONAL ORDERS" />
        <PolicyDetail>
          All orders shipped outside the USA are not eligible for returns.
        </PolicyDetail>
        <div className="pt-5"></div>

        <div className="bg-opacity-2 rounded-xl border-2 border-gray-300">
          <div className="px-5 pt-8 text-center">
            <h1 className="text-2xl font-bold text-black">
              Need Further Assistance?
            </h1>
            <h2 className="pt-2 text-sm font-normal text-black">
              Contact one of our Product Specialists Today!
            </h2>
            <p className="pt-2 text-xs font-bold italic text-black">
              Our customer support services are available 7 days a week 9:00 AM
              to 5:30 PM PST.
            </p>
          </div>
          <LineSeparator className="mx-6 mb-6 mt-3" />
          <div>
            <CallIcon />
            <p>Call Us</p>
            {/* <Link>
              <span></span>
            </Link> */}
          </div>
          {/* <Separator className="mb-10 mt-3" /> */}
        </div>
      </div>
    </>
  );
}

export default ReturnPolicy;
