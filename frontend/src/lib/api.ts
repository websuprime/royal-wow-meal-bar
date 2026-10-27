import axios from 'axios'
import { useAdminStore } from '../store'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

export const apiClient = axios.create({
  baseURL: API_URL,
})

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    // Read directly from local storage if available
    const authState = localStorage.getItem('royal-wow-admin')
    if (authState) {
      try {
        const { state } = JSON.parse(authState)
        if (state.token) {
          config.headers.Authorization = `Bearer ${state.token}`
        }
      } catch (e) {
        console.error('Error parsing token from storage', e)
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// An expired or invalid admin token gets a 401: clear the session and send the admin back to login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const sentToken = Boolean(error.config?.headers?.Authorization)
    if (error.response?.status === 401 && sentToken && !error.config?.url?.includes('/admin/login')) {
      useAdminStore.getState().logout()
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin') {
        window.location.assign('/admin')
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
