import { FC } from 'react';
import { Form, Formik } from 'formik';
import Modal from 'react-overlays/Modal';
import { useToasts } from 'react-toast-notifications';

interface CreateSurveyModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  handleCreateSurveySubmit: (
    title: string,
    description: string
  ) => Promise<void>;
}

const Backdrop: FC = () => {
  return <div className="fixed inset-0 z-[1040] bg-black opacity-50"></div>;
};

export const CreateSurveyModal: FC<CreateSurveyModalProps> = ({
  setShow,
  handleCreateSurveySubmit,
  show,
}) => {
  const renderBackdrop = (props: any) => <Backdrop {...props} />;
  const { addToast } = useToasts();

  return (
    <Modal
      autoFocus={false}
      show={show}
      onHide={() => setShow(false)}
      renderBackdrop={renderBackdrop}
      aria-labelledby="modal-label"
      className="fixed w-4/6 top-[50%] left-[50%] z-[1040] bg-white p-20 border border-gray-300 -translate-x-2/4 -translate-y-2/4"
    >
      <div>
        <h1 className="text-2xl font-bold mb-8 text-center">Create A Survey</h1>
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // check for empty fields
              if (values.title.length === 0) {
                throw new Error('Title is required');
              }
              if (values.description.length === 0) {
                throw new Error('Description is required');
              }
              await handleCreateSurveySubmit(values.title, values.description);

              addToast('Survey created successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              setShow(false);
            } catch (error) {
              addToast((error as Error).message, {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, getFieldProps }) => (
            <Form>
              <div className="flex flex-col mb-4">
                <label htmlFor="title" className="text-gray-700 text-sm mb-2">
                  Title
                </label>
                <input
                  {...getFieldProps('title')}
                  type="text"
                  className="border border-gray-300 p-2 w-full"
                  placeholder="Survey Title"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="description"
                  className="text-gray-700 text-sm mb-2"
                >
                  Description
                </label>
                <textarea
                  {...getFieldProps('description')}
                  className="border border-gray-300 p-2 w-full"
                  placeholder="Survey Description"
                />
              </div>
              <div className="flex flex-col mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isSubmitting}
                >
                  Create The Survey
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};
