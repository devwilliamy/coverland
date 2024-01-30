import { PolicyDetailItem } from '../util';

function WarrantyPolicy() {
  return (
    <div>
      <p className="py-[5vh] font-thin italic">
        Effective date: November 1, 2023
      </p>
      <PolicyDetailItem title="Introduction">
        <p>
          At Coverland, we stand behind the quality of our products. This
          document outlines our product warranty and guarantees, ensuring that
          our customers can shop with confidence.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Product Warranty">
        <p>
          Coverland offers a 7-year warranty on all car covers from the date of
          purchase. This warranty covers defects in materials and workmanship
          under normal use. If a defect arises during the warranty period,
          Coverland will repair or replace the product at no additional cost to
          the customer.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Warranty Conditions">
        <p>
          The warranty is valid only for the original purchaser and is not
          transferable. Proof of purchase is required to validate the warranty
          claim. This warranty does not cover damages resulting from misuse,
          abuse, accidents, alterations, improper installation, or unauthorized
          repairs.
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Guarantee of Satisfaction">
        <p>
          In addition to our warranty, we offer a satisfaction guarantee on all
          our products. If you are not completely satisfied with your purchase,
          you can return it within 14 days for a full refund or exchange.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="How to Make a Warranty Claim">
        <p>
          To initiate a warranty claim, contact our customer service team at
          info@coverland.com or call (800) 799-5165. Provide a description of
          the issue, photos (if applicable), and your proof of purchase. Our
          team will guide you through the process and provide instructions for
          returning the product, if necessary.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Limitations">
        <p>
          The warranty does not cover normal wear and tear or damage due to
          environmental factors. Any modifications to the product will void the
          warranty.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Exclusions">
        <p>
          {
            "This warranty does not apply to products purchased from unauthorized rsellers. Clearance or 'as-is' items may be excluded from the warranty (if applicable)."
          }
        </p>
      </PolicyDetailItem>
      <PolicyDetailItem title="Customer Responsibilities">
        <p>
          Customers are responsible for shipping costs when returning a product
          for warranty service, unless otherwise specified. Ensure that the
          product is properly packaged to prevent damage during transit.
        </p>
      </PolicyDetailItem>

      <PolicyDetailItem title="Contact Information">
        <p>
          For any questions regarding our Product Warranty and Guarantees,
          please contact us at:
          <br />
          Coverland
          <br />
          15529 Blackburn Ave, Norwalk, CA 90650
          <br />
          Email: info@coverland.com
          <br />
          Phone: (800) 799-5165
        </p>
      </PolicyDetailItem>
    </div>
  );
}

export default WarrantyPolicy;
