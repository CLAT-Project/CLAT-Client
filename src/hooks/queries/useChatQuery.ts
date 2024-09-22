import chatApi from '@/apis/chat'
import { useQuery } from '@tanstack/react-query'

export const useChatMsgQuery = ({ roomId }: { roomId: string }) => {
  return useQuery({
    queryKey: ['chatMsg'],
    queryFn: () => chatApi.getChatMessage(roomId),
    gcTime: 0,
    staleTime: 0,
  })
}


export const useChatMemoQuery = (messageId: number) => {
  return useQuery({
    queryKey: ['chatMemo', messageId],
    queryFn: () => chatApi.getChatMemo(messageId),
    enabled: !!messageId
  })
}

export const useChatMemoListQuery = (chatRoomId: number) => {
  return useQuery({
    queryKey: ['chatMemoList', chatRoomId],
    queryFn: () => chatApi.getChatMemoList(chatRoomId)
  })
}