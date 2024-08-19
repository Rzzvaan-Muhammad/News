'use client';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { UserProvider } from '../contexts/UserContext';
import { News } from '../components/News/index';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <News />
      </QueryClientProvider>
    </UserProvider>
  );
}
