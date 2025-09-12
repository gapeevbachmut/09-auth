import axios from 'axios';

export const nextServer = axios.create({
  baseURL: '/api',

  // baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});
//  (const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';)
