import { FC } from 'react';
import { signIn } from 'next-auth/react';

export const GoogleAuthBtn: FC = () => {
  return (
    <button
      className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={() => signIn('google')}
    >
      Sign in with Google
    </button>
  );
};
