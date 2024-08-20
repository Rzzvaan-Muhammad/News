'use client';
import React from 'react';
import { useFetchArticles } from '../../hooks/useFetchArticles';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/header';
import { SideMenu } from '../SideMenu';
import { PersonalizedFeedModal } from './personalizedFeedModal';
interface ArticleSource {
  id: string | null;
  name: string;
}
interface Article {
  source: ArticleSource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export function News() {
  const {
    user,
    date,
    setDate,
    articles,
    thirtyDaysAgo,
    resetFields,
    isSidebarOpen,
    toggleSidebar,
    sourceOptions: sourceSelectedOptions,
    searchInput,
    isModalOpen,
    toggleModal,
    toggleCategory,
    toggleSource,
    personalizedCategories,
    personalizedSources,
    onSearchKeyword,
    selectedOptions,
    setSourceOptions,
    disableResetButton,
    setSelectedOptions,
    handleGoogleSignIn,
    handleGoogleSignOut,
    handleSearchInputChange,
  } = useFetchArticles();

  return (
    <>
      <Header
        user={user}
        toggleSidebar={toggleSidebar}
        handleGoogleSignIn={handleGoogleSignIn}
        handleGoogleSignOut={handleGoogleSignOut}
      />
      <main className=" min-h-screen bg-gray-100">
        <SideMenu
          date={date}
          setDate={setDate}
          searchInput={searchInput}
          toggleModal={toggleModal}
          resetFields={resetFields}
          isSidebarOpen={isSidebarOpen}
          thirtyDaysAgo={thirtyDaysAgo}
          selectedOptions={selectedOptions}
          onSearchKeyword={onSearchKeyword}
          setSourceOptions={setSourceOptions}
          setSelectedOptions={setSelectedOptions}
          disableResetButton={disableResetButton}
          sourceSelectedOptions={sourceSelectedOptions}
          handleSearchInputChange={handleSearchInputChange}
        />

        <div className={`pt-[110px] p-8 transition-all duration-300 z-0 overflow-scroll`}>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {articles && articles.length > 0
              ? articles.map((article: Article, index: number) => <ArticleCard key={index} article={article} />)
              : Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        </div>
        <ToastContainer />
      </main>
      <PersonalizedFeedModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        toggleCategory={toggleCategory}
        toggleSource={toggleSource}
        personalizedSources={personalizedSources}
        personalizedCategories={personalizedCategories}
      />
    </>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="w-full h-64 object-cover" />}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{article.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <button className="text-blue-600 hover:text-blue-800 font-medium">Read More</button>
          </a>
        </div>
      </div>
    </div>
  );
}
