import { MultiValue } from 'react-select';
import { showToast } from '../utils/showToast';
import { useQuery } from '@tanstack/react-query';
import { Option } from '../components/MultiSelectDropdown';
import { fetchGuardiansNews, APIParams } from '../services/apiService';
import { getSelectedCategoriesQuery, getSelectedSourcesQuery } from '../utils/getQueries';

type Params = APIParams & {
  'from-date': string;
  'to-date': string;
  'order-by': string;
};

export const useGuardianAPI = (
  selectedOptions: MultiValue<Option>,
  sourceOptions: MultiValue<Option>,
  from: Date | string,
  to: Date | string,
  personalizedCategories: string[],
  personalizedSources: string[],
) => {
  const params: Params = {
    q: personalizedCategories.length
      ? `${getSelectedCategoriesQuery(selectedOptions)}, ${personalizedCategories?.toString()}`
      : `${getSelectedCategoriesQuery(selectedOptions)}`,
    'from-date': from.toISOString().split('T')[0],
    'to-date': to.toISOString().split('T')[0],
    'order-by': 'relevance',
    pageSize: 3,
    sources:
      personalizedSources.length >= 3
        ? `${personalizedSources?.toString()} , ${getSelectedSourcesQuery(sourceOptions)}`
        : getSelectedSourcesQuery(sourceOptions),
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['guardian', selectedOptions, sourceOptions, from, to, personalizedCategories, personalizedSources],
    queryFn: () => fetchGuardiansNews(params),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  if (error?.message) showToast(error?.message, 'error');

  return {
    guardianArticles: data?.data?.response?.results?.map((doc: any) => ({
      title: doc.webTitle,
      description: '',
      url: doc.webUrl,
      publishedAt: doc.webPublicationDate,
      urlToImage: '',
    })),
    isLoading,
    error,
  };
};
