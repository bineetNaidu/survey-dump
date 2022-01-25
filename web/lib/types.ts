export type UserType = {
  email: string;
  name: string;
  image: string;
};

export type OptionType = {
  _id: string;
  name: string;
  createdAt: Date | string;
  other?: string;
  question: QuestionType;
};

export type QuestionType = {
  _id: string;
  isOption: boolean;
  isField: boolean;
  createdAt: Date | string;
  title: string;
  fieldPlaceholder?: string;
  options?: OptionType[];
  survey: SurveyType;
};

export type SurveyType = {
  description: string;
  _id: string;
  slug: string;
  questions: QuestionType[];
  creator: Pick<UserType, 'email'>;
  createdAt: Date | string;
  title: string;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
};
