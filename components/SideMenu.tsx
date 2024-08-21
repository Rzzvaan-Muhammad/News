import React, { Dispatch, SetStateAction } from 'react';
import { MultiSelectDropdown } from '../components/MultiSelectDropdown';
import { categoryOptions, sourceOptions, Option } from '../constants/index';
import { MultiValue } from 'react-select';
import { User } from '../constants/index';

interface SideMenuProps {
  user: User;
  isSidebarOpen: boolean;
  date: { from: Date | null; to: Date | null };
  setDate: Dispatch<SetStateAction<{ from: Date; to: Date }>>;
  thirtyDaysAgo: Date;
  selectedOptions: MultiValue<Option>;
  setSelectedOptions: Dispatch<SetStateAction<MultiValue<Option>>>;
  sourceSelectedOptions: MultiValue<Option>;
  setSourceOptions: Dispatch<SetStateAction<MultiValue<Option>>>;
  resetFields: () => void;
  disableResetButton: boolean;
  toggleModal: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  isSidebarOpen,
  date,
  setDate,
  thirtyDaysAgo,
  selectedOptions,
  setSelectedOptions,
  sourceSelectedOptions,
  setSourceOptions,
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
          onChange={(e) => setDate({ from: new Date(e.target.value), to: date?.to || new Date() })}
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
          onChange={(e) => setDate({ ...date, to: new Date(e.target.value), from: date?.from || thirtyDaysAgo })}
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
