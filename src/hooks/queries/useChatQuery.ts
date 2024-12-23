import chatApi from '@/apis/chat'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export const useChatMsgQuery = ({ roomId }: { roomId: string }) => {
  return useInfiniteQuery({
    queryKey: ['chatMsg'],
    queryFn: ({ pageParam = null }: { pageParam: number | null }) =>
      chatApi.getChatMessage(roomId, pageParam as number | null),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage.content.length || lastPage.content.length < 30) {
        return undefined
      }
      // 가장 오래된(첫 번째) 메시지의 ID를 반환
      return lastPage.content[lastPage.content.length - 1].messageId
    },
  })
}

export const useChatMemoQuery = (messageId: number) => {
  return useQuery({
    queryKey: ['chatMemo', messageId],
    queryFn: () => chatApi.getChatMemo(messageId),
    enabled: !!messageId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  })
}

export const useChatMemoListQuery = (chatRoomId: number) => {
  return useQuery({
    queryKey: ['chatMemoList', chatRoomId],
    queryFn: () => chatApi.getChatMemoList(chatRoomId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  })
}

export const useChatRoomInfoQuery = (
  chatRoomId: number,
  isProfessor: boolean,
) => {
  return useQuery({
    queryKey: ['chatRoomInfo', chatRoomId],
    queryFn: () => chatApi.getChatRoomInfo(chatRoomId),
    enabled: isProfessor,
  })
}

export const useChatRoomIsAuthQuery = (chatRoomId: number) => {
  return useQuery({
    queryKey: ['chatRoomIsAuth', chatRoomId],
    queryFn: () => chatApi.getChatRoomIsAuth(chatRoomId),
  })
}
