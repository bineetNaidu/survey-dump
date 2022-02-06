import 'reflect-metadata';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createApolloServer } from './lib/createApolloServer';

dotenv.config();
const bootstrap = async () => {
  const PORT = process.env.PORT || 4000;
  if (!process.env.MONGO_URI) {
    throw new Error('??>> {" MONGO_URI must be defined!! "} ');
  }
  if (!process.env.JWT_SECRET) {
    throw new Error('??>> {" JWT_SECRET must be defined!! "} ');
  }
  await mongoose.connect(process.env.MONGO_URI);

  const server = await createApolloServer();

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
