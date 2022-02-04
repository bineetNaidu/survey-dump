import { Survey, Question, Option, User } from './graphql';

type CreatorType = Pick<Survey['creator'], '_id'>;

export type SelectedSurveyType = Pick<
  Survey,
  '_id' | 'title' | 'description' | 'status'
> & {
  creator: CreatorType;
};

export type BaseOptionType = Omit<Option, 'user'> & {
  user: {
    _id: string;
  };
};

export type BaseQuestionType = Omit<Question, 'survey' | 'user' | 'options'> & {
  survey: {
    _id: string;
  };
  user: {
    _id: string;
  };
  options: BaseOptionType[];
};

export type BaseSurveyType = Omit<Survey, 'questions' | 'creator'> & {
  questions: BaseQuestionType[];
  creator: CreatorType;
};
