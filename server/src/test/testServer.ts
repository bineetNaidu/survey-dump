/*

* IMPORTANT:
	IF YOU HAVE ANY BETTER GRAPHQL TESTS IMPLEMENTATIONS, 
	THEN PLEASE SEND THEM TO ME VIA A GITHUB ISSUE OR PR, 
	I'LL UPDATE THIS FILE

*/
import 'reflect-metadata';
import { createApolloServer } from '../lib/createApolloServer';

export const testServer = async () => {
  const apolloServer = await createApolloServer();

  return apolloServer.executeOperation;
};
