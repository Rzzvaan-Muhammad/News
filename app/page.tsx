"use client";
import { useFetchArticles } from '../hooks/useFetchArticles';
export default function Home() {
const {articles} = useFetchArticles();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg ">
              <img
                src={article?.urlToImage}
                alt={article?.title}
                className="w-full h-48 object-cover p-4"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold h-[80px] overflow-scroll mb-2">{article?.title}</h2>
                <p className="text-gray-700 h-[120px] overflow-scroll mb-4">{article?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article?.publishedAt).toLocaleString()}
                  </span>
                  <a href={article?.url} target="_blank" rel="noopener noreferrer">
                    <button className="text-blue-500 hover:underline">Read More</button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
