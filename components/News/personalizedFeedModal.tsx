import React from 'react';
import { Modal } from '../Modal';
import { sourceOptions, categoryOptions } from '../../constants/index';

interface ModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  toggleSource: (source: string) => void;
  toggleCategory: (category: string) => void;
  personalizedCategories: string[];
  personalizedSources: string[];
}

interface OptionButtonProps {
  label: string;
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({ label, value, isSelected, onClick }) => (
  <button
    key={value}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white ${isSelected ? 'bg-green-500' : 'bg-gray-500'} ${
      !isSelected ? 'opacity-50' : ''
    } flex items-center justify-between`}
  >
    {label}
    {isSelected && <CheckIcon />}
  </button>
);

const CheckIcon: React.FC = () => (
  <svg
    className="w-5 h-5 ml-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

export const PersonalizedFeedModal: React.FC<ModalProps> = ({
  isModalOpen,
  toggleModal,
  toggleCategory,
  personalizedCategories,
  toggleSource,
  personalizedSources,
}) => {
  const renderOptionButtons = (
    options: { label: string; value: string }[],
    personalizedSelections: string[],
    toggleFunction: (value: string) => void,
  ) =>
    options.map((option) => (
      <OptionButton
        key={option.value}
        label={option.label}
        value={option.value}
        isSelected={personalizedSelections.includes(option.value)}
        onClick={() => toggleFunction(option.value)}
      />
    ));

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <h2 className="text-xl font-semibold mb-4">Personalization</h2>
      {(personalizedCategories.length < 3 || personalizedSources.length < 3) && (
        <h3 className="text-xl text-red-500 text-center font-semibold mb-4">
          Please select at least 3 categories and sources
        </h3>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg mb-1 font-medium">Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {renderOptionButtons(categoryOptions, personalizedCategories, toggleCategory)}
          </div>
        </div>

        <div>
          <h3 className="text-lg mb-1 font-medium">Sources</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {renderOptionButtons(sourceOptions, personalizedSources, toggleSource)}
          </div>
        </div>
      </div>
    </Modal>
  );
};
