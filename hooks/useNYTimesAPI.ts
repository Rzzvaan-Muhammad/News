import { showToast } from '../utils/showToast';
import { useQuery } from '@tanstack/react-query';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
import { fetchNewYorkTimes, APIParams } from '../services/apiService';
import { getSelectedCategoriesQuery, getSelectedSourcesQuery } from '../utils/getQueries';

type Params = APIParams & {
  begin_date: string;
  end_date: string;
};

export const useNYTimesAPI = (
  selectedOptions: MultiValue<Option>,
  sourceOptions: MultiValue<Option>,
  from: Date | string,
  to: Date | string,
) => {
  const params: Params = {
    q: getSelectedCategoriesQuery(selectedOptions),
    begin_date: from.toISOString().split('T')[0],
    end_date: to.toISOString().split('T')[0],
    sortBy: 'publishedAt',
    //page: 1,
    sources: getSelectedSourcesQuery(sourceOptions),
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['newyork', selectedOptions, sourceOptions, from, to],
    queryFn: () => fetchNewYorkTimes(params),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  if (error?.message) showToast(error?.message, 'error');
  return {
    nyTimesArticles: data?.data?.response?.docs?.map((doc: any) => ({
      title: doc.headline.main,
      description: doc.snippet,
      url: doc.web_url,
      publishedAt: doc.pub_date,
      urlToImage: doc.multimedia.length > 0 ? `https://www.nytimes.com/${doc.multimedia[0].url}` : '',
    })),
    isLoading,
    error,
  };
};
