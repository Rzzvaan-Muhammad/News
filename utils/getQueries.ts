import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';

export const getSelectedCategoriesQuery = (
  selectedCategories: MultiValue<Option>,
  defaultQuery: string = 'news',
): string => {
  return selectedCategories.length
    ? selectedCategories
        .map((category: Option) => category.value)
        .join(',')
        .toString()
    : defaultQuery;
};

export const getSelectedSourcesQuery = (selectedSources: MultiValue<Option>): string => {
  return selectedSources.length
    ? selectedSources
        .map((sources: Option) => sources.value)
        .join(',')
        .toString()
    : '';
};
