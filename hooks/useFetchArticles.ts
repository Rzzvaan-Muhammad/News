import { useEffect, useState } from 'react';
import { fetchArticles } from '../services/apiService';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
export const useFetchArticles = () => {
  const [articles, setArticles] = useState([]);
    const [searchInput, setSearchInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const [sourceOptions, setSourceOptions] = useState<MultiValue<Option>>([]);
  const [date, setDate] = useState<Date>(new Date());
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const onSearchKeyword = () => {
    setSelectedOptions([{ value: searchInput, label: searchInput }]);
  }
  useEffect(() => {

    const getArticles = async () => {
      try {
        const data: any = await fetchArticles(selectedOptions,sourceOptions, date);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    getArticles();
  }, [date, selectedOptions, sourceOptions]);

  return {searchInput,onSearchKeyword, setSearchInput, handleSearchInputChange, articles,sourceOptions,setSourceOptions, selectedOptions, setSelectedOptions, date, setDate };
};
