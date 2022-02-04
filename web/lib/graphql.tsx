import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  errors?: Maybe<Array<FieldError>>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOption: Option;
  createQuestion: Question;
  createReport: Report;
  createResponse: Response;
  createSurvey: Survey;
  deleteMe: Scalars['Boolean'];
  deleteOption: Scalars['Boolean'];
  deleteQuestion: Scalars['Boolean'];
  deleteSurvey?: Maybe<Scalars['Boolean']>;
  login: AuthResponse;
  register: AuthResponse;
  updateMe: User;
  updateOption?: Maybe<Option>;
  updateQuestion?: Maybe<Question>;
  updateReportStatus?: Maybe<Report>;
  updateSurveyStatus?: Maybe<Survey>;
};


export type MutationCreateOptionArgs = {
  data: OptionInput;
  questionId: Scalars['String'];
};


export type MutationCreateQuestionArgs = {
  data: QuestionInput;
};


export type MutationCreateReportArgs = {
  data: ReportInput;
};


export type MutationCreateResponseArgs = {
  data: ResponseInput;
};


export type MutationCreateSurveyArgs = {
  data: SurveyInput;
};


export type MutationDeleteOptionArgs = {
  id: Scalars['String'];
  questionId: Scalars['String'];
};


export type MutationDeleteQuestionArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSurveyArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdateMeArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateOptionArgs = {
  data: OptionInput;
  id: Scalars['String'];
};


export type MutationUpdateQuestionArgs = {
  data: UpdateQuestionInput;
  id: Scalars['String'];
};


export type MutationUpdateReportStatusArgs = {
  data: UpdateReportStatusInput;
};


export type MutationUpdateSurveyStatusArgs = {
  id: Scalars['String'];
  status: Scalars['String'];
};

export type Option = {
  __typename?: 'Option';
  _id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  other?: Maybe<Scalars['String']>;
  user: User;
};

export type OptionInput = {
  name?: InputMaybe<Scalars['String']>;
  other?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findResponseBySurveySlug: Array<Response>;
  getQuestionsBySurvey: Array<Question>;
  getReport?: Maybe<Report>;
  getReports: Array<Report>;
  getSurveyBySlug?: Maybe<Survey>;
  getSurveys: Array<Survey>;
  me?: Maybe<User>;
};


export type QueryFindResponseBySurveySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetQuestionsBySurveyArgs = {
  survey: Scalars['String'];
};


export type QueryGetReportArgs = {
  id: Scalars['String'];
};


export type QueryGetSurveyBySlugArgs = {
  slug: Scalars['String'];
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['String'];
  fieldPlaceholder?: Maybe<Scalars['String']>;
  isField: Scalars['Boolean'];
  isOption: Scalars['Boolean'];
  options: Array<Option>;
  survey: Survey;
  title: Scalars['String'];
  user: User;
};

export type QuestionInput = {
  fieldPlaceholder?: InputMaybe<Scalars['String']>;
  isField: Scalars['Boolean'];
  isOption: Scalars['Boolean'];
  options: Array<QuestionOptionInput>;
  survey: Scalars['String'];
  title: Scalars['String'];
};

export type QuestionOptionInput = {
  name?: InputMaybe<Scalars['String']>;
  other?: InputMaybe<Scalars['String']>;
};

export type RegisterInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  _id: Scalars['String'];
  message: Scalars['String'];
  status: Scalars['String'];
  type: Scalars['String'];
  user: User;
};

export type ReportInput = {
  message: Scalars['String'];
};

export type Response = {
  __typename?: 'Response';
  _id: Scalars['String'];
  question: Question;
  selectedOption?: Maybe<Option>;
  survey: Survey;
  text?: Maybe<Scalars['String']>;
  user: User;
};

