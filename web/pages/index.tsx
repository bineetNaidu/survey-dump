import type { NextPage } from 'next';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useUserStore } from '../lib/stores/users.store';
import { useToasts } from 'react-toast-notifications';

const Home: NextPage = () => {
  const router = useRouter();
  const { status, data } = useSession();
  const { setUser } = useUserStore();
  const { addToast } = useToasts();

  useEffect(() => {
    if (status === 'authenticated' && data?.user) {
      setUser(data.user as any);
      addToast(`Authenticated as ${data.user.email}`, {
        appearance: 'success',
        autoDismissTimeout: 2000,
        autoDismiss: true,
        id: 'authenticated',
      });
      router.push('/dashboard');
    }
  }, [status, data, setUser, router, addToast]);

  return (
    <div className="container mx-auto py-4">
      <Navbar />

      <main className="flex my-20 justify-between items-center">
        <div className="flex-1">
          <h1 className="text-6xl font-bold text-blue-900">
            Know Your User & Drive Engagement
          </h1>

          <p className="mt-5 text-gray-600 tracking-wider">
            Survey Dump is a free<span className="text-stone-500">*</span>,
            open-source, web-based platform for collecting, analyzing, and
            sharing data from surveys.
          </p>

          <div className="mt-16">
            <Link href="signup">
              <a className="hover:text-blue-900 text-white hover:bg-white bg-blue-900 transition-all py-4 px-6 rounded-3xl border border-blue-900">
                Create a Free Account
              </a>
            </Link>

            <Link href="/login">
              <a className="text-blue-900 hover:text-white hover:bg-blue-900 transition-all py-4 px-6 rounded-3xl border border-blue-900 ml-4">
                Login to Your Account
              </a>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative h-full w-full">
          <div className="flex flex-row-reverse pt-8">
            <div className="h-[300px] w-[300px] relative rounded-3xl bg-blue-900">
              <div className="h-[150px] w-[150px] rounded-3xl bg-green-400 absolute -top-24 -left-24 -z-10"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
