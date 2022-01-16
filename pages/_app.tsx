import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Survey Dump</title>
        <meta name="description" content="Dump your survey questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black min-h-screen h-full text-white">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
