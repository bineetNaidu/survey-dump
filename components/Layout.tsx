import Head from 'next/head';
import { FC } from 'react';

export const Layout: FC<{ title?: string }> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ?? 'Survey Dump'}</title>
        <meta name="description" content="Dump your survey questions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
