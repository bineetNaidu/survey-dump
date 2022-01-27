import create from 'zustand';
import { Survey } from '../graphql';

interface ISurveyStore {
  surveys: Survey[];
  setSurveys: (data: Survey[]) => void;
  addSurvey: (data: Survey) => void;
  removeSurvey: (id: string) => void;
  updateSurvey: (id: string, data: Partial<Survey>) => void;
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
        survey._id === id ? { ...survey, ...data } : survey
      ),
    }));
  },
}));
