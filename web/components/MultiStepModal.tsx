import { FC, useState } from 'react';
import { CreateQuestionsForm } from './CreateQuestionsForm';
import { CreateSurveyForm } from './CreateSurveyModal';
import { BaseModal } from './Modal';

interface MultiStepModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const MultiStepModal: FC<MultiStepModalProps> = ({ show, setShow }) => {
  // create a multi step modal with 3 steps
  const [step, setStep] = useState(1);
  const [surveyId, setSurveyId] = useState<null | string>(null);

  const handleNext = () => {
    if (step <= 2) {
      setStep(step + 1);
    } else {
      setStep(1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setShow(false);
  };

  return (
    <BaseModal show={show} setShow={setShow}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 w-full">
          {step === 1 && (
            <CreateSurveyForm
              handleNext={handleNext}
              setSurveyId={setSurveyId}
            />
          )}
          {step === 2 && (
            <CreateQuestionsForm
              surveyId={surveyId}
              handleClose={handleClose}
            />
          )}
        </div>
        {/* steps indicators */}
        <div className="flex justify-between">
          <div className="flex">
            <div
              onClick={() => setStep(1)}
              className={`${
                step === 1 ? 'bg-blue-500' : 'bg-gray-400'
              } w-2 h-2 rounded-full mr-2 transition-all hover:scale-125 cursor-pointer`}
            />
            <div
              onClick={() => setStep(2)}
              className={`${
                step === 2 ? 'bg-blue-500' : 'bg-gray-400'
              } w-2 h-2 rounded-full mr-2 transition-all hover:scale-125 cursor-pointer`}
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
