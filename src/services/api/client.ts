import qs from 'qs'
import axios from 'axios'

export const client = axios.create({ baseURL: import.meta.env.VITE_SERVER_URL as string, withCredentials: true })

client.interceptors.request.use(async (config) => {
  config.paramsSerializer = (params) => qs.stringify(params)
  return config
})
