import { CONFIG } from '@/env/env'
import axios from 'axios'

const API_BASE_URL = CONFIG.api

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong!'
    )
  }
)

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({
    url,
    method,
    data = {},
    params = {},
    headers = {},
  }: {
    url: string
    method: string
    data?: any
    params?: any
    headers?: any
    responseType?: import('axios').ResponseType
  }) => {
    try {
      const result = await axiosClient({
        url,
        method,
        baseURL: baseUrl,
        data,
        params,
        headers,
      })
      return {
        data: {
          responseData: result?.data,
          status: result?.status,
          headers: {
            contentDisposition: result?.headers['content-disposition'],
          },
        },
      }
    } catch (e) {
      return {
        error: {
          status: (e as any)?.status || (e as any)?.response?.status,
          data: e,
        },
      }
    }
  }
