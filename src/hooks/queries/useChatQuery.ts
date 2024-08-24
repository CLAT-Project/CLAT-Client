import chatApi from "@/apis/chat"
import { IChatMessag } from "@/types/chat.types"
import { useQuery } from "@tanstack/react-query"

export const useChatMsgQuery = ({roomId} : {
  roomId: string
}) => {
  return useQuery({
    queryKey: ['chatMsg'],
    queryFn: ()=>chatApi.getChatMessage(roomId),
    gcTime: 10000000,
    staleTime: 0,
  })
}