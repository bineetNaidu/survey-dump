import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-notifications';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ToastProvider placement="top-right">
          <div className="min-h-screen h-full container mx-auto py-4">
            <Component {...pageProps} />
          </div>
        </ToastProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
