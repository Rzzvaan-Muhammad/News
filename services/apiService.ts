import axios from 'axios';

export interface APIParams {
  q: string;
  from?: string;
  sortBy: string;
  sources: string;
  apiKey?: string;
  pageSize?: number;
}
export const fetchOrgNews = async (params: APIParams) => {
  return await axios.get(process.env.NEXT_PUBLIC_NEWS_API_ORG_BASE_URL || '', {
    params: { ...params, apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY },
  });
};

export const fetchNewYorkTimes = async (params: APIParams) => {
  return await axios.get(process.env.NEXT_PUBLIC_NY_TIMES_BASE_URL || '', {
    params: { ...params, 'api-key': process.env.NEXT_PUBLIC_NY_TIMES_API_KEY },
  });
};

export const fetchGuardiansNews = async (params: APIParams) => {
  return await axios.get(process.env.NEXT_PUBLIC_GUARDIAN_APIS_BASE_URL || '', {
    params: { ...params, 'api-key': process.env.NEXT_PUBLIC_GUARDIAN_API_KEY },
  });
};