export type ResponseInput = {
  questionId: Scalars['String'];
  selectedOptionId?: InputMaybe<Scalars['String']>;
  surveyId: Scalars['String'];
  text?: InputMaybe<Scalars['String']>;
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['String'];
  creator: User;
  description: Scalars['String'];
  questions: Array<Question>;
  slug: Scalars['String'];
  status: Scalars['String'];
  title: Scalars['String'];
};

export type SurveyInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type UpdateQuestionInput = {
  fieldPlaceholder?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateReportStatusInput = {
  reportId: Scalars['String'];
  status: Scalars['String'];
};

export type UpdateUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  avatar: Scalars['String'];
  email: Scalars['String'];
  isVerified: Scalars['Boolean'];
  name: Scalars['String'];
  role: Scalars['String'];
};

export type BaseOptionFragment = { __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } };

export type BaseQuestionFragment = { __typename?: 'Question', _id: string, fieldPlaceholder?: string | null | undefined, isField: boolean, isOption: boolean, title: string, options: Array<{ __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } }>, survey: { __typename?: 'Survey', _id: string }, user: { __typename?: 'User', _id: string } };

export type BaseSurveyFragment = { __typename?: 'Survey', _id: string, slug: string, title: string, description: string, status: string, creator: { __typename?: 'User', _id: string } };

export type CreateOptionMutationVariables = Exact<{
  data: OptionInput;
  questionId: Scalars['String'];
}>;


export type CreateOptionMutation = { __typename?: 'Mutation', createOption: { __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } } };

export type CreateQuestionMutationVariables = Exact<{
  data: QuestionInput;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', createQuestion: { __typename?: 'Question', _id: string, fieldPlaceholder?: string | null | undefined, isField: boolean, isOption: boolean, title: string, options: Array<{ __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } }>, survey: { __typename?: 'Survey', _id: string }, user: { __typename?: 'User', _id: string } } };

export type CreateReportMutationVariables = Exact<{
  data: ReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'Report', _id: string, message: string, status: string, type: string, user: { __typename?: 'User', _id: string, name: string } } };

export type CreateSurveyMutationVariables = Exact<{
  data: SurveyInput;
}>;


export type CreateSurveyMutation = { __typename?: 'Mutation', createSurvey: { __typename?: 'Survey', _id: string, slug: string, title: string, description: string, status: string, questions: Array<{ __typename?: 'Question', _id: string, fieldPlaceholder?: string | null | undefined, isField: boolean, isOption: boolean, title: string, options: Array<{ __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } }>, survey: { __typename?: 'Survey', _id: string }, user: { __typename?: 'User', _id: string } }>, creator: { __typename?: 'User', _id: string } } };

export type DeleteMeMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteMeMutation = { __typename?: 'Mutation', deleteMe: boolean };

export type DeleteOptionMutationVariables = Exact<{
  questionId: Scalars['String'];
  deleteOptionId: Scalars['String'];
}>;


export type DeleteOptionMutation = { __typename?: 'Mutation', deleteOption: boolean };

export type DeleteQuestionMutationVariables = Exact<{
  deleteQuestionId: Scalars['String'];
}>;


export type DeleteQuestionMutation = { __typename?: 'Mutation', deleteQuestion: boolean };

export type DeleteSurveyMutationVariables = Exact<{
  deleteSurveyId: Scalars['String'];
}>;


export type DeleteSurveyMutation = { __typename?: 'Mutation', deleteSurvey?: boolean | null | undefined };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', _id: string, avatar: string, name: string, email: string } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', _id: string, avatar: string, name: string, email: string } | null | undefined } };

export type UpdateMeMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', _id: string, avatar: string, email: string, name: string } };

export type UpdateOptionMutationVariables = Exact<{
  data: OptionInput;
  updateOptionId: Scalars['String'];
}>;


export type UpdateOptionMutation = { __typename?: 'Mutation', updateOption?: { __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } } | null | undefined };

export type UpdateQuestionMutationVariables = Exact<{
  data: UpdateQuestionInput;
  updateQuestionId: Scalars['String'];
}>;


