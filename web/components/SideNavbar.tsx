import { FC, useEffect } from 'react';
import Link from 'next/link';
import { IoMdSettings } from 'react-icons/io';
import { MdSpaceDashboard, MdOutlineBugReport } from 'react-icons/md';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useUserStore } from '../lib/stores/users.store';
import { useMeQuery } from '../lib/graphql';
import { BiLoaderCircle } from 'react-icons/bi';
import { useApolloClient } from '@apollo/client';
import { setToken } from '../lib/utils';

export const SideNavbar: FC = () => {
  const { authUser, logout, setUser } = useUserStore();
  const router = useRouter();
  const { data: authedData, loading: meQLoading } = useMeQuery();
  const apolloClient = useApolloClient();

  useEffect(() => {
    if (!meQLoading && !authedData?.me) {
      router.push('/login');
    } else if (authedData?.me) {
      setUser(authedData!.me);
    }
  }, [meQLoading, authedData, setUser, router]);

  const handleLogout = async () => {
    setToken('', true);
    logout();
    await apolloClient.resetStore();
    document.location.href = '/';
  };

  return (
    <div className="md:w-1/12 w-0 transition-all bg-gray-200 h-screen">
      <div className="h-full bg-blue-900 flex flex-col items-center justify-between py-4">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-4xl font-extrabold text-white pointer-events-none">
            <Link href="/">
              <a>
                <Image
                  src="/assets/sideNavBrandLogo.svg"
                  alt="Brand logo"
                  width={90}
                  height={90}
                />
              </a>
              {/* <a className="before:content-[':{'] after:content-['}:'] before:pr-2 after:pl-2">
                S
              </a> */}
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

        {meQLoading ? (
          <div className="flex justify-center items-center h-16">
            <BiLoaderCircle className="animate-spin text-white" size="1.8rem" />
          </div>
        ) : authUser ? (
          <div
            className="flex justify-center ransition-all hover:bg-[#b5b5b52e] mt-2 py-2 rounded cursor-pointer
						items-center"
            onClick={handleLogout}
          >
            <Image
              src={authUser.avatar}
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
