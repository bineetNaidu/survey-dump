import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      _id
      email
      avatar
      username
      createdAt
      surveys {
        _id
      }
    }
  }
`;

export const LOGIN_WITH_GOOGLE = gql`
  query LoginWithGoogle($googleId: String!) {
    loginWithGoogle(googleId: $googleId) {
      _id
      email
      avatar
      username
      createdAt
      surveys {
        _id
      }
    }
  }
`;

export const LOGIN_WITH_CREDENTIALS = gql`
  query LoginWithCredentials($username: String!, $password: String!) {
    loginWithCredentials(username: $username, password: $password) {
      _id
      email
      avatar
      username
      createdAt
      surveys {
        _id
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
      creator {
        _id
        avatar
        username
      }
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
      surveyId
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
      questionId
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
