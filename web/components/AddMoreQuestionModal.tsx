import { FC } from 'react';
import { useSurveyStore } from '../lib/stores/survey.store';
import { CreateQuestionsForm } from './CreateQuestionsForm';
import { BaseModal } from './Modal';

interface AddMoreQuestionModalProps {
  show: boolean;
  setShow: (b: boolean) => void;
  surveyId: string;
}

export const AddMoreQuestionModal: FC<AddMoreQuestionModalProps> = ({
  setShow,
  show,
  surveyId,
}) => {
  return (
    <BaseModal setShow={setShow} show={show}>
      <CreateQuestionsForm
        handleClose={() => setShow(false)}
        surveyId={surveyId}
      />
    </BaseModal>
  );
};
