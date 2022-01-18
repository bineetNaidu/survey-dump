import create from 'zustand';
import type { SurveyType } from '../types';

interface ISurveyStore {
  surveys: SurveyType[];
  setSurveys: (data: SurveyType[]) => void;
  addSurvey: (data: SurveyType) => void;
  removeSurvey: (id: string) => void;
  updateSurvey: (id: string, data: SurveyType) => void;
}

export const surveyStore = create<ISurveyStore>((set) => ({
  surveys: [],
  setSurveys: (data) => {
    set({ surveys: data });
  },
  addSurvey: (data) => {
    set((state) => ({ surveys: [...state.surveys, data] }));
  },
  removeSurvey: (id) => {
    set((state) => ({
      surveys: state.surveys.filter((survey) => survey._id !== id),
    }));
  },
  updateSurvey: (id, data) => {
    set((state) => ({
      surveys: state.surveys.map((survey) =>
        survey._id === id ? data : survey
      ),
    }));
  },
}));
