import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { OptionResolver } from '../resolvers/options.resolver';
import { QuestionResolver } from '../resolvers/questions.resolver';
import { ReportResolver } from '../resolvers/reports.resolver';
import { ResponseResolver } from '../resolvers/responses.resolver';
import { SurveyResolver } from '../resolvers/surveys.resolver';
import { UserResolver } from '../resolvers/users.resolver';

const __prod__ = process.env.NODE_ENV === 'production';

export const createApolloServer = async () => {
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
      origin: __prod__ ? process.env.NEXT_PUBLIC_URL : '*',
      methods: 'POST',
      credentials: true,
    },
    debug: !__prod__,
  });

  return server;
};
