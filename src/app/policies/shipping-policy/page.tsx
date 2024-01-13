import React from 'react';
import { PolicyDetailItem } from '../util';

type Props = {};

const ShippingPolicy = (props: Props) => {
  return (
    <div>
      <p className="py-[5vh] font-thin italic">
        Effective date: November 1, 2023
      </p>
      <PolicyDetailItem title="Introduction">
        <p>
          At Coverland, we understand the importance of receiving your car cover
          purchases promptly and safely. This Shipping Policy outlines our
          shipping procedures and guidelines. Coverland reserves the right to
          change this info at any time and without notice.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Shipping Carrier">
        <p>All our products are shipped via United Parcel Service (UPS).</p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Shipping Options and Delivery Times">
        <p>
          We offer a range of UPS shipping options, including UPS Ground, UPS
          2nd Day Air, and UPS Next Day Air. The availability of these options
          may vary depending on the destination. Delivery times depend on the
          selected shipping option and your location. Estimated delivery times
          for each option will be provided at checkout. Please note that while
          we strive to meet these delivery estimates, actual delivery times may
          vary due to factors beyond our control, such as weather conditions or
          carrier delays.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Order Processing">
        <p>
          Orders are usually processed within 5 business days. Once your order
          is shipped, we will send you a confirmation email with a tracking
          number so you can track your shipment.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Shipping Costs">
        <p>
          Shipping costs are calculated based on the shipping option selected,
          the weight and dimensions of the product, and the delivery
          destination. The total shipping cost will be displayed at checkout
          before you finalize your order.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="International Shipping">
        <p>
          Coverland offers interntional shipping. Please contact us for more
          info and pricing.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Shipping Restrictions">
        <p>
          Shipping restrictions may apply, such as shipping to P.O. boxes,
          military addresses, or certain geographic areas. Please contact us for
          the most up-to-date shipping restrictions.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Damaged or Lost Shipments">
        <p>
          If your order is lost or arrives damaged, please contact us
          immediately at info@coverland.com. We will work with UPS to resolve
          the issue and, if necessary, arrange for a replacement or refund.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Customer Responsibilities">
        <p>
          Ensure that the shipping address provided is correct. Coverland is not
          responsible for shipments sent to incorrect addresses if they were
          provided at the time of order. Be aware of any local customs or import
          duties, particularly for international orders, as these are the
          responsibility of the customer.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Contact Information">
        <p>
          For questions or concerns regarding shipping, please reach out to us
          at: <br />
          Coverland <br />
          15529 Blackburn Ave, Norwalk, CA 90650 <br />
          Email: info@coverland.com <br />
          Phone: (800) 799-5165
        </p>
      </PolicyDetailItem>
    </div>
  );
};

export default ShippingPolicy;
