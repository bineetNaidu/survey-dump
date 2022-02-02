import { NextPage } from 'next';
import Image from 'next/image';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';
import { useUserStore } from '../../lib/stores/users.store';
import { FaTrash } from 'react-icons/fa';

const Settings: NextPage = () => {
  const { authUser } = useUserStore();
  return (
    <div className="flex">
      <SideNavbar />
      <div className="md:w-11/12 w-full bg-gray-200 min-h-screen h-full transition-all py-10 px-16">
        <div>
          <h1 className="text-3xl text-blue-600 font-bold">Account Settings</h1>
          <p className="text-gray-500">
            This information will be displayed publicly so be careful what you
            share
          </p>

          <div className="flex flex-col mt-6">
            <div className="flex justify-between items-center border-y-2 border-gray-300 px-6 py-2">
              <h2 className="font-medium text-gray-600">Name</h2>
              <h2 className="font-semibold text-gray-800">{authUser?.name}</h2>
              <div>
                <button className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1">
                  Update
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center border-b-2 border-gray-300 px-6 py-2">
              <h2 className="font-medium text-gray-600">Email</h2>
              <h2 className="font-semibold text-gray-800">{authUser?.email}</h2>
              <div>
                <button className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1">
                  Update
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center border-b-2 border-gray-300 px-6 py-2">
              <h2 className="font-medium text-gray-600">Avatar</h2>
              <div className="flex-1 flex justify-center items-center">
                <Image
                  src={authUser ? authUser.avatar : '/vercel.svg'}
                  height={50}
                  width={50}
                  className="rounded-full"
                  alt={authUser?.name}
                />
              </div>
              <div className="flex">
                <button className="text-red-500 outline-none border border-transparent hover:border-red-400 hover:bg-red-100 transition-all rounded px-2 py-1">
                  Remove
                </button>
                <div className="border border-gray-300 mx-1"></div>
                <button className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1">
                  Update
                </button>
              </div>
            </div>

            <div className="w-2/3 border border-red-500 bg-red-100 flex flex-col justify-center items-center mx-auto p-6 rounded mt-8 bg-opacity-20">
              <h1 className="font-bold text-3xl mb-5">Danger Zone</h1>
              <button className="px-4 py-2 rounded bg-red-500 text-white text-sm flex items-center hover:bg-red-600 transition-all ">
                <FaTrash className="mr-1" /> Delete my survey dump account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Settings);
