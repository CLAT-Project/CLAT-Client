// eslint-disable-next-line import/no-cycle
import authApi from '@/apis/auth'
import { reconnectWithNewToken } from '@/libs/websocket'
import axios, { InternalAxiosRequestConfig } from 'axios'

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const multipartApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
})

export const refreshApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

/**
 * @description 요청 인터셉터
 * @description 요청 시 accessToken을 헤더에 추가
 */
Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken')

      if (accessToken) {
        // config.headers.Authorization = `Bearer ${accessToken}`
        config.headers.access = `${accessToken}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * @description 응답 인터셉터
 * @description accessToken이 만료되어 401 반환시 silentRefresh를 통해 새로운 accessToken을 발급받아 재요청
 */

Api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { config, response } = error
    if (response?.status !== 401 || config.sent) {
      return Promise.reject(error)
    }
    if (localStorage.getItem('retry') === 'true') {
      localStorage.removeItem('retry')
      return Promise.reject(error)
    }
    localStorage.setItem('retry', 'true')

    config.sent = true // 무한 재요청 방지
    const { headers } = await authApi.silentRefresh()
    const accessToken = headers.access
    if (accessToken) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken)
      }
      config.headers.access = `${accessToken}`
    }

    // 토큰 재발급 후 WebSocket 재연결
      const currentRoomId = localStorage.getItem('currentRoomId')
      if (currentRoomId) {
        reconnectWithNewToken(currentRoomId, (message) => {
          console.log('Received message:ㅇㅁㄴㅇ', message)
        })
      }

    return axios(config) // 재요청
  },
)
