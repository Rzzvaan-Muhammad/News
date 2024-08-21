import React, { useState, useEffect } from 'react';
import { MultiValue } from 'react-select';
import { Option } from '../components/MultiSelectDropdown';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebaseConfig';
import { persistState, clearState, getInitialState } from '../utils/persist-state';
import { useOrgNewsAPI } from './useOrgNewsAPI';
import { useNYTimesAPI } from './useNYTimesAPI';
import { useGuardianAPI } from './useGuardianAPI';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const persistedUser: UserType | undefined = getInitialState('user');
    if (persistedUser) setUser(persistedUser);
  }, []);

  useEffect(() => {
    if (user?.uid) fetchPersonalizedData(user.uid);
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) updatePersonalizedData(user.uid);
  }, [personalizedSources, personalizedCategories, user?.uid]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

  const onSearchKeyword = () => setSelectedOptions((prev) => [{ value: searchInput, label: searchInput }, ...prev]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedInUser = result.user;
      const userInfo = extractUserInfo(loggedInUser);
      setUser(userInfo);
      persistState('user', userInfo);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await signOut(auth);
      clearState('user');
      resetPersonalization();
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
    }
  };

  const fetchPersonalizedData = async (uid: string) => {
    setIsLoading(true);
    try {
      const categoriesDoc = await getDoc(doc(db, 'personalizedCategories', uid));
      const sourcesDoc = await getDoc(doc(db, 'personalizedSources', uid));

      if (categoriesDoc.exists()) setPersonalizedCategories(categoriesDoc.data()?.categories || []);
      if (sourcesDoc.exists()) setPersonalizedSources(sourcesDoc.data()?.sources || []);
    } catch (error) {
      console.error('Error fetching personalized data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePersonalizedData = async (uid: string) => {
    if (personalizedCategories.length < 3 || personalizedSources.length < 3) {
      setIsModalOpen(true);
      return;
    }

    try {
      await setDoc(
        doc(db, 'personalizedCategories', uid),
        { categories: personalizedCategories, userId: uid },
        { merge: true },
      );
      await setDoc(doc(db, 'personalizedSources', uid), { sources: personalizedSources, userId: uid }, { merge: true });
    } catch (error) {
      console.error('Error updating Firestore:', error);
    }
  };

  const resetPersonalization = () => {
    setPersonalizedCategories([]);
    setPersonalizedSources([]);
    setUser(initialUserState);
  };

  const orgNewsArticles =
    useOrgNewsAPI(selectedOptions, sourceOptions, date.from, date.to, personalizedCategories, personalizedSources)
      ?.orgNewsArticles || [];
  const nyTimesArticles =
    useNYTimesAPI(selectedOptions, sourceOptions, date.from, date.to, personalizedCategories, personalizedSources)
      ?.nyTimesArticles || [];
  const guardianArticles =
    useGuardianAPI(selectedOptions, sourceOptions, date.from, date.to, personalizedCategories, personalizedSources)
      ?.guardianArticles || [];

  const toggleCategory = (category: string) => setPersonalizedCategories(toggleItem(personalizedCategories, category));
  const toggleSource = (source: string) => setPersonalizedSources(toggleItem(personalizedSources, source));
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const disableResetButton = selectedOptions.length === 0 && sourceOptions.length === 0;
  const resetFields = () => {
    setSourceOptions([]);
    setSelectedOptions([]);
    setDate({ from: thirtyDaysAgo, to: new Date() });
  };

  return {
    user,
    date,
    setDate,
    isLoading,
    resetFields,
    isSidebarOpen,
    toggleSidebar,
    isModalOpen,
    searchInput,
    toggleModal,
    toggleCategory,
    toggleSource,
    fetchPersonalizedData,
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
    orgNewsArticles,
    nyTimesArticles,
    articles: [...orgNewsArticles, ...nyTimesArticles, ...guardianArticles],
  };
};

const toggleItem = (items: string[], item: string) =>
  items.includes(item) ? items.filter((i) => i !== item) : [...items, item];

const extractUserInfo = (user: any): UserType => ({
  uid: user.uid,
  displayName: user.displayName || '',
  email: user.email || '',
  photoURL: user.photoURL || '',
});
