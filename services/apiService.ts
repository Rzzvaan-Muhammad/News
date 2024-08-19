import axios, { AxiosResponse } from 'axios';
import { Option } from '../components/MultiSelectDropdown';
import { MultiValue } from 'react-select';
interface Article {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  urlToImage: string;
}

interface ApiEndpoint {
  url: string;
  params: Record<string, any>;
}

export const fetchArticles = async (
  selectedCategories: MultiValue<Option>,
  selectedSources: MultiValue<Option>,
  date?: Date | string,
): Promise<Article[]> => {
  const apiEndpoints: ApiEndpoint[] = [
    {
      url: process.env.NEXT_PUBLIC_NEWS_API_ORG_BASE_URL || '',
      params: {
        q: getSelectedCategoriesQuery(selectedCategories),
        from: date,
        sortBy: 'publishedAt',
        sources: getSelectedSourcesQuery(selectedSources),
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    },
    {
      url: process.env.NEXT_PUBLIC_NY_TIMES_BASE_URL || '',
      params: {
        q: getSelectedCategoriesQuery(selectedCategories),
        from: date,
        sources: getSelectedSourcesQuery(selectedSources),
        'api-key': process.env.NEXT_PUBLIC_NY_TIMES_API_KEY,
      },
    },
    {
      url: process.env.NEXT_PUBLIC_GUARDIAN_APIS_BASE_URL || '',
      params: {
        q: getSelectedCategoriesQuery(selectedCategories),
        from: date,
        sources: getSelectedSourcesQuery(selectedSources),
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY,
      },
    },
  ];

  try {
    const responses: AxiosResponse<any>[] = await Promise.all(
      apiEndpoints.map((endpoint: ApiEndpoint) => axios.get(endpoint.url, { params: endpoint.params })),
    );

    const combinedArticles: Article[] = responses.flatMap((response: AxiosResponse<any>) => {
      if (response.data.articles) {
        return response.data.articles;
      } else if (response.data.response && response.data.response.results) {
        return response.data.response.results.map((doc: any) => ({
          title: doc.webTitle,
          description: '',
          url: doc.webUrl,
          publishedAt: doc.webPublicationDate,
          urlToImage: 'https://picsum.photos/300',
        }));
      } else if (response.data.response && response.data.response.docs) {
        return response.data.response.docs.map((doc: any) => ({
          title: doc.headline.main,
          description: doc.snippet,
          url: doc.web_url,
          publishedAt: doc.pub_date,
          urlToImage: doc.multimedia.length > 0 ? `https://www.nytimes.com/${doc.multimedia[0].url}` : '',
        }));
      } else {
        return [];
      }
    });

    return combinedArticles;
  } catch (error: any) {
    console.error('API request failed:', error);
    throw new Error('Failed to fetch articles. Please try again later.');
  }
};

const getSelectedCategoriesQuery = (selectedCategories: MultiValue<Option>, defaultQuery: string = 'news'): string => {
  return selectedCategories.length
    ? selectedCategories
        .map((category: Option) => category.value)
        .join(',')
        .toString()
    : defaultQuery;
};

const getSelectedSourcesQuery = (selectedSources: MultiValue<Option>): string => {
  return selectedSources.length
    ? selectedSources
        .map((sources: Option) => sources.value)
        .join(',')
        .toString()
    : '';
};
