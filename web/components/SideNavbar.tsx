import { FC, useEffect } from 'react';
import Link from 'next/link';
import { IoMdSettings } from 'react-icons/io';
import { MdSpaceDashboard, MdOutlineBugReport } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { userStore, UserType } from '../lib/stores/users.store';

export const SideNavbar: FC = () => {
  const { authUser, logout, setUser } = userStore();
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (data?.user) {
      setUser(data!.user as UserType);
    }
  }, [router, status, data, setUser]);

  const handleLogout = async () => {
    await signOut();
    logout();
    router.push('/login');
  };

  return (
    <div className="md:w-1/12 sm:w-0 transition-all bg-gray-200 h-screen">
      <div className="h-full bg-blue-900 flex flex-col items-center justify-between py-4">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-4xl font-extrabold text-white pointer-events-none">
            <Link href="/">
              <a className="before:content-[':{'] after:content-['}:'] before:pr-2 after:pl-2">
                S
              </a>
            </Link>
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href="/dashboard">
            <a className="flex justify-center items-center w-12 h-12 rounded text-white hover:underline transition-all bg-[#b5b5b52e] mt-2 hover:bg-transparent hover:border">
              <i>
                <MdSpaceDashboard size="1.8rem" />
              </i>
            </a>
          </Link>

          <Link href="/dashboard/settings">
            <a className="flex justify-center items-center w-12 h-12 rounded text-white hover:underline transition-all bg-[#b5b5b52e] mt-2 hover:bg-transparent hover:border">
              <i>
                <IoMdSettings size="1.8rem" />
              </i>
            </a>
          </Link>

          <Link href="/dashboard/bug-report">
            <a className="flex justify-center items-center w-12 h-12 rounded text-white hover:underline transition-all bg-[#b5b5b52e] mt-2 hover:bg-transparent hover:border">
              <i>
                <MdOutlineBugReport size="1.8rem" />
              </i>
            </a>
          </Link>
        </div>

        {authUser ? (
          <div
            className="flex justify-center pl-3 ransition-all hover:bg-[#b5b5b52e] mt-2 py-2 rounded cursor-pointer"
            onClick={handleLogout}
          >
            <Image
              src={authUser.image}
              width={40}
              height={40}
              alt={authUser.name}
              className="rounded-full"
            />
            <span className="ml-2 text-white text-xs">{authUser.name}</span>
          </div>
        ) : (
          <h1 className="tetx-white uppercase">No Auth User</h1>
        )}
      </div>
    </div>
  );
};