export type UpdateQuestionMutation = { __typename?: 'Mutation', updateQuestion?: { __typename?: 'Question', _id: string, fieldPlaceholder?: string | null | undefined, isField: boolean, isOption: boolean, title: string, options: Array<{ __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } }>, survey: { __typename?: 'Survey', _id: string }, user: { __typename?: 'User', _id: string } } | null | undefined };

export type UpdateSurveyStatusMutationVariables = Exact<{
  status: Scalars['String'];
  updateSurveyStatusId: Scalars['String'];
}>;


export type UpdateSurveyStatusMutation = { __typename?: 'Mutation', updateSurveyStatus?: { __typename?: 'Survey', status: string } | null | undefined };

export type GetSurveyBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetSurveyBySlugQuery = { __typename?: 'Query', getSurveyBySlug?: { __typename?: 'Survey', _id: string, slug: string, title: string, description: string, status: string, questions: Array<{ __typename?: 'Question', _id: string, fieldPlaceholder?: string | null | undefined, isField: boolean, isOption: boolean, title: string, options: Array<{ __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } }>, survey: { __typename?: 'Survey', _id: string }, user: { __typename?: 'User', _id: string } }>, creator: { __typename?: 'User', _id: string } } | null | undefined };

export type GetSurveysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSurveysQuery = { __typename?: 'Query', getSurveys: Array<{ __typename?: 'Survey', _id: string, slug: string, title: string, description: string, status: string, questions: Array<{ __typename?: 'Question', _id: string, fieldPlaceholder?: string | null | undefined, isField: boolean, isOption: boolean, title: string, options: Array<{ __typename?: 'Option', _id: string, name?: string | null | undefined, other?: string | null | undefined, user: { __typename?: 'User', _id: string } }>, survey: { __typename?: 'Survey', _id: string }, user: { __typename?: 'User', _id: string } }>, creator: { __typename?: 'User', _id: string } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: string, avatar: string, email: string, name: string } | null | undefined };

export const BaseOptionFragmentDoc = gql`
    fragment BaseOption on Option {
  _id
  name
  other
  user {
    _id
  }
}
    `;
export const BaseQuestionFragmentDoc = gql`
    fragment BaseQuestion on Question {
  _id
  fieldPlaceholder
  isField
  isOption
  title
  options {
    ...BaseOption
  }
  survey {
    _id
  }
  user {
    _id
  }
}
    ${BaseOptionFragmentDoc}`;
export const BaseSurveyFragmentDoc = gql`
    fragment BaseSurvey on Survey {
  _id
  slug
  title
  description
  creator {
    _id
  }
  status
}
    `;
export const CreateOptionDocument = gql`
    mutation CreateOption($data: OptionInput!, $questionId: String!) {
  createOption(data: $data, questionId: $questionId) {
    ...BaseOption
  }
}
    ${BaseOptionFragmentDoc}`;
export type CreateOptionMutationFn = Apollo.MutationFunction<CreateOptionMutation, CreateOptionMutationVariables>;

/**
 * __useCreateOptionMutation__
 *
 * To run a mutation, you first call `useCreateOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOptionMutation, { data, loading, error }] = useCreateOptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *      questionId: // value for 'questionId'
 *   },
 * });
 */
export function useCreateOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateOptionMutation, CreateOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOptionMutation, CreateOptionMutationVariables>(CreateOptionDocument, options);
      }
