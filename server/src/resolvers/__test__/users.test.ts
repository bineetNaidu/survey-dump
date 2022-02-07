/*

* IMPORTANT:
	IF YOU HAVE ANY BETTER GRAPHQL TESTS IMPLEMENTATIONS, 
	THEN PLEASE SEND THEM TO ME VIA A GITHUB ISSUE OR PR, 
	I'LL UPDATE THIS FILE

*/

import { gql } from 'apollo-server';
import { testServer } from '../../test/testServer';

it('should return a hello world message', async () => {
  const server = await testServer();
  const query = gql`
    query {
      me
    }
  `;
  const result = await server({ query });
  expect(result.data).toEqual({ me: null });
});
