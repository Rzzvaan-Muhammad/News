import { useQuery } from '@tanstack/react-query';
import { fetchOrgNews, APIParams } from '../services/apiService';
import { getSelectedCategoriesQuery, getSelectedSourcesQuery } from '../utils/getQueries';
import { showToast } from '../utils/showToast';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';

type Params = APIParams & {
  from: string;
  to: string;
  domains: string;
  language: string;
};

export const useOrgNewsAPI = (
  selectedOptions: MultiValue<Option>,
  sourceOptions: MultiValue<Option>,
  from: Date | string,
  to: Date | string,
  personalizedCategories: string[],
  personalizedSources: string[],
) => {
  const buildQueryParams = (): Params => ({
    q: getSelectedCategoriesQuery(selectedOptions),
    from: new Date(from).toISOString().split('T')[0],
    to: new Date(to).toISOString().split('T')[0],
    sortBy: 'popularity',
    domains: personalizedCategories.join(', '),
    language: 'en',
    sources: [
      personalizedSources.length >= 3 ? personalizedSources.join(', ') : '',
      getSelectedSourcesQuery(sourceOptions),
    ]
      .filter(Boolean)
      .join(', '),
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['news', selectedOptions, sourceOptions, from, to, personalizedCategories, personalizedSources],
    queryFn: () => fetchOrgNews(buildQueryParams()),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  if (error?.message) showToast(error.message, 'error');

  return {
    orgNewsArticles: data?.data?.articles || [],
    isLoading,
    error,
  };
};
