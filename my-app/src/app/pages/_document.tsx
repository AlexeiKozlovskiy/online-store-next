/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-document-import-in-page */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Ruge+Boogie&display=swap" rel="stylesheet" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Ruluko&display=swap" rel="stylesheet" /> */}

        {/* <link href="https://fonts.googleapis.com/css2?family=Ruluko&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Ruge+Boogie&family=Ruluko&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Ruge+Boogie&family=Ruluko&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
