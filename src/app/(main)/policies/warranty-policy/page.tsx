import React from 'react';
import PolicyHeader from '@/components/policy/PolicyHeader';
import Link from 'next/link';
import PolicyTitle from '@/components/policy/PolicyTitle';
import PolicyDetail from '@/components/policy/PolicyDetail';
import PolicyFurtherAssistance from '@/components/policy/PolicyFurtherAssistance';

function WarrantyPolicy() {
  return (
    <>
      <PolicyHeader headerText="Warranty" />
      <div className="relative px-5 pb-[70px] pt-8">
        <PolicyTitle title="Up to a 10-Year Comprehensive Warranty" uppercase />
        <div className="py-5"></div>
        <PolicyTitle title="Welcome to Coverland's Warranty Page" uppercase />
        <PolicyDetail>
          At Coverland, we are committed to providing our customers with
          exceptional quality products and peace of mind. We stand behind the
          craftsmanship and durability of our items with a comprehensive up to a
          10-year warranty.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyTitle title="Warranty Coverage" uppercase />
        <PolicyDetail>
          Our warranty provides coverage for a period of up to ten years,
          depending on the specific warranty period of your product. It starts
          from the date of purchase and includes protection against various
          issues:
        </PolicyDetail>
        <ol>
          <li>
            Normal Wear and Tear: We understand that regolar use over time can
            cause natural wear. Our warranty ensures your product remains
            functional throughout its lifespan.
          </li>
          <li>
            Weather-Related Damages: Be it intense sun, heavy rain, snow, or
            hail, our products are designed to withstand diverse weather
            conditions. If your product fails to protect your vehicle due to
            weather-related damages, we’ve got you covered.
          </li>
          <li>
            Ripping and Tears: Despite the high durability of our materials,
            accidents happen. If your product rips or tears during normal usage,
            we will replace it.
          </li>
        </ol>
        <PolicyDetail>
          Merchandise that is exchangeable can be returned by mailing to the
          address mentioned above. There are no additional fees for an exchange.
          Once the original item is received, the replacement merchandise will
          arrive to you within 2-3 business days.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyTitle title="How to Claim Your Warranty" uppercase />
        <PolicyDetail>
          If you encounter any issues covered under this warranty, please follow
          these steps: Contact Us: Reach out to our customer service team via
          phone or email, providing your purchase details and a brief
          description of the issue. Documentation: We may request photos or a
          short video of the damage for our records. Review and Approval: Our
          team will review your claim and, upon approval, will initiate the
          replacement process. Replacement: A replacement cover will be sent to
          you at no additional cost, except for shipping.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyTitle title="Limitations and Exclusions" uppercase />
        <PolicyDetail>
          This warranty does not cover: Damage due to improper use or
          installation. Alterations or modifications made to the car cover.
          Damage caused by accidents, abuse, or neglect.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyTitle title="Customer Satisfaction Guarantee" uppercase />
        <PolicyDetail>
          At Coverland, your satisfaction is our priority. We strive to ensure
          every customer is confident in their purchase. This comprehensive
          warranty is our promise of quality and reliability. Thank you for
          choosing Coverland for your product needs. We value your trust and
          look forward to serving you.
        </PolicyDetail>
        <div className="pt-5"></div>
        <PolicyFurtherAssistance />
      </div>
    </>
  );
}

export default WarrantyPolicy;
