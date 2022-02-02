import { Survey, Question } from './graphql';

type CreatorType = Pick<Survey['creator'], '_id'>;

export type SelectedSurveyType = Pick<
  Survey,
  '_id' | 'title' | 'description' | 'status'
> & {
  creator: CreatorType;
};

export type BaseQuestionType = Omit<Question, 'survey'> & {
  survey: {
    _id: string;
  };
};

export type BaseSurveyType = Omit<Survey, 'questions' | 'creator'> & {
  questions: BaseQuestionType[];
  creator: CreatorType;
};
