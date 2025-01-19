import chatApi from '@/apis/chat'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useCreateChatRoomMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: {
      courseId: number
      roomName: string
      week: number
    }) => chatApi.postChatRoom(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userClass'] })
      toast.success('채팅방 생성 성공')
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
  })
}
export const usePostChatMemoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: {
      messageId: number
      chatRoomId: number
      memo: string
    }) => chatApi.postChatMemo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMessage'] })
      queryClient.invalidateQueries({ queryKey: ['chatMemoList'] })
      toast.success('메모 저장 성공')
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
  })
}

export const usePostChatAuthMutation = ({
  onSuccessCallback,
}: {
  onSuccessCallback: () => void
}) => {
  return useMutation({
    mutationFn: (payload: { chatRoomId: number; roomKey: string }) =>
      chatApi.postChatAuth(payload),
    onSuccess: () => {
      onSuccessCallback()
    },
  })
}

export const usePutModifyMemoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { messageId: number; memoContent: string }) =>
      chatApi.putModifyMemo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatMemoList'] })
      toast.success('메모 수정 성공')
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
  })
}

export const useBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (messageId: number) => chatApi.postChatBookmark(messageId),
    onSuccess: () => {
      toast.success('북마크가 등록되었습니다.')
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error('북마크 등록에 실패했습니다.')
      }
    },
  })
}

export const useBookmarkListQuery = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: chatApi.getChatBookmark,
  })
}
