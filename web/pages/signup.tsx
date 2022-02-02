import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Formik, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { withApollo } from '../lib/nextApollo';
import { useUserStore } from '../lib/stores/users.store';
import { useToasts } from 'react-toast-notifications';
import { useRegisterMutation } from '../lib/graphql';
import { BiLoaderCircle } from 'react-icons/bi';
import { setToken } from '../lib/utils';

const Signup: NextPage = () => {
  const { setUser } = useUserStore();
  const { addToast } = useToasts();
  const [register] = useRegisterMutation();

  const ErrorMessageWrapper = (msg: string) => (
    <div className="text-red-500 text-xs mt-1 italic">{msg}*</div>
  );

  return (
    <div className="container mx-auto py-4">
      <Navbar />

      <div className="flex justify-center items-center my-8">
        <div className="w-full max-w-xs">
          <h1 className="text-center text-3xl font-bold mb-3">Sign up</h1>
          <Formik
            initialValues={{
              email: '',
              name: '',
              avatar: '',
              password: '',
              confirmPassword: '',
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = 'Required';
              }
              if (!values.name) {
                errors.name = 'Required';
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

              const { data } = await register({
                variables: {
                  data: {
                    email: values.email,
                    name: values.name,
                    password: values.password,
                    avatar: values.avatar,
                  },
                },
              });

              if (data?.register?.errors) {
                data.register.errors.forEach((error) => {
                  setErrors({
                    [error.field]: error.message,
                  });
                });
              }

              if (data?.register.token) {
                setUser(data.register.user!);
                setToken(data.register.token);
                addToast(
                  `Successfully registered as ${data.register.user!.email}`,
                  {
                    appearance: 'success',
                    autoDismissTimeout: 2000,
                    autoDismiss: true,
                    id: 'registered-success',
                  }
                );
                setSubmitting(false);
                setErrors({});
                document.location.href = '/dashboard';
              }
            }}
          >
            {({ errors, getFieldProps, handleSubmit, isSubmitting }) => (
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
                    render={ErrorMessageWrapper}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...getFieldProps('name')}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    render={ErrorMessageWrapper}
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
                    render={ErrorMessageWrapper}
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
                    render={ErrorMessageWrapper}
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
                    render={ErrorMessageWrapper}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    {!isSubmitting ? (
                      'Sign Up'
                    ) : (
                      <div className="flex items-center w-full justify-center">
                        <BiLoaderCircle className="animate-spin" />
                      </div>
                    )}
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
    </div>
  );
};

export default withApollo({ ssr: false })(Signup);
