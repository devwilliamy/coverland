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
        })(window,document,'script','dataLayer','GTM-PW897Z9Z');`}
      </Script>
      <Script id="hotjar-tracking">
        {`    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3331909,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </Script>
      {/*
      <Script id="UR_initiator" strategy="lazyOnload">
        {`(function () {
        var iid = "uriid_da39a3ee5e6b4b0d3255bfef95601890afd80709";
        if (!document._fpu_)
          document.getElementById("UR_initiator").setAttribute("id", iid);
        var bsa = document.createElement("script");
        bsa.type = "text/javascript";
        bsa.async = true;
        bsa.src =
          "https://static.onsitesupport.io/public/icarcover/sdk/chat-" +
          iid +
          "-13.js";
        (
          document.getElementsByTagName("head")[0] ||
          document.getElementsByTagName("body")[0]
        ).appendChild(bsa);
      })();
      `}
      </Script> */}
    </>
  );
}
