import chatApi from '@/apis/chat'
import { useQuery } from '@tanstack/react-query'

const useChatMsgQuery = ({ roomId }: { roomId: string }) => {
  return useQuery({
    queryKey: ['chatMsg'],
    queryFn: () => chatApi.getChatMessage(roomId),
    gcTime: 0,
    staleTime: 0,
  })
}

export default useChatMsgQuery
