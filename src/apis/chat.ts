import { Api } from "@/apis/axios"
import { IChatMessag } from "@/types/chat.types";

const getChatMessage = async(roomId: string) => {
  const response = await Api.get<IChatMessag[]>(`/chatRoom/${roomId}`);
  
  return response.data;
}

const chatApi = {
  getChatMessage,
}

export default chatApi