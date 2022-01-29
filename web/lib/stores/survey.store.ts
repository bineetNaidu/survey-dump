import create from 'zustand';
import { Option } from '../graphql';
import type {
  BaseQuestionType,
  BaseSurveyType,
  SelectedSurveyType,
} from '../types';

interface ISurveyStore {
  surveys: BaseSurveyType[];
  selectedSurvey: SelectedSurveyType | null;
  surveyQuestions: BaseQuestionType[];

  setSurveys: (data: BaseSurveyType[]) => void;
  addSurvey: (data: BaseSurveyType) => void;
  removeSurvey: (id: string) => void;
  addQuestion: (surveyId: string, data: BaseQuestionType) => void;

  setSelectedSurveyState: (
    survey: SelectedSurveyType,
    surveyQuestions: BaseQuestionType[]
  ) => void;
  clearSelectedSurveyState: () => void;
  addSurveyQuestion: (surveyId: string, question: BaseQuestionType) => void;
  removeSurveyQuestion: (surveyId: string, qid: string) => void;
  updateSurveyQuestion: (
    surveyId: string,
    qid: string,
    data: Partial<BaseQuestionType>
  ) => void;
  updateSelectedSurvey: (
    surveyId: string,
    data: Partial<SelectedSurveyType>
  ) => void;
  updateQuestionOption: (
    surveyId: string,
    qid: string,
    oid: string,
    data: Partial<Option>
  ) => void;
  removeQuestionOption: (
    surveyId: string,
    questionId: string,
    optionId: string
  ) => void;
}

export const useSurveyStore = create<ISurveyStore>((set) => ({
  surveys: [],
  selectedSurvey: null,
  surveyQuestions: [],
  setSurveys: (data) => {
    set({ surveys: data });
  },
  addSurvey: (data) => {
    set((state) => ({ surveys: [...state.surveys, data] }));
  },
  removeSurvey: (id) => {
    set((state) => ({
      surveys: state.surveys.filter((survey) => survey._id !== id),
      selectedSurvey: null,
      surveyQuestions: [],
    }));
  },

  setSelectedSurveyState: (selectedSurvey, surveyQuestions) => {
    set({ selectedSurvey, surveyQuestions });
  },
  clearSelectedSurveyState: () => {
    set({ selectedSurvey: null, surveyQuestions: [] });
  },
  addSurveyQuestion: (sid, question) => {
    set((state) => ({
      surveyQuestions: [...state.surveyQuestions, question],
      surveys: state.surveys.map((survey) =>
        survey._id === sid
          ? { ...survey, questions: [...survey.questions, question] }
          : survey
      ),
    }));
  },
  removeSurveyQuestion: (sid, qid) => {
    set((state) => ({
      surveyQuestions: state.surveyQuestions.filter(
        (question) => question._id !== qid
      ),
      surveys: state.surveys.map((survey) =>
        survey._id === sid
          ? {
              ...survey,
              questions: survey.questions.filter(
                (question) => question._id !== qid
              ),
            }
          : survey
      ),
    }));
  },
  updateSurveyQuestion: (sid, qid, data) => {
    set((state) => ({
      surveyQuestions: state.surveyQuestions.map((question) =>
        question._id === qid ? { ...question, ...data } : question
      ),
      surveys: state.surveys.map((survey) =>
        survey._id === sid
          ? {
              ...survey,
              questions: survey.questions.map((question) =>
                question._id === qid ? { ...question, ...data } : question
              ),
            }
          : survey
      ),
    }));
  },
  updateSelectedSurvey: (sid, data) => {
    set((state) => ({
      selectedSurvey: state.selectedSurvey
        ? { ...state.selectedSurvey, ...data }
        : null,
      surveys: state.surveys.map((survey) =>
        survey._id === sid ? { ...survey, ...data } : survey
      ),
    }));
  },
  updateQuestionOption: (sid, qid, oid, data) => {
    set((state) => ({
      surveyQuestions: state.surveyQuestions.map((question) =>
        question._id === qid
          ? {
              ...question,
              options: question.options.map((option) =>
                option._id === oid ? { ...option, ...data } : option
              ),
            }
          : question
      ),
      surveys: state.surveys.map((survey) =>
        survey._id === sid
          ? {
              ...survey,
              questions: survey.questions.map((question) =>
                question._id === qid
                  ? {
                      ...question,
                      options: question.options.map((option) =>
                        option._id === oid ? { ...option, ...data } : option
                      ),
                    }
                  : question
              ),
            }
          : survey
      ),
    }));
  },
  removeQuestionOption: (sid, qid, oid) => {
    set((state) => ({
      surveyQuestions: state.surveyQuestions.map((question) =>
        question._id === qid
          ? {
              ...question,
              options: question.options.filter((option) => option._id !== oid),
            }
          : question
      ),
      surveys: state.surveys.map((survey) =>
        survey._id === sid
          ? {
              ...survey,
              questions: survey.questions.map((question) =>
                question._id === qid
                  ? {
                      ...question,
                      options: question.options.filter(
                        (option) => option._id !== oid
                      ),
                    }
                  : question
              ),
            }
          : survey
      ),
    }));
  },
  addQuestion: (sid, data) => {
    set((state) => ({
      surveyQuestions: state.selectedSurvey
        ? [...state.surveyQuestions, data]
        : [],
      surveys: state.surveys.map((survey) =>
        survey._id === sid
          ? { ...survey, questions: [...survey.questions, data] }
          : survey
      ),
    }));
  },
}));
