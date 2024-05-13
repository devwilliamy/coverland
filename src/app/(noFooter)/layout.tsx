import type { Metadata } from 'next';

import '../globals.css';
import Header from '@/components/header/Header';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Coverland Car Covers',
  description: 'The ultimate marketplace for car protection',
};

export default function NoFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href="../favicon.ico" sizes="any" />
      </Head>
      <Header />
      {children}
    </>
  );
}
