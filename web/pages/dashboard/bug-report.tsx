import { NextPage } from 'next';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';
import { Formik, Form } from 'formik';
import { BiLoaderCircle } from 'react-icons/bi';
import { useToasts } from 'react-toast-notifications';
import { useCreateReportMutation } from '../../lib/graphql';
import { useUserStore } from '../../lib/stores/users.store';
import { useRouter } from 'next/router';

const BugReport: NextPage = () => {
  const { addToast } = useToasts();
  const [createReport] = useCreateReportMutation();
  const authUser = useUserStore().authUser;
  const router = useRouter();

  return (
    <div className="flex">
      <SideNavbar />
      <div className="md:w-11/12 sm:w-full bg-gray-200 min-h-screen h-full transition-all p-4 flex justify-center items-center">
        <div className="p-8 bg-white rounded-lg w-1/3">
          <h1 className="text-3xl text-blue-600 font-bold mb-6">
            report a bug
          </h1>
          <Formik
            initialValues={{
              message: '',
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (!authUser) {
                  throw new Error('User not authenticated');
                }
                const { data } = await createReport({
                  variables: {
                    data: {
                      message: values.message,
                      user: authUser!.email,
                    },
                  },
                });
                if (data?.createReport) {
                  addToast('Bug report was sent, thanks for your updates', {
                    appearance: 'success',
                    autoDismiss: true,
                    onDismiss: () => {
                      router.push('/dashboard');
                    },
                  });
                  setSubmitting(false);
                }
              } catch (error) {
                addToast((error as Error).message, {
                  appearance: 'error',
                  autoDismiss: true,
                });
              }
            }}
          >
            {({ isSubmitting, getFieldProps }) => (
              <Form>
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-gray-500 mb-2">
                    tell us what happened
                  </label>
                  <textarea
                    {...getFieldProps('message')}
                    className="w-full border border-blue-300 rounded p-2 mb-4 active:border-blue-500 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                    rows={10}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {!isSubmitting ? (
                      'Submit'
                    ) : (
                      <div className="flex justify-center items-ceter w-full">
                        <BiLoaderCircle className="animate-spin w-6 h-6" />
                      </div>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(BugReport);
