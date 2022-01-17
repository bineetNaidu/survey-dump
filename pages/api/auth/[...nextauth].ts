import NextAuth from 'next-auth';
import { Client as FaunaClient } from 'faunadb';
import { FaunaAdapter } from '@next-auth/fauna-adapter';
import GoogleProvider from 'next-auth/providers/google';

const client = new FaunaClient({
  secret: process.env.FAUNADB_SECRET!,
  scheme: 'https',
  domain: 'db.eu.fauna.com',
  port: 443,
});

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/providers/overview
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.SESSION_SECRET!,
  adapter: FaunaAdapter(client),
  theme: {
    colorScheme: 'dark',
    brandColor: '#0070f3',
    logo: 'https://nextjs.org/static/images/nextjs-logo.svg',
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      return '/';
    },
  },
});
