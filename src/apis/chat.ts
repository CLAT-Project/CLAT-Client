import { Api, multipartApi } from '@/apis/axios'
import { IChatMessag } from '@/types/chat.types'

const getChatMessage = async (roomId: string) => {

  const response = await Api.get<IChatMessag>(`/chatRoom/${roomId}`)

  return response.data

}
const postChatImageFile = async(images: FormData) => {
  const response = await multipartApi.post('/api/image', images)

  return response.data
}
const chatApi = {
  getChatMessage,
  postChatImageFile,
}

export default chatApi
