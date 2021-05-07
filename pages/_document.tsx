import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID, GTM_TRACKING_ID } from "@/utils/GA";

const SOCIAL_IMAGE_URL = "https://passive-activist.netlify.app/favicon.ico";
const DESCRIPTION =
  "Elwin's blog, sharing my tips and tricks on web development with a hands-on approach, including some review of books";

class MyDocument extends Document {
  render() {
    const shouldeEnableGA = process.env.NEXT_PUBLIC_SHOULD_ENABLE_GA;
    return (
      <Html lang="en">
        <Head>
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          {shouldeEnableGA && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              ></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}');
                  `
                }}
              />
              {/* <!-- Google Tag Manager --> */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_TRACKING_ID}');`
                }}
              />
              {/* <!-- End Google Tag Manager --> */}
              <meta name="description" content={DESCRIPTION} />
              {/* <!-- Open Graph / Facebook --> */}
              <meta property="og:type" content="website" />
              <meta
                property="og:url"
                content="https://passive-activist.netlify.app/"
              />
              <meta property="og:title" content="Elwin's Blog" />
              <meta property="og:description" content={DESCRIPTION} />
              <meta property="og:image" content={SOCIAL_IMAGE_URL} />

              {/* <!-- Twitter --> */}
              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content="https://passive-activist.netlify.app/"
              />
              <meta property="twitter:title" content="Elwin's Blog" />
              <meta property="twitter:description" content={DESCRIPTION} />
              <meta property="twitter:image" content={SOCIAL_IMAGE_URL} />
            </>
          )}
        </Head>
        <body>
          {shouldeEnableGA && (
            // <!-- Google Tag Manager (noscript) -->
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_TRACKING_ID}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
              }}
            />
            // <!-- End Google Tag Manager (noscript) -->
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
