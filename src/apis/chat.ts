import { Api } from '@/apis/axios'
import { IChatMessag } from '@/types/chat.types'

const getChatMessage = async (roomId: string) => {
  const accessToken = localStorage.getItem('accessToken')

  const response = await Api.get<IChatMessag>(`/chatRoom/${roomId}`, {
    headers: {
      access: `${accessToken}`,
    },
  })

  return response.data

}
const chatApi = {
  getChatMessage,
}

export default chatApi
