import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/apiService';

export const useFetchArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data:any = await fetchArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    getArticles();
  }, []);

  return {articles};
};
