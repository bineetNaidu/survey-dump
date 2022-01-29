import 'reflect-metadata';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { SurveyResolver } from './resolvers/surveys.resolver';
import { QuestionResolver } from './resolvers/questions.resolver';
import { OptionResolver } from './resolvers/options.resolver';

dotenv.config();
const bootstrap = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('??>> {" MONGO_URI must be defined!! "} ');
  }
  await mongoose.connect(process.env.MONGO_URI);

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [SurveyResolver, QuestionResolver, OptionResolver],
    }),
    formatError: (err) => {
      return {
        message: err.message,
      };
    },
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_URL
          : '*',
      methods: 'POST',
      credentials: true,
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
