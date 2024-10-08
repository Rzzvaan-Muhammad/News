import { showToast } from '../utils/showToast';
import { useQuery } from '@tanstack/react-query';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
import { fetchNewYorkTimes, APIParams } from '../services/apiService';
import { getSelectedCategoriesQuery, getSelectedSourcesQuery } from '../utils/getQueries';

type Params = APIParams & {
  begin_date: string;
  end_date: string;
  sort: string;
};

export const useNYTimesAPI = (
  selectedOptions: MultiValue<Option>,
  sourceOptions: MultiValue<Option>,
  from: Date | string,
  to: Date | string,
  personalizedCategories: string[],
  personalizedSources: string[],
) => {
  const buildQueryParams = (): Params => ({
    q: [getSelectedCategoriesQuery(selectedOptions), personalizedCategories.join(', ')].filter(Boolean).join(', '),
    begin_date: new Date(from).toISOString().split('T')[0],
    end_date: new Date(to).toISOString().split('T')[0],
    sort: 'relevance',
    sources: [
      personalizedSources.length >= 3 ? personalizedSources.join(', ') : '',
      getSelectedSourcesQuery(sourceOptions),
    ]
      .filter(Boolean)
      .join(', '),
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['newyork', selectedOptions, sourceOptions, from, to, personalizedCategories, personalizedSources],
    queryFn: () => fetchNewYorkTimes(buildQueryParams()),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  if (error?.message) showToast(error.message, 'error');

  const nyTimesArticles =
    data?.data?.response?.docs?.map((doc: any) => ({
      title: doc.headline.main,
      description: doc.snippet,
      url: doc.web_url,
      publishedAt: doc.pub_date,
      urlToImage: doc.multimedia.length > 0 ? `https://www.nytimes.com/${doc.multimedia[0].url}` : '',
    })) || [];

  return { nyTimesArticles, isLoading, error };
};
