import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import Header from '@/pages/home/Header';
import Providers from '@/providers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Footer from '@/pages/home/Footer';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Coverland Car Covers',
  description: 'The ultimate marketplace for car protection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${roboto.variable}`}>
        <Header />
        <main className="max-w-[1440px] px-4 lg:px-0 mx-auto">
          <Providers>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Toaster />
          </Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
