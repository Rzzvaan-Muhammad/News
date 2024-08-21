'use client';
import React from 'react';
import { News } from '../components/News/index';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <News />
    </QueryClientProvider>
  );
}
