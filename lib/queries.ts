import { gql } from '@apollo/client';

export const GET_SURVEYS = gql`
  query GetSurveys($creator: String!) {
    getSurveys(creator: $creator) {
      data {
        description
        _id
        slug
        questions {
          _id
          isOption
          isField
          options {
            _id
            name
            createdAt
            other
          }
          createdAt
          title
          fieldPlaceholder
        }
        creator
        createdAt
        title
      }
    }
  }
`;

export const GET_SURVEY = gql`
  query GetSurvey($surveyId: ID!) {
    getSurvey(slug: $slug) {
      description
      _id
      slug
      questions {
        _id
        isOption
        isField
        options {
          _id
          name
          createdAt
          other
        }
        createdAt
        title
        fieldPlaceholder
      }
      creator
      createdAt
      title
    }
  }
`;

export const CREATE_SURVEY = gql`
  mutation CreateSurvey($data: SurveyInput!) {
    createSurvey(data: $data) {
      _id
      slug
      questions {
        _id
      }
      creator
      createdAt
      title
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($data: QuestionInput!) {
    createQuestion(data: $data) {
      _id
      isOption
      survey {
        _id
      }
      isField
      options {
        _id
      }
      createdAt
      title
      fieldPlaceholder
    }
  }
`;

export const CREATE_OPTION = gql`
  mutation CreateOption($data: OptionInput!) {
    createOption(data: $data) {
      question {
        _id
      }
      name
      _id
      createdAt
      other
    }
  }
`;

export const DELETE_SURVEY = gql`
  mutation DeleteSurvey($surveyId: ID!) {
    deleteSurvey(id: $surveyId) {
      _id
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($questionId: ID!) {
    deleteQuestion(id: $questionId) {
      _id
    }
  }
`;

export const DELETE_OPTION = gql`
  mutation DeleteOption($optionId: ID!) {
    deleteOption(id: $optionId) {
      _id
    }
  }
`;
