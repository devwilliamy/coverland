'use client';

import { ApolloProvider } from '@apollo/client';
import { CartProvider } from './CartProvider';
import client from '@/lib/apollo/apollo-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApolloProvider client={client}>
        <CartProvider>{children}</CartProvider>
      </ApolloProvider>
    </>
  );
}
