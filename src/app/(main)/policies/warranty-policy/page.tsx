'use client';

import React from 'react';
import PolicyHeader from '@/components/policy/PolicyHeader';
import PolicyTitle from '@/components/policy/PolicyTitle';
import PolicyDetail from '@/components/policy/PolicyDetail';
import PolicyFurtherAssistance from '@/components/policy/PolicyFurtherAssistance';
import { usePathname } from 'next/navigation';

function WarrantyPolicy({ hideHeader }: { hideHeader?: boolean }) {
  const path = usePathname();
  const isSeatCovers = path === '/seat-covers';
  let warrantyLength = 'A LIFETIME';
  if (isSeatCovers) {
    warrantyLength = '10-Years';
  }

  return (
    <>
       <PolicyHeader hideHeader={hideHeader} headerText="Warranty" />
      <div className="lg:mx-auto lg:flex lg:w-[842px] lg:flex-col lg:justify-center">
        <div className="relative px-5 pb-4 lg:py-14">
          <PolicyTitle
            title={`FULL WARRANTY FOR UP TO ${warrantyLength}! `}
            uppercase
          />
          <PolicyTitle title="Welcome to Coverland's Warranty Page" uppercase />
          <PolicyDetail>
            At Coverland, we are committed to providing our customers with
            exceptional quality products and peace of mind. We stand behind the
            craftsmanship and durability of our items, offering a comprehensive
            warranty for up to {warrantyLength}.
          </PolicyDetail>
          <PolicyTitle title="Warranty Coverage" uppercase />
          <PolicyDetail>
            Our warranty covers your product for up to {warrantyLength},
            depending on its specific warranty period, starting from the date of
            purchase. It includes protection against various issues:
          </PolicyDetail>
          <ol className="list-disc pl-6 pt-4">
            <li>
              <span className="font-bold">Normal Wear and Tear:</span> Whether
              it&apos;s intense sun, heavy rain, snow, or hail, our products are
              designed to withstand diverse weather conditions. If your product
              fails to protect your vehicle due to weather-related damages,
              we&apos;ve got you covered.
            </li>
            <li>
              <span className="font-bold">Weather-Related Damages:</span> Be it
              intense sun, heavy rain, snow, or hail, our products are designed
              to withstand diverse weather conditions. If your product fails to
              protect your vehicle due to weather-related damages, we&apos;ve
              got you covered.
            </li>
            <li>
              <span className="font-bold">Ripping and Tears:</span> Despite the
              high durability of our materials, accidents happen. If your
              product rips or tears during normal usage, we will replace it.
            </li>
          </ol>
          <PolicyTitle title="How to Claim Your Warranty" uppercase />
          <PolicyDetail>
            If you encounter any issues covered under this warranty, please
            follow these steps:
          </PolicyDetail>
          <ol className="list-decimal pl-6 pt-4">
            <li>
              <span className="font-bold">Contact Us:</span> Reach out to our
              customer service team via phone or email, providing your purchase
              details and a brief description of the issue.{' '}
            </li>
            <li>
              <span className="font-bold">Documentation:</span> We may request
              photos or a short video of the damage for our records.{' '}
            </li>
            <li>
              <span className="font-bold">Review and Approval:</span> Our team
              will review your claim and, upon approval, will initiate the
              replacement process.{' '}
            </li>
            <li>
              <span className="font-bold">Replacement:</span> A replacement
              cover will be sent to you at no additional cost, except for
              shipping.
            </li>
          </ol>
          <PolicyTitle title="Limitations and Exclusions" uppercase />
          <PolicyDetail>This warranty does not cover:</PolicyDetail>
          <ol className="list-disc pl-6 pt-4">
            <li>Damage due to improper use or installation. </li>
            <li>Alterations or modifications made to the car cover.</li>
            <li>Damage caused by accidents, abuse, or neglect.</li>
          </ol>
          <PolicyTitle title="Customer Satisfaction Guarantee" uppercase />
          <PolicyDetail>
            At Coverland, your satisfaction is our priority. We strive to ensure
            every customer is confident in their purchase. This comprehensive
            warranty is our promise of quality and reliability.
          </PolicyDetail>
          <PolicyDetail>
            Thank you for choosing Coverland for your product needs. We value
            your trust and look forward to serving you.
          </PolicyDetail>
          <div className="pt-5 lg:pt-12"></div>
          <PolicyFurtherAssistance />
        </div>
      </div>
    </>
  );
}

export default WarrantyPolicy;
