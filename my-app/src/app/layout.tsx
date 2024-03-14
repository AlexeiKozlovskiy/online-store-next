import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
// eslint-disable-next-line @next/next/no-document-import-in-page
// import Head from 'next/head';
// eslint-disable-next-line @next/next/no-document-import-in-page
// import Document, { Html, Head, Main, NextScript } from 'next/document';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Online Store Next',
  description: 'Find Christmas decorations to create a festive atmosphere at your home',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head> */}
      {/* <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Ruluko&display=swap" rel="stylesheet"> */}

      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Ruluko&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Ruge+Boogie&family=Ruluko&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Ruge+Boogie&family=Ruluko&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap"
          rel="stylesheet"
        /> */}
      {/* </Head>  */}

      <body className={(inter.className, 'container wrapper')}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
