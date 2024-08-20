import React, { useState, useEffect } from 'react';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebaseConfig';
import { persistState, clearState, getInitialState } from '../utils/persist-state';
import { useOrgNewsAPI } from './useOrgNewsAPI';
import { useNYTimesAPI } from './useNYTimesAPI';
import { useGuardianAPI } from './useGuardianAPI';
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
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState<UserType>(initialUserState);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>([]);
  const [sourceOptions, setSourceOptions] = useState<MultiValue<Option>>([]);
  const [personalizedCategories, setPersonalizedCategories] = useState<string[]>([]);
  const [personalizedSources, setPersonalizedSources] = useState<string[]>([]);
  const [date, setDate] = useState<{ from: Date; to: Date }>({ from: thirtyDaysAgo, to: new Date() });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchKeyword = () => {
    setSelectedOptions((prev) => [{ value: searchInput, label: searchInput }, ...prev]);
  };

  const { orgNewsArticles = [] } = useOrgNewsAPI(
    selectedOptions,
    sourceOptions,
    date.from,
    date.to,
    personalizedCategories,
    personalizedSources,
  );
  const { nyTimesArticles = [] } = useNYTimesAPI(
    selectedOptions,
    sourceOptions,
    date.from,
    date.to,
    personalizedCategories,
    personalizedSources,
  );
  const { guardianArticles = [] } = useGuardianAPI(
    selectedOptions,
    sourceOptions,
    date.from,
    date.to,
    personalizedCategories,
    personalizedSources,
  );

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
  const toggleCategory = (category: string) => {
    setPersonalizedCategories((prevSelected) =>
      prevSelected.includes(category) ? prevSelected.filter((item) => item !== category) : [...prevSelected, category],
    );
  };

  const toggleSource = (source: string) => {
    setPersonalizedSources((prevSelected) =>
      prevSelected.includes(source) ? prevSelected.filter((item) => item !== source) : [...prevSelected, source],
    );
  };
  useEffect(() => {
    if (user?.uid) {
      const persistCategories: string[] | undefined = getInitialState(`category-${user?.uid}`);
      const persistSources: string[] | undefined = getInitialState(`sources-${user?.uid}`);
      if (persistCategories) setPersonalizedCategories(persistCategories);
      if (persistSources) setPersonalizedSources(persistSources);
    }
  }, [user?.uid]);
  useEffect(() => {
    if (user?.uid) {
      if (personalizedCategories) persistState(`category-${user?.uid}`, personalizedCategories);
      if (personalizedSources) persistState(`sources-${user?.uid}`, personalizedSources);
    }
  }, [personalizedSources, personalizedCategories, user?.uid]);
  const resetFields = () => {
    setSourceOptions([]);
    setSelectedOptions([]);
    setDate({ from: thirtyDaysAgo, to: new Date() });
  };
  useEffect(() => {
    if (persistUserState) {
      setUser(persistUserState);
    }
  }, [persistUserState?.displayName]);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const disableResetButton = Boolean(selectedOptions?.length <= 0 || sourceOptions?.length <= 0);
  return {
    user,
    date,
    setDate,
    resetFields,
    isSidebarOpen,
    toggleSidebar,
    isModalOpen,
    searchInput,
    toggleModal,
    toggleCategory,
    toggleSource,
    onSearchKeyword,
    thirtyDaysAgo,
    setSearchInput,
    sourceOptions,
    setSourceOptions,
    selectedOptions,
    disableResetButton,
    personalizedSources,
    handleGoogleSignOut,
    handleGoogleSignIn,
    setSelectedOptions,
    personalizedCategories,
    handleSearchInputChange,
    articles: [...orgNewsArticles, ...nyTimesArticles, ...guardianArticles],
  };
};
