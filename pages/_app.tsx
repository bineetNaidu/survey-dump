import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastProvider placement="top-right">
        <div className="min-h-screen h-full container mx-auto py-4">
          <Component {...pageProps} />
        </div>
      </ToastProvider>
    </>
  );
}

export default MyApp;
