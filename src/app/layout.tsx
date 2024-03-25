import '@/styles/globals.scss';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import ReduxProvider from '@/store/redux-provider';
import { URLContextProvider } from '@/context/URLContext';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';
import { UserAuthContextProvider } from '@/context/UserAuthContext';

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
      <body className={(inter.className, 'container wrapper')}>
        <ReduxProvider>
          <URLContextProvider>
            <CloseOpenModalsContextProvider>
              <UserAuthContextProvider>
                <Header />
                {children}
              </UserAuthContextProvider>
            </CloseOpenModalsContextProvider>
          </URLContextProvider>
          <Footer />
        </ReduxProvider>
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
