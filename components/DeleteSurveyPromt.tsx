import { FC } from 'react';
import { BaseModal } from './Modal';

interface DeleteSurveyPromtProps {
  show: boolean;
  setShow: (show: boolean) => void;
  handleCancel: () => void;
  handleDelete: () => void | Promise<void>;
}

export const DeleteSurveyPromt: FC<DeleteSurveyPromtProps> = ({
  handleDelete,
  setShow,
  show,
  handleCancel,
}) => {
  return (
    <BaseModal
      show={show}
      setShow={setShow}
      containerClassName="w-5/6 md:w-2/3 lg:w-1/2"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <h1 className="text-center text-gray-700 text-3xl mb-4">
            Delete this Survey?
          </h1>
          <p className="text-center text-gray-500 text-xl">
            Are you sure you want to delete this survey?
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-2 transition-all duration-300 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </BaseModal>
  );
};
