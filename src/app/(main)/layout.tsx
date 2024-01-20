import type { Metadata } from 'next';

import '../globals.css';
import Header from '@/pages/home/Header';
import Footer from '@/pages/home/Footer';

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
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
