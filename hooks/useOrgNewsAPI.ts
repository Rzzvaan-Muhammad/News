import { useQuery } from '@tanstack/react-query';
import { fetchOrgNews, APIParams } from '../services/apiService';
import { getSelectedCategoriesQuery, getSelectedSourcesQuery } from '../utils/getQueries';
import { showToast } from '../utils/showToast';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';

type Params = APIParams & {
  from: string;
  to: string;
};

export const useOrgNewsAPI = (
  selectedOptions: MultiValue<Option>,
  sourceOptions: MultiValue<Option>,
  from: Date | string,
  to: Date | string,
  personalizedCategories: string[],
  personalizedSources: string[],
) => {
  const params: Params = {
    q: `${getSelectedCategoriesQuery(selectedOptions)}, ${personalizedCategories?.toString()}`,
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0],
    sortBy: 'publishedAt',
    pageSize: 3,
    sources: `${getSelectedSourcesQuery(sourceOptions)}, ${personalizedSources?.toString()}`,
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['news', selectedOptions, sourceOptions, from, to, personalizedCategories, personalizedSources],
    queryFn: () => fetchOrgNews(params),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  if (error?.message) showToast(error?.message, 'error');

  return {
    orgNewsArticles: data?.data?.articles,
    isLoading,
    error,
  };
};
