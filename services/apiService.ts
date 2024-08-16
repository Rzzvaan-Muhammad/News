import axios from 'axios';

export const fetchArticles = async () => {
  const apiEndpoints = [
    {
      url: process.env.NEXT_PUBLIC_NEWS_API_ORG_BASE_URL,
      params: {
        q: 'tesla',
        from: '2024-07-16',
        sortBy: 'publishedAt',
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY
      }
    },
    {
      url: process.env.NEXT_PUBLIC_NY_TIMES_BASE_URL,
      params: {
        q: 'election',
        'api-key': process.env.NEXT_PUBLIC_NY_TIMES_API_KEY
      }
    },
    {
      url: process.env.NEXT_PUBLIC_GUARDIAN_APIS_BASE_URL,
      params: {
        page: 2,
        q: 'debate',
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY
      }
    }
  ];

  const responses = await Promise.all(
    apiEndpoints.map((endpoint:any) => axios.get(endpoint.url, { params: endpoint.params }))
  );

  const combinedArticles = responses?.flatMap(response => {
    if (response.data.articles) {
      return response.data.articles;
    } else if (response.data.response && response.data.response.results) {
      return response.data.response.results.map((doc:any) => ({
        title: doc.webTitle,
        description: '',
        url: doc.webUrl,
        publishedAt: doc.webPublicationDate,
        urlToImage: ''
      }));
    } else if (response.data.response && response.data.response.docs) {
      return response.data.response.docs.map((doc:any) => ({
        title: doc.headline.main,
        description: doc.snippet,
        url: doc.web_url,
        publishedAt: doc.pub_date,
        urlToImage: doc.multimedia.length > 0 ? `https://www.nytimes.com/${doc.multimedia[0].url}` : ''
      }));
    } else {
      return [];
    }
  });

  return combinedArticles;
};
