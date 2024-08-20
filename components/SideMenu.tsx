import React, { Dispatch, SetStateAction } from 'react';
import { MultiSelectDropdown } from '../components/MultiSelectDropdown';
import { categoryOptions, sourceOptions, Option } from '../constants/index';
import { MultiValue } from 'react-select';
interface SideMenuProps {
  isSidebarOpen: boolean;
  date: { from: Date | null; to: Date | null };
  setDate: Dispatch<SetStateAction<{ from: Date; to: Date }>>;
  thirtyDaysAgo: Date;
  selectedOptions: MultiValue<Option>;
  setSelectedOptions: Dispatch<SetStateAction<MultiValue<Option>>>;
  sourceSelectedOptions: MultiValue<Option>;
  setSourceOptions: Dispatch<SetStateAction<MultiValue<Option>>>;
  searchInput: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyword: () => void;
  resetFields: () => void;
  disableResetButton: boolean;
  toggleModal: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isSidebarOpen,
  date,
  toggleModal,
  setDate,
  thirtyDaysAgo,
  selectedOptions,
  setSelectedOptions,
  sourceSelectedOptions,
  setSourceOptions,
  searchInput,
  handleSearchInputChange,
  onSearchKeyword,
  resetFields,
  disableResetButton,
}) => {
  return (
    <aside
      className={`fixed top-[76px] left-0 transition-transform duration-300 ease-in-out z-20 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
      } w-64 bg-white border-r border-gray-300 p-6 h-screen overflow-y-auto`}
    >
      <div className="flex flex-row w-full justify-between align-center pb-4">
        <span className="text-xl font-semibold">Personalization</span>
        <button className="p-0 m-0" onClick={() => toggleModal()}>
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
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
          Search by keywords
        </label>
        <input
          id="searchInput"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search news..."
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={onSearchKeyword}
          disabled={!searchInput}
          className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
        >
          Search
        </button>
      </div>

      <div className="mb-6">
        <label htmlFor="categoryDropdown" className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <MultiSelectDropdown
          id="categoryDropdown"
          selectedOptions={selectedOptions}
          options={categoryOptions}
          onChange={setSelectedOptions}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="sourceDropdown" className="block text-sm font-medium text-gray-700 mb-2">
          Sources
        </label>
        <MultiSelectDropdown
          id="sourceDropdown"
          selectedOptions={sourceSelectedOptions}
          options={sourceOptions}
          onChange={setSourceOptions}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-2">
          From
        </label>
        <input
          id="dateFrom"
          type="date"
          value={date.from?.toISOString().split('T')[0]}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
          min={thirtyDaysAgo?.toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate({ ...date, from: new Date(e.target.value) })}
        />
        <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
          To
        </label>
        <input
          id="dateTo"
          type="date"
          value={date.to?.toISOString().split('T')[0]}
          className="px-4 py-2 border border-gray-300 rounded-lg w-full"
          min={thirtyDaysAgo?.toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate({ ...date, to: new Date(e.target.value) })}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={resetFields}
          disabled={disableResetButton}
          className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </aside>
  );
};
