"use client"
import { useFetchArticles } from '../hooks/useFetchArticles';
import { MultiSelectDropdown } from '../components/MultiSelectDropdown';
import { SkeletonCard } from '../components/SkeletonCard';
import {categoryOptions, sourceOptions} from '../constants/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  const { articles, setSelectedOptions, date, setDate, setSourceOptions }: any = useFetchArticles();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <div className="w-full max-w-5xl">
        <div className="flex flex-row flex-1 w-full gap-4">
          <MultiSelectDropdown options={categoryOptions} onChange={setSelectedOptions} />
          <MultiSelectDropdown options={sourceOptions} onChange={setSourceOptions} />
          <div className="flex flex-row flex-1 w-full gap-4 h-[38px]">
            <input
              type="date"
              value={date.toISOString().split('T')[0]}
              className="px-2 py-0 border border-gray-300 rounded-lg w-full"
              min={thirtyDaysAgo.toISOString().split('T')[0]}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles && articles.length > 0 ? (
            articles.map((article: any, index: number) => (
              <ArticleCard key={index} article={article} />
            ))
          ) : (
            Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
          )}
        </div>
      </div>
      <ToastContainer />
    </main>
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
