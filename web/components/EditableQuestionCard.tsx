import { FC, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';
import { Formik, Form } from 'formik';
import {
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateOptionMutation,
  useDeleteOptionMutation,
} from '../lib/graphql';
import { useToasts } from 'react-toast-notifications';
import { useSurveyStore } from '../lib/stores/survey.store';
import { BaseQuestionType } from '../lib/types';

interface EditableQuestionCardProps {
  q: BaseQuestionType;
  isDraft: boolean;
  idx: number;
}

export const EditableQuestionCard: FC<EditableQuestionCardProps> = ({
  q,
  idx,
  isDraft,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion, { loading: deleteQuestionLoading }] =
    useDeleteQuestionMutation();
  const [updateOption] = useUpdateOptionMutation();
  const [deleteOption, { loading: deleteOptionLoading }] =
    useDeleteOptionMutation();
  const { addToast } = useToasts();
  const {
    updateSurveyQuestion,
    removeSurveyQuestion,
    updateQuestionOption,
    removeQuestionOption,
  } = useSurveyStore();

  const handleDeleteQuestion = async () => {
    try {
      const { data } = await deleteQuestion({
        variables: {
          deleteQuestionId: q._id,
        },
      });
      if (data?.deleteQuestion) {
        removeSurveyQuestion(q.survey._id, q._id);
        addToast('Question deleted', {
          appearance: 'success',
          autoDismiss: true,
        });
      } else {
        addToast('Error deleting question', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast((error as Error).message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const handleDeleteOption = async (optionId: string) => {
    try {
      const { data } = await deleteOption({
        variables: {
          deleteOptionId: optionId,
          questionId: q._id,
        },
      });

      if (data?.deleteOption) {
        removeQuestionOption(q.survey._id, q._id, optionId);
        addToast('Option deleted', {
          appearance: 'success',
          autoDismiss: true,
        });
      } else {
        addToast('Error deleting option', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast((error as Error).message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div key={q._id} className="w-3/4 p-2 m-2 relative group">
      <Formik
        initialValues={{}}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const { data } = await updateQuestion({
              variables: {
                updateQuestionId: q._id,
                data: {
                  ...values,
                },
              },
            });
            if (data?.updateQuestion) {
              updateSurveyQuestion(q.survey._id, q._id, data.updateQuestion);
              addToast('Question updated', {
                appearance: 'success',
                autoDismiss: true,
              });
              setIsEditing(false);
              setSubmitting(false);
            } else {
              addToast('Error updating question', {
                appearance: 'error',
                autoDismiss: true,
              });
            }
          } catch (error) {
            addToast((error as Error).message, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        }}
      >
        {({ getFieldProps, isSubmitting, handleSubmit }) => (
          <Form>
            {isDraft && (
              <>
                <div
                  className={`absolute top-[30%] left-8 -rotate-90 opacity-0 ${
                    isEditing && 'group-hover:opacity-100 group-hover:-left-8'
                  } flex flex-col transition-all duration-500 translate-y-2 -translate-x-5`}
                >
                  <p className="bg-green-400 p-1 text-white">EDITING!</p>
                </div>
                <div className="absolute top-7 right-8 opacity-0 group-hover:opacity-100 group-hover:-right-8 flex flex-col transition-all duration-500">
                  <button
                    type="button"
                    className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 py-1 px-2 rounded"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    type="button"
                    className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 py-1 px-2 rounded mt-1"
                    onClick={handleDeleteQuestion}
                  >
                    {deleteQuestionLoading ? (
                      <BiLoaderCircle className="animate-spin" />
                    ) : (
                      <FaTrash />
                    )}
                  </button>
                </div>
              </>
            )}

            <div className="bg-gray-200 p-2 rounded">
              {isEditing ? (
                <input
                  className="w-full px-2 outline-none"
                  type="text"
                  placeholder="Question title"
                  defaultValue={q.title}
                  {...getFieldProps('title')}
                />
              ) : (
                <p className="text-sm font-semibold">
                  Q{idx + 1}. {q.title}
                </p>
              )}
            </div>
            {q.isField &&
              (isEditing ? (
                <input
                  type="text"
                  defaultValue={q.fieldPlaceholder!}
                  {...getFieldProps('fieldPlaceholder')}
                  placeholder="to update type or leave it blank"
                  disabled={!isEditing}
                  className={`w-full px-2 py-1 border border-dashed border-gray-400 outline-none mt-2 rounded`}
                />
              ) : (
                <input
                  disabled
                  type="text"
                  placeholder={q.fieldPlaceholder!}
                  className={`w-full px-2 py-1 border border-gray-400 outline-none mt-2 rounded`}
                />
              ))}
            <div
              className={`flex justify-end ${
                isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } transition-all duration-1000`}
            >
              <button
                type="button"
                className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 py-1 px-2 rounded mt-1 mr-1"
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  await handleSubmit();
                }}
                disabled={isSubmitting}
                className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 py-1 px-2 rounded mt-1 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <BiLoaderCircle className="animate-spin" />
                ) : (
                  'Update!'
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {q.isOption && (
        <div
          className={`flex flex-col transition-all ${!isEditing && '-mt-6 '}`}
        >
          {q.options.map((option) => (
            <div key={option._id}>
              <Formik
                initialValues={{}}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true);
                    const { data } = await updateOption({
                      variables: {
                        updateOptionId: option._id,
                        data: {
                          ...values,
                        },
                      },
                    });
                    if (data?.updateOption) {
                      updateQuestionOption(
                        q.survey._id,
                        q._id,
                        option._id,
                        data.updateOption
                      );
                      addToast('Option updated', {
                        appearance: 'success',
                        autoDismiss: true,
                      });
                      setIsEditing(false);
                      setSubmitting(false);
                    } else {
                      addToast('Error updating option', {
                        appearance: 'error',
                        autoDismiss: true,
                      });
                    }
                  } catch (error) {
                    addToast((error as Error).message, {
                      appearance: 'error',
                      autoDismiss: true,
                    });
                  }
                }}
              >
                {({ handleSubmit, getFieldProps, isSubmitting }) => (
                  <Form>
                    <div className="flex items-center">
                      {option.other ? (
                        <>
                          {isEditing ? (
                            <input
                              type="text"
                              defaultValue={option.other}
                              {...getFieldProps('other')}
                              disabled={!isEditing}
                              className={`px-2 py-1 border border-dashed border-gray-400 outline-none mt-2 rounded ml-5`}
                            />
                          ) : (
                            <input
                              type="text"
                              disabled
                              className="px-2 py-1 border border-gray-400 outline-none mt-2 rounded ml-5"
                              placeholder={option.other}
                              value=""
                            />
                          )}
                        </>
                      ) : (
                        <div className="flex items-center">
                          <input type="radio" disabled />
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                defaultValue={option.name!}
                                {...getFieldProps('name')}
                                placeholder="to update type or leave it blank"
                                disabled={!isEditing}
                                className={`w-fit active:border-blue-400 px-2 py-1 text-sm border border-dashed border-gray-400 outline-none mt-2 rounded ${
                                  isEditing && 'ml-2'
                                }`}
                              />
                            </>
                          ) : (
                            <p className="text-sm font-semibold ml-2 my-1">
                              {option.name!}
                            </p>
                          )}
                        </div>
                      )}
                      {isEditing && (
                        <div className="flex">
                          <button
                            type="submit"
                            onClick={async (e) => {
                              e.preventDefault();
                              await handleSubmit();
                            }}
                            disabled={isSubmitting && deleteOptionLoading}
                            className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 py-1 px-2 rounded mt-2 mx-2 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <BiLoaderCircle className="animate-spin" />
                            ) : (
                              'update!'
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.preventDefault();
                              await handleDeleteOption(option._id);
                            }}
                            disabled={isSubmitting && deleteOptionLoading}
                            className="text-xs text-gray-600 border border-gray-500 hover:bg-gray-400 hover:border-transparent hover:text-white font-bold transition-all duration-300 py-1 px-2 rounded mt-2 disabled:opacity-50"
                          >
                            {deleteOptionLoading ? (
                              <BiLoaderCircle className="animate-spin" />
                            ) : (
                              'delete!'
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
