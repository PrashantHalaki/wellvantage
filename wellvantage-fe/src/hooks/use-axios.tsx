/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';

import { API_BASE_URL } from '@/utils/const';
import { getSessionToken } from '@/utils/getToken';

const baseURL = API_BASE_URL;

// Custom Hook
export const useAxios = (): AxiosInstance => {
  const navigate = useNavigate();

  const axiosInstance = useMemo(() => {
    const token = getSessionToken();
    const instance = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    instance.interceptors.response.use(
      (res: any) => {
        return res;
      },
      (err: any) => {
        console.error('Error in API response: ', err);

        // Only navigate if it's an auth error and we're not already on an auth page
        if (err.response?.status === 401 && !window.location.pathname.includes('/signup')) {
          console.log('Auth error detected, redirecting to signup');
          localStorage.clear();
          navigate('/signup');
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, [navigate]);

  return axiosInstance;
};
