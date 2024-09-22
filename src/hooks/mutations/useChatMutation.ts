import chatApi from '@/apis/chat'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      messageId: number,
      chatRoomId: number,
      memo: string,
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
  onSuccessCallback
}: {
  onSuccessCallback: () => void
}) => {
  return useMutation({
    mutationFn: (payload: { chatRoomId: number, roomKey: string }) => chatApi.postChatAuth(payload),
    onSuccess: () => {
      onSuccessCallback()
    },
  })
}