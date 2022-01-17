import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Formik, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { withApollo } from '../lib/nextApollo';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../lib/queries';
import type { UserType } from '../lib/types';
import { userStore } from '../lib/stores/users.store';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

const Signup: NextPage = () => {
  const [createUser] = useMutation(CREATE_USER);
  const { setUser } = userStore();
  const { addToast } = useToasts();
  const route = useRouter();

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center my-8">
        <div className="w-full max-w-xs">
          <h1 className="text-center text-3xl font-bold mb-3">Sign up</h1>
          <Formik
            initialValues={{
              email: '',
              username: '',
              avatar: '',
              password: '',
              confirmPassword: '',
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = 'Required';
              }
              if (!values.username) {
                errors.username = 'Required';
              }
              if (!values.avatar) {
                errors.avatar = 'Required';
              }
              if (!values.password) {
                errors.password = 'Required';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
              }
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords must match';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              setSubmitting(true);

              const date = new Date();
              const createdAt = `${date.getFullYear()}-${
                date.getMonth() < 10
                  ? `0${date.getMonth() + 1}`
                  : date.getMonth() + 1
              }-${date.getDate()}`;

              const { data, errors } = await createUser({
                variables: {
                  data: {
                    email: values.email,
                    username: values.username,
                    avatar: values.avatar,
                    password: values.password,
                    surveys: [],
                    createdAt,
                  },
                },
              });

              const { createUser: authUser } = data as {
                createUser: UserType | null;
              };

              console.log(data);
              // if (errors) {
              // }

              if (authUser) {
                setUser(authUser);
                addToast('Logged in successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                  onDismiss: () => {
                    route.push('/');
                  },
                });
              }

              setSubmitting(false);
              setErrors({});
            }}
          >
            {({ errors, getFieldProps, handleSubmit }) => (
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
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...getFieldProps('username')}
                  />
                  <ErrorMessage
                    name="username"
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
                    htmlFor="avatar"
                  >
                    Avatar
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...getFieldProps('avatar')}
                  />
                  <ErrorMessage
                    name="avatar"
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
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...getFieldProps('confirmPassword')}
                  />
                  <ErrorMessage
                    name="confirmPassword"
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
                  </button>
                  <Link href="/login">
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                      Already have an account?
                    </a>
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default withApollo({ ssr: false })(Signup);
