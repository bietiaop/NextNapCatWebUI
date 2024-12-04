import key from '@/const/key'
import axios from 'axios'

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

  const _storeURL =
    localStorage.getItem(key.storeURL) ?? '"http://localhost:6099"'
  const storeURL = JSON.parse(_storeURL)
  const baseURL = storeURL + '/api'

  const response = await fetch(baseURL + url, options)

  return response
}

serverRequest.interceptors.request.use((config) => {
  let _storeURL =
    localStorage.getItem(key.storeURL) ?? '"http://localhost:6099"'

  _storeURL = JSON.parse(_storeURL)

  const baseURL = _storeURL + '/api'

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
