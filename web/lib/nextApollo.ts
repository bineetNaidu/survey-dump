import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { withApollo as createWithApollo } from 'next-apollo';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://graphql.eu.fauna.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.FAUNADB_SECRET!}`,
    },
  };
});

const client = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(client);
