import { useEffect, useState } from 'react';

export default function useGetStripeClientSecret() {
  const [clientSecret, setClientSecret] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/stripe/payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('[GetStripeClientSecret]: ', error);
      }
    };
    fetchData();
  }, []);
  return clientSecret;
}
