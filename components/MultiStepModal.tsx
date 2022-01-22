import { FC, useState } from 'react';
import Modal from 'react-overlays/Modal';
import { SurveyType } from '../lib/types';
import { CreateQuestionsForm } from './CreateQuestionsForm';
import { CreateSurveyForm } from './CreateSurveyModal';

interface MultiStepModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const Backdrop: FC = () => {
  return (
    <div className="fixed inset-0 z-[1040] bg-black opacity-75 transition-all "></div>
  );
};

export const MultiStepModal: FC<MultiStepModalProps> = ({ show, setShow }) => {
  // create a multi step modal with 3 steps
  const [step, setStep] = useState(1);
  const [surveyId, setSurveyId] = useState<null | string>(null);

  const renderBackdrop = (props: any) => <Backdrop {...props} />;
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
    <Modal
      autoFocus={false}
      show={show}
      onHide={() => setShow(false)}
      renderBackdrop={renderBackdrop}
      aria-labelledby="modal-label"
      className="fixed w-2/3 top-[50%] left-[50%] z-[1040] bg-white p-20 border border-gray-300 -translate-x-2/4 -translate-y-2/4 transition-all duration-300 ease-in-out"
    >
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
    </Modal>
  );
};
