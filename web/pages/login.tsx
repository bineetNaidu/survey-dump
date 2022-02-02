import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Formik, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { GoogleAuthBtn } from '../components/GoogleAuthBtn';
import { withApollo } from '../lib/nextApollo';
import { useLoginMutation } from '../lib/graphql';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { BiLoaderCircle } from 'react-icons/bi';
import Cookie from 'js-cookie';
import { useUserStore } from '../lib/stores/users.store';

const Login: NextPage = () => {
  const [login] = useLoginMutation();
  const { addToast } = useToasts();
  const route = useRouter();
  const { setUser } = useUserStore();
  return (
    <div className="container mx-auto py-4">
      <Navbar />

      <div className="flex justify-center items-center my-8">
        <div className="w-full max-w-xs">
          <h1 className="text-center text-3xl font-bold mb-3">Login</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) errors.email = 'Required';
              if (!values.password) errors.password = 'Required';
              return errors;
            }}
            onSubmit={async (
              values,
              { setSubmitting, setErrors, setValues }
            ) => {
              setSubmitting(true);
              const { data } = await login({
                variables: {
                  data: {
                    email: values.email,
                    password: values.password,
                  },
                },
              });
              if (data?.login?.errors) {
                data.login.errors.forEach((error) => {
                  setErrors({
                    [error.field]: error.message,
                  });
                });
              }
              if (data?.login?.token) {
                Cookie.set('__survey_dump_auth_token__', data.login.token);
                setUser(data.login.user!);
                addToast('Logged in successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                  id: 'login-success',
                });
                setSubmitting(false);
                setValues({
                  email: '',
                  password: '',
                });
                setErrors({});
                route.push('/dashboard');
              }
            }}
          >
            {({ getFieldProps, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...getFieldProps('email')}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    render={(msg) => (
                      <div className="text-red-500 text-xs mt-1 italic">
                        {msg}*
                      </div>
                    )}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...getFieldProps('password')}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    render={(msg) => (
                      <div className="text-red-500 text-xs mt-1 italic">
                        {msg}*
                      </div>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed "
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <BiLoaderCircle
                        className="w-6 h-6 mx-auto animate-spin"
                        color="#fff"
                      />
                    ) : (
                      'Login'
                    )}
                  </button>
                  <Link href="/signup">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                      Don&apos;t have an account?
                    </a>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>

          <hr className="w-full border-t border-gray-300 my-8 border-dashed" />

          <GoogleAuthBtn />
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: false })(Login);
