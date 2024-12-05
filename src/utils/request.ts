import key from '@/const/key'
import axios from 'axios'
import { getFullServerUrl } from './url'

export const serverRequest = axios.create({
  timeout: 5000
})

export const request = axios.create({
  timeout: 5000
})

export const requestServerWithFetch = async (
  url: string,
  options: RequestInit
) => {
  const token = localStorage.getItem(key.token)

  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${JSON.parse(token)}`
    }
  }

  const baseURL = getFullServerUrl('/api')

  const response = await fetch(baseURL + url, options)

  return response
}

serverRequest.interceptors.request.use((config) => {
  const baseURL = getFullServerUrl('/api')

  config.baseURL = baseURL

  const token = localStorage.getItem(key.token)

  if (token) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`
  }

  return config
})

serverRequest.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    if (response.data.message === 'Unauthorized') {
      const token = localStorage.getItem(key.token)
      if (token && JSON.parse(token)) {
        localStorage.removeItem(key.token)
        window.location.reload()
      }
    }
    throw new Error(response.data.message)
  }

  return response
})