export type CreateOptionMutationHookResult = ReturnType<typeof useCreateOptionMutation>;
export type CreateOptionMutationResult = Apollo.MutationResult<CreateOptionMutation>;
export type CreateOptionMutationOptions = Apollo.BaseMutationOptions<CreateOptionMutation, CreateOptionMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation CreateQuestion($data: QuestionInput!) {
  createQuestion(data: $data) {
    ...BaseQuestion
  }
}
    ${BaseQuestionFragmentDoc}`;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const CreateReportDocument = gql`
    mutation CreateReport($data: ReportInput!) {
  createReport(data: $data) {
    _id
    message
    user {
      _id
      name
    }
    status
    type
  }
}
    `;
export type CreateReportMutationFn = Apollo.MutationFunction<CreateReportMutation, CreateReportMutationVariables>;

/**
 * __useCreateReportMutation__
 *
 * To run a mutation, you first call `useCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportMutation, { data, loading, error }] = useCreateReportMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, options);
      }
export type CreateReportMutationHookResult = ReturnType<typeof useCreateReportMutation>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<CreateReportMutation, CreateReportMutationVariables>;
export const CreateSurveyDocument = gql`
    mutation CreateSurvey($data: SurveyInput!) {
  createSurvey(data: $data) {
    ...BaseSurvey
    questions {
      ...BaseQuestion
    }
  }
}
    ${BaseSurveyFragmentDoc}
${BaseQuestionFragmentDoc}`;
export type CreateSurveyMutationFn = Apollo.MutationFunction<CreateSurveyMutation, CreateSurveyMutationVariables>;

/**
 * __useCreateSurveyMutation__
 *
 * To run a mutation, you first call `useCreateSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSurveyMutation, { data, loading, error }] = useCreateSurveyMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSurveyMutation(baseOptions?: Apollo.MutationHookOptions<CreateSurveyMutation, CreateSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSurveyMutation, CreateSurveyMutationVariables>(CreateSurveyDocument, options);
      }
export type CreateSurveyMutationHookResult = ReturnType<typeof useCreateSurveyMutation>;
export type CreateSurveyMutationResult = Apollo.MutationResult<CreateSurveyMutation>;
export type CreateSurveyMutationOptions = Apollo.BaseMutationOptions<CreateSurveyMutation, CreateSurveyMutationVariables>;
export const DeleteMeDocument = gql`
    mutation DeleteMe {
  deleteMe
}
    `;
export type DeleteMeMutationFn = Apollo.MutationFunction<DeleteMeMutation, DeleteMeMutationVariables>;

/**
 * __useDeleteMeMutation__
 *
 * To run a mutation, you first call `useDeleteMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeMutation, { data, loading, error }] = useDeleteMeMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteMeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeMutation, DeleteMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeMutation, DeleteMeMutationVariables>(DeleteMeDocument, options);
      }
export type DeleteMeMutationHookResult = ReturnType<typeof useDeleteMeMutation>;
export type DeleteMeMutationResult = Apollo.MutationResult<DeleteMeMutation>;
export type DeleteMeMutationOptions = Apollo.BaseMutationOptions<DeleteMeMutation, DeleteMeMutationVariables>;
export const DeleteOptionDocument = gql`
    mutation DeleteOption($questionId: String!, $deleteOptionId: String!) {
  deleteOption(questionId: $questionId, id: $deleteOptionId)
}
    `;
export type DeleteOptionMutationFn = Apollo.MutationFunction<DeleteOptionMutation, DeleteOptionMutationVariables>;

/**
 * __useDeleteOptionMutation__
 *
 * To run a mutation, you first call `useDeleteOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOptionMutation, { data, loading, error }] = useDeleteOptionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      deleteOptionId: // value for 'deleteOptionId'
 *   },
 * });
 */
export function useDeleteOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOptionMutation, DeleteOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOptionMutation, DeleteOptionMutationVariables>(DeleteOptionDocument, options);
      }
export type DeleteOptionMutationHookResult = ReturnType<typeof useDeleteOptionMutation>;
export type DeleteOptionMutationResult = Apollo.MutationResult<DeleteOptionMutation>;
export type DeleteOptionMutationOptions = Apollo.BaseMutationOptions<DeleteOptionMutation, DeleteOptionMutationVariables>;
export const DeleteQuestionDocument = gql`
    mutation DeleteQuestion($deleteQuestionId: String!) {
  deleteQuestion(id: $deleteQuestionId)
}
    `;
