import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { withApollo as createWithApollo } from 'next-apollo';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

const httpLink = createHttpLink({
  uri,
});

const token = Cookies.get('__survey_dump_auth_token__');

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

export const withApollo = createWithApollo(client);
