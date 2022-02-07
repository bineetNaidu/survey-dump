import { useLayoutEffect } from 'react';
import create, { StoreApi, UseBoundStore } from 'zustand';
import createZustandContext from 'zustand/context';
import { Option } from '../graphql';
import type {
  BaseQuestionType,
  BaseSurveyType,
  SelectedSurveyType,
} from '../types';

type BaseOption = Omit<Option, 'user'> & { user: { _id: string } };

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
    data: Partial<BaseOption>
  ) => void;
  removeQuestionOption: (
    surveyId: string,
    questionId: string,
    optionId: string
  ) => void;
}

type InitialStateType = Pick<
  ISurveyStore,
  'surveys' | 'selectedSurvey' | 'surveyQuestions'
>;
type SurveyStoreType = (
  preloadedState?: InitialStateType | {}
) => UseBoundStore<ISurveyStore, StoreApi<ISurveyStore>>;

const initialState: InitialStateType = {
  surveys: [],
  selectedSurvey: null,
  surveyQuestions: [],
};

let store: ReturnType<SurveyStoreType>;

const zustandContext = createZustandContext<ISurveyStore>();
export const useSurveyStore = zustandContext.useStore;
export const SurveyStoreProvider = zustandContext.Provider;

export const initializeStore: SurveyStoreType = (
  preloadedState: InitialStateType | {} = {}
) =>
  create<ISurveyStore>((set) => ({
    ...initialState,
    ...preloadedState,
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
                options: question.options.filter(
                  (option) => option._id !== oid
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

export function useCreateSurveyStore(initialState: InitialStateType) {
  // For SSR & SSG, always use a new store.
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  // For CSR, always re-use same store.
  store = store ?? initializeStore(initialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (initialState && !!store) {
      store.setState({
        ...store.getState(),
        ...initialState,
      });
    }
  }, [initialState]);

  return () => store;
}
