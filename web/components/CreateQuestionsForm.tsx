import { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { useToasts } from 'react-toast-notifications';
import {
  QuestionOptionInput,
  Question,
  useCreateQuestionMutation,
} from '../lib/graphql';
import { useSurveyStore } from '../lib/stores/survey.store';

interface IQuestion extends Omit<Question, '_id' | 'options' | 'survey'> {
  options: QuestionOptionInput[];
}

interface CreateSurveyFormProps {
  surveyId: string | null;
  handleClose: () => void;
}

const defaultValues = {
  title: '',
  isField: false,
  isOption: false,
  fieldPlaceholder: '',
  options: [
    {
      name: '',
      other: '',
    },
    {
      name: '',
      other: '',
    },
    {
      name: '',
      other: '',
    },
    {
      name: '',
      other: '',
    },
  ],
};

export const CreateQuestionsForm: FC<CreateSurveyFormProps> = ({
  handleClose,
  surveyId,
}) => {
  const { addToast } = useToasts();
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [createQuestion] = useCreateQuestionMutation();
  const { addQuestion } = useSurveyStore();

  const handleCreateQuestion = async () => {
    try {
      if (!surveyId) throw new Error('Survey ID not initialized');

      // for each question, create a question
      questions.forEach(async (q) => {
        const { data } = await createQuestion({
          variables: {
            data: {
              ...q,
              survey: surveyId,
            },
          },
        });
        if (data?.createQuestion) {
          addQuestion(surveyId, data.createQuestion);
          addToast('Question created', {
            appearance: 'success',
            autoDismiss: true,
            id: data?.createQuestion._id,
          });
        }
      });

      handleClose();
    } catch (error) {
      addToast((error as Error).message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-center">Add A Questions</h1>
      <Formik
        initialValues={defaultValues}
        onSubmit={async (values, { setSubmitting, setValues }) => {
          try {
            if (!values.title) throw new Error('Title is required');
            if (!values.isField && !values.isOption)
              throw new Error('both isField and isOption can not be selected');
            if (values.isField && !values.fieldPlaceholder) {
              throw new Error(
                'Field placeholder is required as "Is field" is selected'
              );
            }
            if (values.isOption && !values.options.length) {
              throw new Error(
                'Options are required as "Is Option" is selected'
              );
            }
            const q: IQuestion = {
              title: values.title,
              isField: values.isField,
              isOption: values.isOption,
              fieldPlaceholder: values.isField
                ? values.fieldPlaceholder
                : undefined,
              options: values.isOption ? values.options : [],
            };
            setQuestions((s) => [...s, q]);
            addToast('Questions added to bank successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            setValues(defaultValues);
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
        {({ isSubmitting, getFieldProps, values, setValues }) => (
          <Form>
            <div className="flex flex-col mb-4">
              <label htmlFor="title" className="text-gray-700 text-sm mb-2">
                Questions Title
              </label>
              <input
                {...getFieldProps('title')}
                type="text"
                className="border border-gray-300 p-2 w-full"
                placeholder="Question Title"
              />
            </div>

            <div className="flex mb-4 items-center">
              <div className="mr-4">
                <label htmlFor="isField" className="text-gray-700 text-sm mb-2">
                  Is Field
                </label>
                <input
                  {...getFieldProps('isField')}
                  type="checkbox"
                  className="border border-gray-300 p-2 w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="isOption"
                  className="text-gray-700 text-sm mb-2"
                >
                  Is Option
                </label>
                <input
                  {...getFieldProps('isOption')}
                  type="checkbox"
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            {values.isField && (
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="fieldPlaceholder"
                  className="text-gray-700 text-sm mb-2"
                >
                  Field Placeholder
                </label>
                <input
                  {...getFieldProps('fieldPlaceholder')}
                  type="text"
                  className="border border-gray-300 p-2 w-full"
                  placeholder="Field Placeholder"
                />
              </div>
            )}

            {values.isOption && (
              <div className="mb-4">
                <label htmlFor="options" className="text-gray-700 text-lg mb-2">
                  Options
                </label>
                <div className="grid">
                  {values.options.map((option, index) => (
                    <div key={index} className="flex mb-4">
                      <div className="mr-4">
                        <label
                          htmlFor={`options[${index}].name`}
                          className="text-gray-700 text-sm mb-2"
                        >
                          Option {index + 1}
                        </label>
                        <input
                          {...getFieldProps(`options[${index}].name`)}
                          type="text"
                          className="border border-gray-300 p-2 w-full"
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                      {/* {index == 3 && ( */}
                      <div>
                        <label
                          htmlFor={`options[${index}].other`}
                          className="text-gray-700 text-sm mb-2"
                        >
                          Other
                        </label>
                        <input
                          {...getFieldProps(`options[${index}].other`)}
                          type="text"
                          placeholder="optional*"
                          className="border border-gray-300 p-2 w-full"
                        />
                      </div>
                      {/* )} */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex mb-4">
              <button
                type="submit"
                className="bg-blue-500 flex-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                Add Questions to bank!
              </button>
              <button
                className="bg-green-500 ml-4 flex-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
                onClick={async (e) => {
                  e.preventDefault();
                  await handleCreateQuestion();
                }}
              >
                Wrap and Exit!
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