export type DeleteQuestionMutationFn = Apollo.MutationFunction<DeleteQuestionMutation, DeleteQuestionMutationVariables>;

/**
 * __useDeleteQuestionMutation__
 *
 * To run a mutation, you first call `useDeleteQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteQuestionMutation, { data, loading, error }] = useDeleteQuestionMutation({
 *   variables: {
 *      deleteQuestionId: // value for 'deleteQuestionId'
 *   },
 * });
 */
export function useDeleteQuestionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionMutation, DeleteQuestionMutationVariables>(DeleteQuestionDocument, options);
      }
export type DeleteQuestionMutationHookResult = ReturnType<typeof useDeleteQuestionMutation>;
export type DeleteQuestionMutationResult = Apollo.MutationResult<DeleteQuestionMutation>;
export type DeleteQuestionMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionMutation, DeleteQuestionMutationVariables>;
export const DeleteSurveyDocument = gql`
    mutation DeleteSurvey($deleteSurveyId: String!) {
  deleteSurvey(id: $deleteSurveyId)
}
    `;
export type DeleteSurveyMutationFn = Apollo.MutationFunction<DeleteSurveyMutation, DeleteSurveyMutationVariables>;

/**
 * __useDeleteSurveyMutation__
 *
 * To run a mutation, you first call `useDeleteSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSurveyMutation, { data, loading, error }] = useDeleteSurveyMutation({
 *   variables: {
 *      deleteSurveyId: // value for 'deleteSurveyId'
 *   },
 * });
 */
export function useDeleteSurveyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSurveyMutation, DeleteSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSurveyMutation, DeleteSurveyMutationVariables>(DeleteSurveyDocument, options);
      }
export type DeleteSurveyMutationHookResult = ReturnType<typeof useDeleteSurveyMutation>;
export type DeleteSurveyMutationResult = Apollo.MutationResult<DeleteSurveyMutation>;
export type DeleteSurveyMutationOptions = Apollo.BaseMutationOptions<DeleteSurveyMutation, DeleteSurveyMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    errors {
      field
      message
    }
    token
    user {
      _id
      avatar
      name
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    errors {
      field
      message
    }
    token
    user {
      _id
      avatar
      name
      email
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateMeDocument = gql`
    mutation UpdateMe($data: UpdateUserInput!) {
  updateMe(data: $data) {
    _id
    avatar
    email
    name
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const UpdateOptionDocument = gql`
    mutation UpdateOption($data: OptionInput!, $updateOptionId: String!) {
  updateOption(data: $data, id: $updateOptionId) {
    ...BaseOption
  }
}
    ${BaseOptionFragmentDoc}`;
export type UpdateOptionMutationFn = Apollo.MutationFunction<UpdateOptionMutation, UpdateOptionMutationVariables>;

/**
 * __useUpdateOptionMutation__
 *
 * To run a mutation, you first call `useUpdateOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOptionMutation, { data, loading, error }] = useUpdateOptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateOptionId: // value for 'updateOptionId'
 *   },
 * });
 */
export function useUpdateOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOptionMutation, UpdateOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOptionMutation, UpdateOptionMutationVariables>(UpdateOptionDocument, options);
      }
export type UpdateOptionMutationHookResult = ReturnType<typeof useUpdateOptionMutation>;
export type UpdateOptionMutationResult = Apollo.MutationResult<UpdateOptionMutation>;
export type UpdateOptionMutationOptions = Apollo.BaseMutationOptions<UpdateOptionMutation, UpdateOptionMutationVariables>;
export const UpdateQuestionDocument = gql`
    mutation UpdateQuestion($data: UpdateQuestionInput!, $updateQuestionId: String!) {
  updateQuestion(data: $data, id: $updateQuestionId) {
    ...BaseQuestion
  }
}
    ${BaseQuestionFragmentDoc}`;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      data: // value for 'data'
 *      updateQuestionId: // value for 'updateQuestionId'
 *   },
 * });
 */
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const UpdateSurveyStatusDocument = gql`
    mutation UpdateSurveyStatus($status: String!, $updateSurveyStatusId: String!) {
  updateSurveyStatus(status: $status, id: $updateSurveyStatusId) {
    status
  }
}
    `;
