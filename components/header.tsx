import React, { useState } from 'react';
import { User } from '../contexts/UserContext';

type UserInfoProps = {
  user: User;
  toggleSidebar: () => void;
  handleGoogleSignIn: () => void;
  handleGoogleSignOut: () => void;
};

const UserInfo: React.FC<{
  user: User;
}> = ({ user }) => {
  return (
    <div className="flex items-center space-x-2 justify-between md:justify-end">
      <p className="text-sm">{user?.displayName}</p>
      <img src={user?.photoURL} alt={user?.displayName} className="w-8 h-8 rounded-full" />
    </div>
  );
};

export const Header: React.FC<UserInfoProps> = ({ user, handleGoogleSignIn, handleGoogleSignOut, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header
      className="flex flex-col md:flex-row justify-between p-4 bg-gray-800 text-white fixed w-full"
      style={{ zIndex: 1000 }}
    >
      <div className="text-lg font-bold flex justify-between md:justify-center items-center w-full md:w-auto">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="bg-gray-800 text-white p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </button>
        News Aggregator
        {/* Mobile view */}
        <div className="md:hidden relative">
          <button onClick={handleDropdownToggle} className="flex items-center space-x-2 text-white focus:outline-none">
            <>
              {user?.uid && <div className="hidden md:block">{user?.uid && <UserInfo user={user} />}</div>}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={`w-6 h-6 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 9l-7.5 7.5L4.5 9" />
              </svg>
            </>
          </button>
          {isDropdownOpen && (
            <div className="fixed left-0 top-20 h-20 w-full bg-white text-gray-800 rounded-lg shadow-lg">
              <div className="px-4 py-2">{user?.uid && <UserInfo user={user} />}</div>
              {user?.uid ? (
                <button
                  onClick={() => handleGoogleSignOut()}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={handleGoogleSignIn}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Sign in with Google
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex items-center space-x-4">
        {user?.uid ? (
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
