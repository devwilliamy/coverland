import { StripeCustomCheckoutAddress } from "@stripe/stripe-js";

export type StripeAddress= {
    name: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
    address: StripeCustomCheckoutAddress;
    phone?: string | undefined;
  };