export type UpdateSurveyStatusMutationFn = Apollo.MutationFunction<UpdateSurveyStatusMutation, UpdateSurveyStatusMutationVariables>;

/**
 * __useUpdateSurveyStatusMutation__
 *
 * To run a mutation, you first call `useUpdateSurveyStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurveyStatusMutation, { data, loading, error }] = useUpdateSurveyStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      updateSurveyStatusId: // value for 'updateSurveyStatusId'
 *   },
 * });
 */
export function useUpdateSurveyStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurveyStatusMutation, UpdateSurveyStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurveyStatusMutation, UpdateSurveyStatusMutationVariables>(UpdateSurveyStatusDocument, options);
      }
export type UpdateSurveyStatusMutationHookResult = ReturnType<typeof useUpdateSurveyStatusMutation>;
export type UpdateSurveyStatusMutationResult = Apollo.MutationResult<UpdateSurveyStatusMutation>;
export type UpdateSurveyStatusMutationOptions = Apollo.BaseMutationOptions<UpdateSurveyStatusMutation, UpdateSurveyStatusMutationVariables>;
export const GetSurveyBySlugDocument = gql`
    query GetSurveyBySlug($slug: String!) {
  getSurveyBySlug(slug: $slug) {
    ...BaseSurvey
    questions {
      ...BaseQuestion
    }
  }
}
    ${BaseSurveyFragmentDoc}
${BaseQuestionFragmentDoc}`;

/**
 * __useGetSurveyBySlugQuery__
 *
 * To run a query within a React component, call `useGetSurveyBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveyBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveyBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetSurveyBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetSurveyBySlugQuery, GetSurveyBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveyBySlugQuery, GetSurveyBySlugQueryVariables>(GetSurveyBySlugDocument, options);
      }
export function useGetSurveyBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveyBySlugQuery, GetSurveyBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveyBySlugQuery, GetSurveyBySlugQueryVariables>(GetSurveyBySlugDocument, options);
        }
export type GetSurveyBySlugQueryHookResult = ReturnType<typeof useGetSurveyBySlugQuery>;
export type GetSurveyBySlugLazyQueryHookResult = ReturnType<typeof useGetSurveyBySlugLazyQuery>;
export type GetSurveyBySlugQueryResult = Apollo.QueryResult<GetSurveyBySlugQuery, GetSurveyBySlugQueryVariables>;
export const GetSurveysDocument = gql`
    query GetSurveys {
  getSurveys {
    ...BaseSurvey
    questions {
      ...BaseQuestion
    }
  }
}
    ${BaseSurveyFragmentDoc}
${BaseQuestionFragmentDoc}`;

/**
 * __useGetSurveysQuery__
 *
 * To run a query within a React component, call `useGetSurveysQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSurveysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSurveysQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSurveysQuery(baseOptions?: Apollo.QueryHookOptions<GetSurveysQuery, GetSurveysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSurveysQuery, GetSurveysQueryVariables>(GetSurveysDocument, options);
      }
export function useGetSurveysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSurveysQuery, GetSurveysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSurveysQuery, GetSurveysQueryVariables>(GetSurveysDocument, options);
        }
export type GetSurveysQueryHookResult = ReturnType<typeof useGetSurveysQuery>;
export type GetSurveysLazyQueryHookResult = ReturnType<typeof useGetSurveysLazyQuery>;
export type GetSurveysQueryResult = Apollo.QueryResult<GetSurveysQuery, GetSurveysQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    _id
    avatar
    email
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    