import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/apiService';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
import { useQuery } from '@tanstack/react-query';
import { showToast } from '../utils/showToast';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebaseConfig';
import { persistState, clearState, getInitialState } from '../utils/persist-state';

interface UserType {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}
const initialUserState: UserType = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
};

export const useFetchArticles = () => {
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState<UserType>(initialUserState);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const [sourceOptions, setSourceOptions] = useState<MultiValue<Option>>([]);
  const [date, setDate] = useState<Date>(new Date());

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchKeyword = () => {
    setSelectedOptions((prev) => [{ value: searchInput, label: searchInput }, ...prev]);
  };

  const {
    data: articles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['articles', selectedOptions, sourceOptions, date],
    queryFn: () => fetchArticles(selectedOptions, sourceOptions, date),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  if (error?.message) showToast(error?.message, 'error');

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      const userInfo: UserType = {
        uid: loggedInUser.uid,
        displayName: loggedInUser.displayName || '',
        email: loggedInUser.email || '',
        photoURL: loggedInUser.photoURL || '',
      };
      setUser(userInfo);
      persistState('user', userInfo);
      console.log('User Info:', userInfo);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      clearState('user');
      console.log('User signed out successfully.');
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
    } finally {
      setUser(initialUserState);
    }
  };
  const persistUserState: UserType | undefined = getInitialState('user');

  useEffect(() => {
    if (persistUserState) {
      setUser(persistUserState);
    }
  }, [persistUserState?.displayName]);

  return {
    user,
    searchInput,
    handleGoogleSignOut,
    handleGoogleSignIn,
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
