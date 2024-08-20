'use client';
import React from 'react';
import { useFetchArticles } from '../../hooks/useFetchArticles';
import { MultiSelectDropdown } from '../../components/MultiSelectDropdown';
import { SkeletonCard } from '../../components/SkeletonCard';
import { categoryOptions, sourceOptions } from '../../constants/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/header';

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
    refresh,
    setRefresh,
    isSidebarOpen,
    toggleSidebar,
    sourceOptions: sourceSelectedOptions,
    searchInput,
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
        {/* Side Menu */}
        <aside
          className={`fixed top-[76px] left-0 transition-transform duration-300 ease-in-out z-20 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
          } w-64 bg-white border-r border-gray-300 p-6 h-screen overflow-y-auto`}
        >
          <h2 className="text-xl font-semibold mb-4">Personalization</h2>

          <div className="flex flex-col gap-4 mb-6">
            <label htmlFor="searchInput" className="block text-sm font-medium text-gray-700">
              Search by keywords
            </label>
            <input
              id="searchInput"
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search news..."
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={onSearchKeyword}
              disabled={!searchInput}
              className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
            >
              Search
            </button>
          </div>

          <div className="mb-6">
            <label htmlFor="categoryDropdown" className="block text-sm font-medium text-gray-700 mb-2">
              Categories
            </label>
            <MultiSelectDropdown
              id="categoryDropdown"
              refresh={refresh}
              selectedOptions={selectedOptions}
              setRefresh={setRefresh}
              options={categoryOptions}
              onChange={setSelectedOptions}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="sourceDropdown" className="block text-sm font-medium text-gray-700 mb-2">
              Sources
            </label>
            <MultiSelectDropdown
              id="sourceDropdown"
              refresh={refresh}
              selectedOptions={sourceSelectedOptions}
              setRefresh={setRefresh}
              options={sourceOptions}
              onChange={setSourceOptions}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <input
              id="dateFrom"
              type="date"
              value={date.from?.toISOString().split('T')[0]}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              min={thirtyDaysAgo?.toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate({ ...date, from: new Date(e.target.value) })}
            />
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
              To
            </label>
            <input
              id="dateTo"
              type="date"
              value={date.to?.toISOString().split('T')[0]}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
              min={thirtyDaysAgo?.toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate({ ...date, from: new Date(e.target.value) })}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={resetFields}
              disabled={disableResetButton}
              className="px-4 py-2 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`pt-[110px] p-8 transition-all duration-300 z-0 overflow-scroll`}>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {articles && articles.length > 0
              ? articles.map((article: Article, index: number) => <ArticleCard key={index} article={article} />)
              : Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        </div>
        <ToastContainer />
      </main>
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
