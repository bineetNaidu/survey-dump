import 'reflect-metadata';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { SurveyResolver } from './resolvers/surveys.resolver';
import { QuestionResolver } from './resolvers/questions.resolver';
import { OptionResolver } from './resolvers/options.resolver';
import { ResponseResolver } from './resolvers/responses.resolver';
import { ReportResolver } from './resolvers/reports.resolver';
import { UserResolver } from './resolvers/users.resolver';

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

  const server = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [
        SurveyResolver,
        QuestionResolver,
        OptionResolver,
        ResponseResolver,
        ReportResolver,
        UserResolver,
      ],
    }),
    formatError: (err) => {
      return {
        message: err.message,
      };
    },
    context: ({ req, res }) => ({ req, res }),
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_URL
          : '*',
      methods: 'POST',
      credentials: true,
    },
  });

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

bootstrap().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
