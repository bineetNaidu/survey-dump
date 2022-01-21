import { FC } from 'react';
import { Form, Formik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { CREATE_SURVEY } from '../lib/queries';
import { useMutation } from '@apollo/client';
import { getCreatedAt } from '../lib/utils';
import { nanoid } from 'nanoid';
import { surveyStore } from '../lib/stores/survey.store';
import { userStore } from '../lib/stores/users.store';
interface CreateSurveyFormProps {
  handleNext: () => void;
}

export const CreateSurveyForm: FC<CreateSurveyFormProps> = ({ handleNext }) => {
  const { addToast } = useToasts();
  const [createSurvey] = useMutation(CREATE_SURVEY);
  const { authUser } = userStore();
  const { addSurvey } = surveyStore();

  const handleCreateSurveySubmit = async (
    title: string,
    description: string
  ) => {
    try {
      if (!authUser) throw new Error('User not authenticated');
      const obj = {
        title,
        description,
        questions: [],
        creator: authUser.email as any,
        createdAt: getCreatedAt(),
        status: 'DRAFT',
        slug: nanoid(),
      };
      const { data } = await createSurvey({
        variables: { data: obj },
      });
      console.log(`Created survey: ${JSON.stringify(data, null, 2)}`);
      const { createSurvey: newSurvey } = data;
      if (newSurvey) {
        addSurvey(newSurvey);
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
