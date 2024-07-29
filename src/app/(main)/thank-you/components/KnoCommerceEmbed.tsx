'use client';
import Script from 'next/script';
import { useEffect } from 'react';

export type KnoCommerceCustomer = {
  email: string;
  phone: string;
};
export type KnoCommerceOrder = {
  id: string;
  total_price: number;
  line_items: any[];
};
export type KnoCommerceEmbedProps = {
  customer: KnoCommerceCustomer;
  order: KnoCommerceOrder;
};

export default function KnoCommerceEmbed({
  customer: { email, phone },
  order: { id, total_price, line_items },
}: KnoCommerceEmbedProps) {
  useEffect(() => {
    window.Kno = {
      kno_id: process.env.NEXT_PUBLIC_KNOCOMMERCE_API,
      customer: {
        platform: 'Coverland', // or your e-commerce platform name
        shop: 'https://coverland.com',
        email,
        phone,
      },
      order: {
        id,
        total_price,
        line_items,
      },
      survey: {
        selector: 'div#knocommerce-div',
      },
    };
    //   }, [customer, order, surveySelector]);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div id="knocommerce-div"></div>
      <Script
        id="knocommerce-survey"
        strategy="afterInteractive"
        async
        defer
        src="https://www.knocdn.com/v1/embed.js?id=21406a0a-f8eb-4166-a99e-3a359d690f09"
      />
    </div>
  );
}
