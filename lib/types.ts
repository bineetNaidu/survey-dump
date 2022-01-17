export type UserType = {
  _id: string;
  password?: string;
  googleId?: string;
  email: string;
  avatar: string;
  username: string;
  createdAt: Date | string;
  surveys: [];
};

export type OptionType = {
  _id: string;
  name: string;
  createdAt: Date | string;
  other?: string;
};

export type QuestionType = {
  _id: string;
  isOption: string;
  isField: string;
  createdAt: Date | string;
  title: string;
  fieldPlaceholder?: string;
  options?: OptionType[];
};

export type SurveyType = {
  description: string;
  _id: string;
  slug: string;
  questions: QuestionType[];
  creator: {
    _id: Pick<UserType, '_id'>;
    avatar: Pick<UserType, 'avatar'>;
    username: Pick<UserType, 'username'>;
  };
  createdAt: Date | string;
  title: string;
};
