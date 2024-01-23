import React from 'react';
import PolicyHeader from '@/components/policy/PolicyHeader';
import PolicyTitle from '@/components/policy/PolicyTitle';
import PolicyDetail from '@/components/policy/PolicyDetail';
import PolicyFurtherAssistance from '@/components/policy/PolicyFurtherAssistance';

function ShippingPolicy() {
  return (
    <>
      <PolicyHeader headerText="Shipping Policy" />
      <div className="lg:mx-auto lg:flex lg:w-[842px] lg:flex-col lg:justify-center">
        <div className="relative px-5 py-5 lg:py-14">
          <PolicyTitle title="Free Delivery" uppercase />
          <PolicyDetail>
            All items on Coverland.com are shipped from the warehouse in
            California and will be shipped on the same business day if an order
            is placed before 2:00pm PST. All items are subject to be delivered
            within 1-5 days based on your location. If we do not have the items
            you ordered in our warehouse, we will get them from one of our over
            100 retail stores and ship them to you within 1-5 business days.
          </PolicyDetail>
          <PolicyDetail>
            Our preferred US Carrier is UPS. For some US destinations, USPS may
            be used.
          </PolicyDetail>
          <PolicyDetail>
            All orders priced at $75 or more shipped to a destination within the
            Contiguous United States are shipped free of charge. For US Domestic
            orders below $75 the shipping cost depends on the zip code or the
            city that the order is being shipped to. All shipping cost rates are
            determined by the shipping location and all costs may vary based on
            location. To determine your shipping cost, you may do so at Checkout
            by selecting your zip code and city.
          </PolicyDetail>
          <PolicyTitle title="EXPEDITE SHIPPING" uppercase />
          <PolicyDetail>
            We currently offer FedEx 2-Day Air only for $19.99.
          </PolicyDetail>
          <PolicyTitle title="INTERNATIONAL SHIPPING" uppercase />
          <PolicyDetail>
            We are currently offering international orders for Canada only.
          </PolicyDetail>
          <PolicyTitle
            title="AK, HI, PR, VI, GUAM, APO & FPO ADDRESSES"
            uppercase
          />
          <PolicyDetail>
            Free shipping is not available for Alaska, Hawaii, Puerto Rico,
            Virgin Island, Guam, APO and FPO addresses. Rates will be available
            at Check Out.
          </PolicyDetail>
          <div className="pt-5 lg:pt-12"></div>
          <PolicyFurtherAssistance />
        </div>
      </div>
    </>
  );
}

export default ShippingPolicy;
