import React from 'react';
import { User } from '../../contexts/UserContext';

interface SideMenuProps {
  user: User;
  toggleModal: () => void;
  fetchPersonalizedData: () => void;
  searchInput: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyword: () => void;
}
export const Hero: React.FC<SideMenuProps> = ({
  user,
  toggleModal,
  fetchPersonalizedData,
  searchInput,
  handleSearchInputChange,
  onSearchKeyword,
}) => {
  return (
    <>
      <div className="w-full flex flex-row justify-between align-center mb-8 gap-0">
        <input
          id="searchInput"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search news..."
          className="px-4 py-2 md:border w-full border-gray-300 rounded-l-lg border-r-0 shadow-sm focus:outline-none"
        />
        <button
          onClick={onSearchKeyword}
          disabled={!searchInput}
          className="px-4 py-2 w-[5%] md:border border-l-gray-200 border-gray-400 rounded-r-lg text-gray-500 cursor-pointer bg-white hover:text-blue-600 hover:bg-gray-200 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-between align-center mb-8">
        <div className="flex flex-col">
          <span className="text-[32px] font-sans">Your briefing</span>
          <span className="text-[16px] text-gray-500 font-sans">
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </span>
        </div>
        <div className="mt-4">
          {user?.uid && (
            <button
              className="py-2 px-4 m-0 w-full md:w-auto border border-gray-400 rounded-3xl flex flex-row justify-between gap-2 text-[#0b57d0]"
              onClick={() => {
                toggleModal();
                fetchPersonalizedData();
              }}
            >
              Customize
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </>
  );
};
