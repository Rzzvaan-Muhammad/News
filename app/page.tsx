"use client"
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import News from '../components/News';
const queryClient = new QueryClient();
export default function Home() {

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return (
       <QueryClientProvider client={queryClient}>
       <News />
      </QueryClientProvider>
  );
}
