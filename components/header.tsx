import React from 'react';
import { User } from '../contexts/UserContext';

type UserInfoProps = {
  user: User | null;
  handleGoogleSignIn: () => void;
  handleGoogleSignOut: () => void;
};

const UserInfo: React.FC<{
  user: User;
}> = ({ user }) => {
  return (
    <>
      <p className="text-sm">{user?.displayName}</p>
      <img src={user?.photoURL} alt={user?.displayName} className="w-8 h-8 rounded-full" />
    </>
  );
};

export const Header: React.FC<UserInfoProps> = ({ user, handleGoogleSignIn, handleGoogleSignOut }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">News Aggregator</div>
      <div className="flex items-center space-x-4">
        {user !== null ? (
          <>
            <UserInfo user={user} />
            <button
              onClick={() => handleGoogleSignOut()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </header>
  );
};
