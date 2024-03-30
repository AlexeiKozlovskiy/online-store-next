import '@/styles/globals.scss';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import ReduxProvider from '@/components/redux-provider';
import { URLContextProvider } from '@/context/URLContext';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';
import { UserAuthContextProvider } from '@/context/UserAuthContext';
import { ProfileUserContextProvider } from '@/context/ProfileUserContext';
import QueryClientProviders from '@/components/queryClientProvider';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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
          <QueryClientProviders>
            <URLContextProvider>
              <CloseOpenModalsContextProvider>
                <UserAuthContextProvider>
                  <ProfileUserContextProvider>
                    <Header />
                    {children}
                  </ProfileUserContextProvider>
                </UserAuthContextProvider>
              </CloseOpenModalsContextProvider>
            </URLContextProvider>
            <Footer />
          </QueryClientProviders>
        </ReduxProvider>
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
