export type PayPalCaptureOrder = {
  id: string;
  intent: 'CAPTURE';
  status: 'CREATED';
  purchase_units: Array<{
    reference_id: string;
    amount: {
      currency_code: 'USD';
      value: string;
      breakdown: {
        item_total: {
          currency_code: 'USD';
          value: string;
        };
      };
    };
    payee: {
      email_address: string;
      merchant_id: string;
    };
    custom_id: string;
    items: Array<{
      name: string;
      unit_amount: {
        currency_code: 'USD';
        value: string;
      };
      quantity: string;
      sku: string;
    }>;
  }>;
  create_time: string;
  links: PayPalLink[];
};

type PayPalLink = {
  href: string;
  rel: string;
  method: 'GET' | 'POST' | 'PATCH';
};

export type PaypalShipping = {
  name: {
    full_name: string;
  };
  address: {
    address_line_1: string;
    admin_area_2: string;
    admin_area_1: string;
    postal_code: string;
    country_code: string;
  };
};
export type PayPalCompleteOrder = {
  id: string;
  status: 'COMPLETED';
  payment_source: {
    paypal: {
      email_address: string;
      account_id: string;
      account_status: string;
      name: {
        given_name: string;
        surname: string;
      };
      address: {
        country_code: string;
      };
    };
  };
  purchase_units: Array<{
    reference_id: string;
    shipping: PaypalShipping;
    payments: {
      captures: Array<{
        id: string;
        status: 'COMPLETED';
        amount: {
          currency_code: 'USD';
          value: string;
        };
        final_capture: boolean;
        seller_protection: {
          status: string;
          dispute_categories: string[];
        };
        seller_receivable_breakdown: {
          gross_amount: {
            currency_code: 'USD';
            value: string;
          };
          paypal_fee: {
            currency_code: 'USD';
            value: string;
          };
          net_amount: {
            currency_code: 'USD';
            value: string;
          };
        };
        custom_id: string;
        links: PayPalLink[];
        create_time: string;
        update_time: string;
      }>;
    };
  }>;
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
    address: {
      country_code: string;
    };
  };
  links: PayPalLink[];
};
