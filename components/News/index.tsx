'use client';
import React from 'react';
import { useFetchArticles } from '../../hooks/useFetchArticles';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../../components/header';
import { SideMenu } from '../SideMenu';
import { PersonalizedFeedModal } from './personalizedFeedModal';
import { useDeviceType } from '../../hooks/useDeviceType';
import { Hero } from './hero';
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
    isLoading,
    orgNewsArticles,
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
    nyTimesArticles,
    personalizedCategories,
    personalizedSources,
    onSearchKeyword,
    selectedOptions,
    setSourceOptions,
    disableResetButton,
    setSelectedOptions,
    handleGoogleSignIn,
    fetchPersonalizedData,
    handleGoogleSignOut,
    handleSearchInputChange,
  } = useFetchArticles();
  const sm = useDeviceType(1200);
  return (
    <>
      <Header
        user={user}
        toggleSidebar={toggleSidebar}
        handleGoogleSignIn={handleGoogleSignIn}
        handleGoogleSignOut={handleGoogleSignOut}
      />
      <main className=" min-h-screen max-w-7xl mx-auto">
        <SideMenu
          date={date}
          user={user}
          setDate={setDate}
          toggleModal={toggleModal}
          resetFields={resetFields}
          isSidebarOpen={isSidebarOpen}
          thirtyDaysAgo={thirtyDaysAgo}
          selectedOptions={selectedOptions}
          setSourceOptions={setSourceOptions}
          setSelectedOptions={setSelectedOptions}
          disableResetButton={disableResetButton}
          sourceSelectedOptions={sourceSelectedOptions}
        />
        <div className={`pt-[110px] p-8 transition-all duration-300 z-0 overflow-scroll`}>
          <Hero
            user={user}
            searchInput={searchInput}
            toggleModal={toggleModal}
            onSearchKeyword={onSearchKeyword}
            fetchPersonalizedData={fetchPersonalizedData}
            handleSearchInputChange={handleSearchInputChange}
          />
          <div className={`flex ${sm ? 'flex-col' : 'flex-row'} justify-between lg:gap-4 align-top w-full`}>
            <div className="flex flex-col rounded-3xl bg-[#fff] w-full p-[16px] lg:max-w-3xl lg:mx-auto  min-w-[60%] mr-auto mb-8">
              <div className="mb-[16px] p-[16px] border-b">
                <span className="text-[24px] text-blue-600">{`Top stories`}</span>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className={sm ? 'w-full' : 'border-b lg:border-b-0 lg:w-[50%]'}>
                  {articles[4] && <ArticleCard article={articles[4]} sm={sm} />}
                </div>
                <div className="lg:w-[50%]">
                  {orgNewsArticles?.length > 0 ? (
                    orgNewsArticles
                      ?.slice(0, 3)
                      .map((article: Article, index: number) => (
                        <ArticleCard key={index} sm={sm} size="" article={article} />
                      ))
                  ) : (
                    <div className="flex flex-col">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col rounded-3xl bg-[#fff] ${sm ? 'w-full' : 'w-[40%] min-w-[40%]'} p-[16px] lg:max-w-3xl lg:mx-auto mr-auto mb-8`}
            >
              <div className="mb-[16px] p-[16px] border-b">
                <span className="text-[24px] text-blue-600">{`Picks for you`}</span>
              </div>
              <div className="flex flex-col">
                {nyTimesArticles?.length > 0 ? (
                  nyTimesArticles
                    ?.slice(0, 3)
                    .map((article: Article, index: number) => (
                      <ArticleCard sm={sm} key={index} size="small" article={article} />
                    ))
                ) : (
                  <div className="flex flex-col">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {articles && articles.length > 0
              ? articles.map((article: Article, index: number) => (
                  <ArticleCard sm={sm} key={index} size="small" article={article} />
                ))
              : Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        </div>
        <ToastContainer />
      </main>
      <PersonalizedFeedModal
        isLoading={isLoading}
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

function ArticleCard({ article, size = 'big', sm }: { article: Article; size?: string; sm: boolean }) {
  return (
    <div
      className={`flex ${sm ? 'flex-col' : 'flex-row'} bg-white ${size == 'big' ? 'rounded-lg' : 'flex-row pl-4'} rounded-xl overflow-hidden`}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className={`${size == 'big' ? ' rounded-3xl h-64' : `${size == 'medium' || size == 'small' ? 'h-40 md:h-20 w-full md:w-20 mt-[15px] rounded-md' : 'hidden'} `} object-cover`}
        />
      )}
      <div className={'p-6'}>
        <h2 className="text-[16px] text-left font-semibold mb-2">{article.author}</h2>
        <a
          className={`text-gray-600 hover:text-blue-800 font-medium mb-4 ${size == 'big' ? 'text-[1.25rem]' : 'text-[0.80rem]'}`}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.title}
        </a>
        {size == 'medium' && <p className="text-gray-400 mb-4 text-[0.70rem] line-clamp-3">{article.description}</p>}
        <div className="flex items-center justify-between text-sm mt-2 text-gray-500">
          <span className="text-[0.70rem]">{new Date(article.publishedAt).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
