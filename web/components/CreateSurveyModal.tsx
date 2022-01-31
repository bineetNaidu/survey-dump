import { FC } from 'react';
import { Form, Formik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { useSurveyStore } from '../lib/stores/survey.store';
import { useUserStore } from '../lib/stores/users.store';
import { useCreateSurveyMutation } from '../lib/graphql';
interface CreateSurveyFormProps {
  handleNext: () => void;
  setSurveyId: (surveyId: string) => void;
}

export const CreateSurveyForm: FC<CreateSurveyFormProps> = ({
  handleNext,
  setSurveyId,
}) => {
  const { addToast } = useToasts();
  const [createSurvey] = useCreateSurveyMutation();
  const { authUser } = useUserStore();
  const { addSurvey } = useSurveyStore();

  const handleCreateSurveySubmit = async (
    title: string,
    description: string
  ) => {
    try {
      if (!authUser) throw new Error('User not authenticated');
      const { data } = await createSurvey({
        variables: {
          data: {
            creator: authUser.email,
            description,
            title,
          },
        },
      });

      if (data?.createSurvey) {
        addSurvey(data.createSurvey);
        setSurveyId(data.createSurvey._id);
      }
    } catch (e) {
      throw new Error((e as Error).message);
    }
  };

  return (
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
            handleNext();
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
  );
};
