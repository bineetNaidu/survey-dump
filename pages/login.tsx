import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Formik, Form, ErrorMessage } from 'formik';
import Link from 'next/link';
import { GoogleAuthBtn } from '../components/GoogleAuthBtn';

const Login: NextPage = () => {
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center my-8">
        <div className="w-full max-w-xs">
          <h1 className="text-center text-3xl font-bold mb-3">Login</h1>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.username) errors.username = 'Required';
              if (!values.password) errors.password = 'Required';
              return errors;
            }}
            onSubmit={async (
              values,
              { setSubmitting, validateForm, setErrors }
            ) => {
              const err = await validateForm(values);
              if (err) setErrors(err);

              console.log(values);
              setSubmitting(false);
            }}
          >
            {({ errors, getFieldProps, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
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
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
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
    </>
  );
};

export default Login;
