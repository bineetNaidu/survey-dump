export const CREATE_USER = (
  username: string,
  avatar: string,
  email: string,
  createdAt: Date,
  googleId: string
) => {
  return `
	mutation {
  createUser(
    data: {
			googleId: "${googleId}",
      username: ${username}
      email: ${email}
      avatar: ${avatar}
      surveys: []
      createdAt: ${createdAt}
    }
  ) {
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
};

export const LOGIN = (googleId: string) => {
  return `
	query {
  login(googleId: ${googleId}){
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
};

export const GET_SURVEY = (slug: string) => {
  return `
	query {
  getSurvey(slug: ${slug}) {
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
}`;
};

export const CREATE_SURVEY = (
  slug: string,
  title: string,
  description: string,
  creator: string,
  createdAt: Date,
  questions: string[]
) => {
  return `
	mutation {
  createSurvey(data: {
    slug: ${slug}
    title:${title}    
		description: ${description}
    questions: ${questions}
    creator: ${creator}
    createdAt: ${createdAt}
  }) {
    _id
    slug
    questions {
      _id
    }
    creator
    createdAt
    title
  }
}`;
};

export const CREATE_QUESTION = (
  title: string,
  isOption: string,
  isField: string,
  createdAt: Date,
  surveyId: string,
  options?: string[],
  fieldPlaceholder?: string
) => {
  return `
	mutation {
  createQuestion(data: {
    title: ${title}
    isOption: ${isOption}
    isField: ${isField}
    options: ${options ?? []}
    fieldPlaceholder: ${fieldPlaceholder ?? null}
    createdAt: ${createdAt}
    surveyId: ${surveyId}
  }) {
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
}`;
};

export const CREATE_OPTION = (
  name: string,
  createdAt: string,
  questionId: string,
  other?: string
) => {
  return `
	mutation {
  createOption(data: {
    name: ${name} 
    other: ${other ?? null} 
    createdAt: ${createdAt} 
    questionId: ${questionId} 
	}) {
    questionId
    name
    _id
    createdAt
    other
  }
}
`;
};

export const DELETE_SURVEY = (surveyId: string) => {
  return `
	mutation {
  deleteSurvey(id: ${surveyId}) {
    _id
  }
}`;
};

export const DELETE_QUESTION = (questionId: string) => {
  return `
	mutation {
  deleteQuestion(id: ${questionId}) {
    _id
  }
}
`;
};

export const DELETE_OPTION = (optionId: string) => {
  return `
	mutation {
	deleteOption(id: ${optionId}) {
		_id
	}
}
`;
};
