'use client';
import React from 'react';
import { useFetchArticles } from '../../hooks/useFetchArticles';
import { MultiSelectDropdown } from '../../components/MultiSelectDropdown';
import { SkeletonCard } from '../../components/SkeletonCard';
import { categoryOptions, sourceOptions } from '../../constants/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/header';
export function News() {
  const {
    searchInput,
    onSearchKeyword,
    isLoading,
    handleSearchInputChange,
    handleGoogleSignIn,
    handleGoogleSignOut,
    user,
    articles,
    setSelectedOptions,
    date,
    setDate,
    setSourceOptions,
  } = useFetchArticles();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return (
    <>
      <Header user={user} handleGoogleSignIn={handleGoogleSignIn} handleGoogleSignOut={handleGoogleSignOut} />
      <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row flex-1 w-full gap-0 sm:gap-4">
            <MultiSelectDropdown options={categoryOptions} onChange={setSelectedOptions} />
            <MultiSelectDropdown options={sourceOptions} onChange={setSourceOptions} />
            <div className="flex flex-row flex-1 w-full gap-4 mb-5 sm:md-0 h-auto sm:h-[38px]">
              <input
                type="date"
                value={date?.toISOString().split('T')[0]}
                className="px-2 py-0 border border-gray-300 rounded-lg h-[38px] w-full"
                min={thirtyDaysAgo?.toISOString().split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDate(new Date(e?.target?.value))}
              />
            </div>
          </div>
          <div className="flex flex-row w-full gap-4 mb-4">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search news..."
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            />
            <button
              onClick={onSearchKeyword}
              disabled={!searchInput}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles && !isLoading && articles.length > 0
              ? articles.map((article: any, index: number) => <ArticleCard key={index} article={article} />)
              : Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}

interface Article {
  urlToImage: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover p-4" />
      <div className="p-4">
        <h2 className="text-lg font-bold h-[80px] overflow-scroll mb-2">{article.title}</h2>
        <p className="text-gray-700 h-[120px] overflow-scroll mb-4">{article.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleString()}</span>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            <button className="text-blue-500 hover:underline">Read More</button>
          </a>
        </div>
      </div>
    </div>
  );
}
