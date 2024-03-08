import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.scss';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

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
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
