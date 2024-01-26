//This file is an entry point for all scripts
//for analytics to be loaded in the app

//If there's a script that only needs to load
//on a specific page, use it in that page's
//layout file instead

import Script from 'next/script';

export default function AppScripts() {
  return (
    <>
      <Script id="google-tag-manager-head">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','G-G2C0X9FH2Z');`}
      </Script>
    </>
  );
}
