import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import { Analytics } from '@vercel/analytics/react';
import AppScripts from './scripts/AppScripts';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import Head from 'next/head';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
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
    <html
      lang="en"
      // className="scroll-smooth"
    >
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <Script id="meta-pixel" strategy="afterInteractive" async defer>
        {`!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2082985078567650');
        fbq('track', 'PageView');`}
      </Script>
      <body className={`${roboto.className} ${roboto.variable}`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=2082985078567650&ev=PageView&noscript=1"/>`,
          }}
        ></noscript>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PW897Z9Z"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <Providers>
          <main className="mx-auto max-w-[1280px] lg:px-0">
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </main>
        </Providers>
        <Analytics />
        <AppScripts />
      </body>
      {/* <GoogleTagManager gtmId="GTM-PW897Z9Z" /> */}
    </html>
  );
}
