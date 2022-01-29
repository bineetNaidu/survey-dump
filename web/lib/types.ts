import { Survey, Question } from './graphql';

export type SelectedSurveyType = Pick<
  Survey,
  '_id' | 'title' | 'description' | 'status'
>;

export type BaseQuestionType = Omit<Question, 'survey'> & {
  survey: {
    _id: string;
  };
};

export type BaseSurveyType = Omit<Survey, 'questions'> & {
  questions: BaseQuestionType[];
};
