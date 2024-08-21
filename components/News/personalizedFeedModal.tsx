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

export const PersonalizedFeedModal: React.FC<ModalProps> = ({
  isModalOpen,
  toggleModal,
  toggleCategory,
  personalizedCategories,
  toggleSource,
  personalizedSources,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <h2 className="text-xl font-semibold mb-4">Personalization</h2>
      {(personalizedCategories.length < 3 || personalizedSources.length < 3) && (
        <h3 className="text-xl text-[red] text-center font-semibold mb-4">
          Please select at least 3 categories and sources
        </h3>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg mb-1 font-medium">Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categoryOptions?.map((category) => (
              <button
                key={category.value}
                onClick={() => toggleCategory(category.value)}
                className={`px-4 py-2 rounded-lg text-white ${
                  personalizedCategories?.includes(category.value) ? 'bg-green-500' : 'bg-gray-500'
                } ${!personalizedCategories?.includes(category.value) ? 'opacity-50' : ''} flex items-center justify-between`}
              >
                {category.label}
                {personalizedCategories?.includes(category.value) && (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg mb-1 font-medium">Sources</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {sourceOptions?.map((source) => (
              <button
                key={source.value}
                onClick={() => toggleSource(source.value)}
                className={`px-4 py-2 rounded-lg text-white ${
                  personalizedSources?.includes(source.value) ? 'bg-green-500' : 'bg-gray-500'
                } ${!personalizedSources?.includes(source.value) ? 'opacity-50' : ''} flex items-center justify-between`}
              >
                {source.label}
                {personalizedSources?.includes(source.value) && (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
