import { NextPage } from 'next';
import Image from 'next/image';
import { SideNavbar } from '../../components/SideNavbar';
import { withApollo } from '../../lib/nextApollo';
import { useUserStore } from '../../lib/stores/users.store';
import { FaTrash } from 'react-icons/fa';
import { PromtModal } from '../../components/PromtModal';
import { useState, useEffect } from 'react';
import { useDeleteMeMutation, useUpdateMeMutation } from '../../lib/graphql';
import { useApolloClient } from '@apollo/client';
import { useToasts } from 'react-toast-notifications';
import { BiLoaderCircle } from 'react-icons/bi';

const Settings: NextPage = () => {
  const { authUser, updateUser } = useUserStore();
  const [showDeletePromt, setShowDeletePromt] = useState(false);
  const [deleteMe] = useDeleteMeMutation();
  const client = useApolloClient();
  const { addToast } = useToasts();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [updateMe, { loading: isLoadingOnUpdateMe }] = useUpdateMeMutation();

  const Loader = () => {
    return (
      <div className="flex justify-center items-center">
        <BiLoaderCircle className="animate-spin" />
      </div>
    );
  };

  useEffect(() => {
    if (authUser) {
      setName(authUser.name);
      setAvatar(authUser.avatar);
    }
  }, [authUser]);

  const handleUpdateMeName = async () => {
    if (name.trim() === '') {
      addToast('Name is required', { appearance: 'error', autoDismiss: true });
      return;
    }

    const { data } = await updateMe({
      variables: {
        data: { name },
      },
    });

    if (data && data.updateMe) {
      updateUser(data.updateMe);
      addToast('Name updated successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      setIsEditingName(false);
    }
  };

  const handleUpdateMeAvatar = async () => {
    if (avatar.trim() === '') {
      addToast('Avatar is required', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    const { data } = await updateMe({
      variables: {
        data: { avatar },
      },
    });

    if (data && data.updateMe) {
      updateUser(data.updateMe);
      addToast('Avatar updated successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      setIsEditingAvatar(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { data } = await deleteMe();

      if (!data?.deleteMe) {
        throw new Error('Could not delete account');
      }

      await client.resetStore();
      window.location.href = '/';
    } catch (error) {
      addToast((error as Error).message, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="flex">
      <SideNavbar />
      {authUser && (
        <>
          <PromtModal
            title="Delete Your Account?"
            description="Are you sure you want to delete your account? This action cannot be undone."
            handleDelete={handleDeleteAccount}
            handleCancel={() => {
              setShowDeletePromt(false);
            }}
            show={showDeletePromt}
            setShow={setShowDeletePromt}
          />
        </>
      )}
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
              {isEditingName ? (
                <input
                  className="rounded w-fit bg-transparent border border-gray-500 px-2 py-1 text-gray-700"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h2 className="font-semibold text-gray-800">
                  {authUser?.name}
                </h2>
              )}
              <div className="transition-all flex">
                {isEditingName ? (
                  <>
                    <button
                      className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setIsEditingName(false)}
                      disabled={isLoadingOnUpdateMe}
                    >
                      Cancel
                    </button>
                    <div className="border border-gray-300 mx-1"></div>
                    <button
                      className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoadingOnUpdateMe}
                      onClick={handleUpdateMeName}
                    >
                      {isLoadingOnUpdateMe ? <Loader /> : 'Save'}
                    </button>
                  </>
                ) : (
                  <button
                    className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1"
                    onClick={() => setIsEditingName(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center border-b-2 border-gray-300 px-6 py-2">
              <h2 className="font-medium text-gray-600">Email</h2>
              <h2 className="font-semibold text-gray-800">{authUser?.email}</h2>
              <div>
                <button
                  className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1 cursor-not-allowed"
                  disabled
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center border-b-2 border-gray-300 px-6 py-2">
              <h2 className="font-medium text-gray-600">Avatar</h2>
              <div className="flex-1 flex justify-center items-center">
                {isEditingAvatar ? (
                  <input
                    className="rounded w-fit bg-transparent border border-gray-500 px-2 py-1 text-gray-700"
                    type="text"
                    value={avatar}
                    disabled={isLoadingOnUpdateMe}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                ) : (
                  <Image
                    src={authUser ? authUser.avatar : '/assets/defaultUser.png'}
                    height={50}
                    width={50}
                    className="rounded-full"
                    alt={authUser?.name}
                  />
                )}
              </div>
              <div className="flex transition-all">
                {isEditingAvatar ? (
                  <>
                    <button
                      className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setIsEditingAvatar(false)}
                      disabled={isLoadingOnUpdateMe}
                    >
                      Cancel
                    </button>
                    <div className="border border-gray-300 mx-1"></div>
                    <button
                      className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoadingOnUpdateMe}
                      onClick={handleUpdateMeAvatar}
                    >
                      {isLoadingOnUpdateMe ? <Loader /> : 'Save'}
                    </button>
                  </>
                ) : (
                  <button
                    className="text-blue-500 outline-none border border-transparent hover:border-blue-400 hover:bg-blue-100 transition-all rounded px-2 py-1"
                    onClick={() => setIsEditingAvatar(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="w-2/3 border border-red-500 bg-red-100 flex flex-col justify-center items-center mx-auto p-6 rounded mt-8 bg-opacity-20">
              <h1 className="font-bold text-3xl mb-5">Danger Zone</h1>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white text-sm flex items-center hover:bg-red-600 transition-all"
                onClick={() => setShowDeletePromt(true)}
              >
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
