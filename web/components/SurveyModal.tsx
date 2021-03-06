import { FC, useState } from 'react';
import {
  useDeleteSurveyMutation,
  useUpdateSurveyStatusMutation,
} from '../lib/graphql';
import { BaseModal } from './Modal';
import { useToasts } from 'react-toast-notifications';
import { useSurveyStore } from '../lib/stores/survey.store';
import { DeleteSurveyPromt } from './DeleteSurveyPromt';
import { FaTrash, FaPencilAlt, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { EditableQuestionCard } from './EditableQuestionCard';
import { AddMoreQuestionModal } from './AddMoreQuestionModal';

interface SurveyModalProps {
  show: boolean;
  setShow: (b: boolean) => void;
  handleCloseSurveyModal: () => void;
}

export const SurveyModal: FC<SurveyModalProps> = ({
  setShow,
  show,
  handleCloseSurveyModal,
}) => {
  const {
    removeSurvey,
    selectedSurvey,
    surveyQuestions,
    updateSelectedSurvey,
  } = useSurveyStore();
  const [showDeleteSurveyPromt, setShowDeleteSurveyPromt] = useState(false);
  const [updateSurveyStatus] = useUpdateSurveyStatusMutation();
  const [deleteSurvey] = useDeleteSurveyMutation();
  const { addToast } = useToasts();
  const [showAddMoreQuestionsModal, setShowAddMoreQuestionsModal] =
    useState(false);

  if (!selectedSurvey) return null;

  const isDraft = selectedSurvey.status === 'DRAFT';

  const handleUpdateSurveyStatus = async (status: string) => {
    const { data } = await updateSurveyStatus({
      variables: {
        updateSurveyStatusId: selectedSurvey._id,
        status,
      },
    });
    if (data?.updateSurveyStatus) {
      updateSelectedSurvey(selectedSurvey._id, {
        status: data.updateSurveyStatus.status,
      });
      addToast('Survey status updated', {
        appearance: 'success',
        autoDismiss: true,
      });
    } else {
      addToast('Error updating survey status', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const handleDeleteSurvey = async () => {
    const { data } = await deleteSurvey({
      variables: {
        deleteSurveyId: selectedSurvey._id,
      },
    });
    if (data?.deleteSurvey) {
      removeSurvey(selectedSurvey._id);
      addToast(`Survey ${selectedSurvey.title} deleted`, {
        appearance: 'success',
        autoDismiss: true,
      });
      handleCloseSurveyModal();
    } else {
      addToast(`Error deleting survey ${selectedSurvey.title}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <BaseModal
      show={show}
      setShow={setShow}
      containerClassName="w-[100%] h-[90%] mx-auto mt-8 rounded-t-xl shadow-lg overflow-auto"
    >
      <DeleteSurveyPromt
        show={showDeleteSurveyPromt}
        setShow={setShowDeleteSurveyPromt}
        handleDelete={handleDeleteSurvey}
        handleCancel={() => setShowDeleteSurveyPromt(false)}
      />
      <AddMoreQuestionModal
        show={showAddMoreQuestionsModal}
        setShow={setShowAddMoreQuestionsModal}
        surveyId={selectedSurvey._id}
      />
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-500">
          {selectedSurvey.title}
        </h1>
        <p className="text-gray-600 italic mt-3">
          {selectedSurvey.description}
        </p>
      </div>

      <hr className="border-2 my-4 border-dashed" />

      <div className="flex flex-col md:flex-row">
        <div className="flex-[0.6]">
          <h2 className="text-2xl font-bold text-blue-500">
            Questions <span className="text-sm text-blue-300">*preview</span>{' '}
          </h2>
          <div className="flex flex-wrap mt-4">
            {surveyQuestions.map((question, idx) => (
              <EditableQuestionCard
                key={question._id}
                q={question}
                idx={idx}
                isDraft={isDraft}
              />
            ))}
            <button
              className="w-3/4 py-2 mx-2 text-sm text-gray-500 border border-dashed border-gray-500 rounded transition-all hover:text-gray-700 hover:border-gray-700"
              onClick={() => setShowAddMoreQuestionsModal(true)}
            >
              <span className="flex justify-center items-center">
                <FaPlus className="mr-1" />
                Add more questions
              </span>
            </button>
          </div>
        </div>
        <hr className="border-2 my-4 border-dashed md:hidden block" />
        <div className="flex-[0.4]">
          <h2 className="text-2xl font-bold text-blue-500">
            Status:{' '}
            <span
              className={`${
                isDraft ? 'bg-orange-500' : 'bg-green-500'
              } p-1 text-white font-normal text-lg rounded-sm`}
            >
              {selectedSurvey.status}
            </span>
            <button
              className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 ml-4 py-1 px-2 rounded"
              onClick={
                isDraft
                  ? () => handleUpdateSurveyStatus('ACTIVE')
                  : () => handleUpdateSurveyStatus('DRAFT')
              }
            >
              {isDraft ? 'Publish' : 'Draft'} it!
            </button>
          </h2>
          <p className="text-gray-600 italic mt-3">
            {isDraft &&
              'This survey is still a draft. You can edit it by clicking the pencil icon.'}
            {selectedSurvey.status === 'ACTIVE' &&
              'This survey is published. You can not edit it.'}
          </p>

          <div className="flex flex-col mt-4">
            <h2 className="text-2xl font-bold text-blue-500">Actions</h2>
            <div className="flex">
              {isDraft && (
                <button className="border border-blue-500 hover:border-transparent text-blue-500 hover:bg-blue-500 mx-1 hover:text-white font-bold py-2 px-4 transition-all duration-300 rounded">
                  <FaPencilAlt />
                </button>
              )}
              <button
                className="border border-red-500 hover:border-transparent text-red-500 hover:bg-red-500 mx-1 hover:text-white font-bold py-2 px-4 transition-all duration-300 rounded"
                onClick={() => setShowDeleteSurveyPromt(true)}
              >
                <FaTrash />
              </button>
              <button
                className="p-2 border border-blue-500 hover:border-transparent text-blue-500 hover:bg-blue-500 mx-1 hover:text-white transition-all duration-300 rounded-full"
                onClick={handleCloseSurveyModal}
              >
                <MdClose />
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
