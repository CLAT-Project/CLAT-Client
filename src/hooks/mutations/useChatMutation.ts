import chatApi from '@/apis/chat'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const useCreateChatRoomMutation = () => {
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

export default useCreateChatRoomMutation
