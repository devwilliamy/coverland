/**
 * * Represents the response from the TaxJar API
 * @example
 * "tax": {
    "amount_to_collect": 60.44,
    "breakdown": {
      "city_tax_collectable": 0,
      "city_tax_rate": 0,
      "city_taxable_amount": 0,
      "combined_tax_rate": 0.0775,
      "county_tax_collectable": 7.8,
      "county_tax_rate": 0.01,
      "county_taxable_amount": 779.85,
      "line_items": [
        {
          "city_amount": 0,
          "city_tax_rate": 0,
          "city_taxable_amount": 0,
          "combined_tax_rate": 0.0775,
          "county_amount": 2,
          "county_tax_rate": 0.01,
          "county_taxable_amount": 199.95,
          "id": "17196",
          "special_district_amount": 1,
          "special_district_taxable_amount": 199.95,
          "special_tax_rate": 0.005,
          "state_amount": 12.5,
          "state_sales_tax_rate": 0.0625,
          "state_taxable_amount": 199.95,
          "tax_collectable": 15.5,
          "taxable_amount": 199.95
        },
        {
          "city_amount": 0,
          "city_tax_rate": 0,
          "city_taxable_amount": 0,
          "combined_tax_rate": 0.0775,
          "county_amount": 2,
          "county_tax_rate": 0.01,
          "county_taxable_amount": 199.95,
          "id": "20992",
          "special_district_amount": 1,
          "special_district_taxable_amount": 199.95,
          "special_tax_rate": 0.005,
          "state_amount": 12.5,
          "state_sales_tax_rate": 0.0625,
          "state_taxable_amount": 199.95,
          "tax_collectable": 15.5,
          "taxable_amount": 199.95
        },
        {
          "city_amount": 0,
          "city_tax_rate": 0,
          "city_taxable_amount": 0,
          "combined_tax_rate": 0.0775,
          "county_amount": 3.8,
          "county_tax_rate": 0.01,
          "county_taxable_amount": 379.95,
          "id": "29623",
          "special_district_amount": 1.9,
          "special_district_taxable_amount": 379.95,
          "special_tax_rate": 0.005,
          "state_amount": 23.75,
          "state_sales_tax_rate": 0.0625,
          "state_taxable_amount": 379.95,
          "tax_collectable": 29.45,
          "taxable_amount": 379.95
        }
      ],
      "special_district_tax_collectable": 3.9,
      "special_district_taxable_amount": 779.85,
      "special_tax_rate": 0.005,
      "state_tax_collectable": 48.74,
      "state_tax_rate": 0.0625,
      "state_taxable_amount": 779.85,
      "tax_collectable": 60.44,
      "taxable_amount": 779.85
    },
    "freight_taxable": false,
    "has_nexus": true,
    "jurisdictions": {
      "city": "IRVINE",
      "country": "US",
      "county": "ORANGE COUNTY",
      "state": "CA"
    },
    "order_total_amount": 779.85,
    "rate": 0.0775,
    "shipping": 0,
    "tax_source": "destination",
    "taxable_amount": 779.85
  }
}
 */
export type TaxJarResponse = {
  tax: {
    amount_to_collect: number;
    breakdown: {
      city_tax_collectable: number;
      city_tax_rate: number;
      county_tax_collectable: number;
      county_tax_rate: number;
      special_district_tax_collectable: number;
      special_tax_rate: number;
      state_tax_collectable: number;
      state_tax_rate: number;
      taxable_amount: number;
      line_items: Array<{
        id: string;
        tax_collectable: number;
        taxable_amount: number;
      }>;
    };
    jurisdictions: {
      city: string;
      county: string;
      state: string;
    };
  };
};

export type TaxJarLineItem = {
  // Define the structure of a tax item
  // For example:
  id: number;
  quantity: number | string;
  unit_price: number;
  discount: number;
};

/**
 * * Represents the Tax Jar Request Body
 * @example
 * {
    "to_country": "US",
    "to_zip": "92782",
    "to_state": "CA",
    "shipping": 0,
    "line_items": [
      {
        "id": 20992,
        "quantity": 1,
        "unit_price": 199.95,
        "discount": 0
      },
      {
        "id": 17196,
        "quantity": 1,
        "unit_price": 199.95,
        "discount": 0
      },
      {
        "id": 29623,
        "quantity": 1,
        "unit_price": 379.95,
        "discount": 0
      }
    ]
}

 */
export type TaxJarRequestBody = {
  to_country: string;
  to_zip: string;
  to_state: string;
  shipping: number;
  line_items: TaxJarLineItem[];
};
