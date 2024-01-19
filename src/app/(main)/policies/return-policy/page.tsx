import React from 'react';
import PolicyHeader from '@/components/policy/PolicyHeader';
import Link from 'next/link';
import PolicyTitle from '@/components/policy/PolicyTitle';
import PolicyDetail from '@/components/policy/PolicyDetail';
import PolicyFurtherAssistance from '@/components/policy/PolicyFurtherAssistance';

function ReturnPolicy() {
  return (
    <>
      <PolicyHeader headerText="Return Policy" />
      <div className="lg:mx-auto lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
        <div className="relative px-5 py-8 lg:py-[70px] ">
          <PolicyTitle title="FREE RETURNS" />
          <PolicyDetail>
            We are currently offering 30-Day hassle free returns. If you are not
            satisfied or have simply changed your mind, feel free to contact us
            via email at
            <Link
              href="mailto:returns@coverland.com"
              target="_blank"
              className="text-normal font-bold text-[#185CFF]"
            >
              {' '}
              returns@coverland.com{' '}
            </Link>
            or call us at (800)799-5165 and we will process the return. We will
            provide a free shipping return label anytime for the first 30-days
            after the item is being delivered.
          </PolicyDetail>
          <PolicyDetail>
            Please do not return the merchandise to the shipping center. Return
            it only to our main hub in California.
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
            If you wish to exchange an item purchased, please contact our
            Customer Service Department directly at (800) 799-5165. They will
            check the availability of the replacement item requested by you and
            further explain the steps needed to make the exchange.
          </PolicyDetail>
          <PolicyDetail>
            Merchandise that is exchangeable can be returned by mailing to the
            address mentioned above. There are no additional fees for an
            exchange. Once the original item is received, the replacement
            merchandise will arrive to you within 2-3 business days.
          </PolicyDetail>
          <div className="pt-5"></div>
          <PolicyTitle title="RETURN INSTRUCTIONS" />
          <PolicyDetail>
            All return labels are sent via email in PDF file format, service
            provider will be FedEx or UPS unless otherwise stated.
            <br />
            Please allow 1 to 2 billing cycles for refunds to appear on your
            credit card statement.
          </PolicyDetail>
          <div className="pt-5"></div>
          <PolicyTitle title="INTERNATIONAL ORDERS" />
          <PolicyDetail>
            All orders shipped outside the USA are not eligible for returns.
          </PolicyDetail>
          <div className="pt-5 lg:pt-12"></div>
          <PolicyFurtherAssistance />
        </div>
      </div>
    </>
  );
}

export default ReturnPolicy;
