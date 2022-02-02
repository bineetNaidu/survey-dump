import { FC } from 'react';

export const GoogleAuthBtn: FC = () => {
  return (
    <button
      className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-25 disabled:cursor-not-allowed"
      disabled
    >
      Sign in with Google
    </button>
  );
};
