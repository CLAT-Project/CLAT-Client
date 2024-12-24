import { Api, multipartApi } from '@/apis/axios'
import {
  IChatImageResponse,
  IChatMemoResponse,
  IChatMessag,
  IChatRoomInfoResponse,
} from '@/types/chat.types'

const getChatMessage = async (roomId: string, pageParam?: number | null) => {
  const response = await Api.get<IChatMessag>(
    `/chat?chatRoomId=${roomId}&size=30${pageParam ? `&messageId=${pageParam}` : ''}`,
  )

  return response.data
}
const postChatImageFile = async (images: FormData) => {
  const response = await multipartApi.post<IChatImageResponse[]>(
    '/api/image',
    images,
  )

  return response.data
}

const postChatRoom = async (payload: {
  roomName: string
  courseId: number
  week: number
}) => {
  const response = await Api.post('/chatRoom', payload)

  return response.data
}

const postChatMemo = async (payload: {
  messageId: number
  chatRoomId: number
  memo: string
}) => {
  const response = await Api.post('/chat/memo', payload)

  return response.data
}

const getChatMemo = async (messageId: number) => {
  const response = await Api.get(`/memo/${messageId}`)

  return response.data
}

const postChatAuth = async (payload: {
  chatRoomId: number
  roomKey: string
}) => {
  const response = await Api.post('/chatRoom/validation', payload)

  return response.data
}

const getChatMemoList = async (chatRoomId: number) => {
  const response = await Api.get<IChatMemoResponse[]>(
    `/memo/findAll/${chatRoomId}`,
  )

  return response.data
}

const getChatRoomInfo = async (chatRoomId: number) => {
  const response = await Api.get<IChatRoomInfoResponse>(
    `/chatRoom/api/${chatRoomId}`,
  )

  return response.data
}

const getChatRoomIsAuth = async (chatRoomId: number) => {
  const response = await Api.get(`/chatRoomMember/${chatRoomId}`)

  return response.data
}

const putModifyMemo = async (payload: {
  messageId: number
  memoContent: string
}) => {
  const response = await Api.put('/memo', payload)

  return response.data
}

const chatApi = {
  getChatMessage,
  postChatImageFile,
  postChatRoom,
  postChatMemo,
  getChatMemo,
  postChatAuth,
  getChatMemoList,
  getChatRoomInfo,
  getChatRoomIsAuth,
  putModifyMemo,
}

export default chatApi
