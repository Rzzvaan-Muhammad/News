import { useState } from 'react';
import { fetchArticles } from '../services/apiService';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
import { useQuery } from '@tanstack/react-query';
import { showToast } from '../utils/showToast';

export const useFetchArticles = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const [sourceOptions, setSourceOptions] = useState<MultiValue<Option>>([]);
  const [date, setDate] = useState<Date>(new Date());

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchKeyword = () => {
    setSelectedOptions((prev) => [{ value: searchInput, label: searchInput }, ...prev]);
  };

  const { data: articles, error, isLoading } = useQuery({
    queryKey: ['articles', selectedOptions, sourceOptions, date],
    queryFn: () => fetchArticles(selectedOptions, sourceOptions, date), 
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
    if (error?.message) showToast(error?.message ,'error');
  
  return {
    searchInput,
    onSearchKeyword,
    setSearchInput,
    handleSearchInputChange,
    articles: articles || [],
    isLoading,
    error,
    sourceOptions,
    setSourceOptions,
    selectedOptions,
    setSelectedOptions,
    date,
    setDate,
  };
};
