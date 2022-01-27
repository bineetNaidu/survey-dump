import create from 'zustand';
import { Survey } from '../graphql';

interface ISurveyStore {
  surveys: Survey[];
  selectedSurvey: Survey | null;
  setSurveys: (data: Survey[]) => void;
  addSurvey: (data: Survey) => void;
  removeSurvey: (id: string) => void;
  updateSurvey: (id: string, data: Partial<Survey>) => void;
  setSelectedSurvey: (id: string) => void;
  clearSelectedSurvey: () => void;
}

export const surveyStore = create<ISurveyStore>((set) => ({
  surveys: [],
  selectedSurvey: null,

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
      selectedSurvey: state.selectedSurvey && {
        ...state.selectedSurvey,
        ...data,
      },
      surveys: state.surveys.map((survey) =>
        survey._id === id ? { ...survey, ...data } : survey
      ),
    }));
  },
  setSelectedSurvey: (id) => {
    set((state) => ({
      selectedSurvey: state.surveys.find((survey) => survey._id === id) ?? null,
    }));
  },
  clearSelectedSurvey: () => {
    set((state) => ({ selectedSurvey: null }));
  },
}));
