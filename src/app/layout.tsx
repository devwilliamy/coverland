import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import AppScripts from './scripts/AppScripts';

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
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.className} ${roboto.variable}`}>
        <Providers>
          <main className="mx-auto max-w-[1440px] lg:px-0">
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <Toaster />
          </main>
        </Providers>
        <Analytics />
        <AppScripts />
      </body>
    </html>
  );
}
