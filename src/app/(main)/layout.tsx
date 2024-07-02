import type { Metadata } from 'next';

import '../globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import IntercomLiveChat from '@/components/intercom/IntercomLiveChat';

export const metadata: Metadata = {
  title: 'Coverland Car Covers',
  description: 'The ultimate marketplace for car protection',
  metadataBase: new URL('https://coverland.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <IntercomLiveChat />
    </>
  );
}
