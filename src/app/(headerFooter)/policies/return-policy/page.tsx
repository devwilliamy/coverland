import React, { ReactNode } from 'react';
import { PolicyDetailItem } from '../util';
import PolicyHeader from '@/components/policy/PolicyHeader';

function ReturnPolicy() {
  return (
    <>
      <PolicyHeader headerText="Return Policy" />
      <div className="relative">
        <p className="py-[5vh] font-thin italic">
          Effective date: November 1, 2023
        </p>
        <PolicyDetailItem title="Introduction">
          <p className="text-lg font-thin">
            At Coverland, we aim to ensure that you are completely satisfied
            with your purchase. This policy outlines the conditions under which
            returns and refunds are processed. Coverland reserves the right to
            change this info at any time and without notice.
          </p>
        </PolicyDetailItem>
        <PolicyDetailItem title="Return Eligibility">
          <li className=" text-lg font-thin">
            Products must be returned unopened and in their original condition.
          </li>
          <li className=" text-lg font-thin">
            Returns must be initiated within 5 business days of the delivery
            date.
          </li>
        </PolicyDetailItem>
        <PolicyDetailItem
          title="Return Process
"
        >
          <p>
            Refunds are only available for products that are returned unopened
            and in their original condition. Once we receive and inspect the
            returned item, we will notify you of the approval or rejection of
            your refund. If approved, the refund will be processed, and a credit
            will automatically be applied to your original method of payment
            within 5 business days.
          </p>
        </PolicyDetailItem>
        <PolicyDetailItem title="Refunds">
          <p className="text-lg font-thin">
            Refunds are only available for products that are returned unopened
            and in their original condition. Once we receive and inspect the
            returned item, we will notify you of the approval or rejection of
            your refund. If approved, the refund will be processed, and a credit
            will automatically be applied to your original method of payment
            within 5 business days.
          </p>
        </PolicyDetailItem>
        <PolicyDetailItem title="Exchanges">
          <p className="text-lg font-thin">
            If you wish to exchange a product for any reason, please follow the
            return process. Once the return is accepted, you can make a separate
            purchase for the new item.
          </p>
        </PolicyDetailItem>
        <PolicyDetailItem title="Shipping Costs">
          <p className="text-lg font-thin">
            You will be responsible for paying for your own shipping costs for
            returning your item. Shipping costs are non-refundable. If you
            receive a refund, the cost of return shipping will be deducted from
            your refund.
          </p>
        </PolicyDetailItem>
        <PolicyDetailItem title="Non-Returnable Items">
          <p className="text-lg font-thin">
            Please note that certain types of items cannot be returned, such as
            custom-made products or special orders. (If applicable) Any item not
            in its original condition, damaged, or missing parts for reasons not
            due to our error is not eligible for return.
          </p>
        </PolicyDetailItem>
        <PolicyDetailItem title="Contact Us">
          <p className="text-lg font-thin">
            If you have any questions about our Return and Refund Policy, please
            contact us at:
          </p>
          <ul className="list-none">
            <li>Coverland 15529 Blackburn Ave, Norwalk, CA 90650</li>
            <li>Email: info@coverland.com</li>
            <li>Phone: (800) 799-5165</li>
          </ul>
        </PolicyDetailItem>
      </div>
    </>
  );
}

export default ReturnPolicy;
