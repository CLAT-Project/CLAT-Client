import VerificationCodeInput from '@/components/signup/VerifyForm/VerificationCodeInput'
import { usePostChatAuthMutation } from '@/hooks/mutations/useChatMutation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface IChatAuthProps {
  chatRoomId: string
  setIsAuth: Dispatch<SetStateAction<boolean>>
}
const ChatAuth = ({ chatRoomId, setIsAuth }: IChatAuthProps) => {
  const [roomKey, setRoomKey] = useState<string>('')

  const postChatAuthMutation = usePostChatAuthMutation({
    onSuccessCallback: () => {
    },
  })
  const onChange = (value: string, index: number) => {
    setRoomKey((prevKey) => {
      const newKey = prevKey.split('')
      newKey[index] = value
      return newKey.join('')
    })
  }

  const onSubmitAuthCode = (data: { roomKey: string }) => {
    if (data.roomKey.length === 4 && /^\d+$/.test(roomKey)) {
      postChatAuthMutation.mutate({ chatRoomId: Number(chatRoomId), roomKey })
    } else {
      toast.error('올바른 4자리 숫자를 입력해주세요.')
    }
  }

  useEffect(() => {
    if (postChatAuthMutation.data?.flag) {
      setIsAuth(true)
      toast.success('인증에 성공했습니다.')
    }
  }, [postChatAuthMutation.data])

  return (
    <div className="flex h-[90vh] flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-light">인증 번호를 입력해주세요.</h2>
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-center">
          <VerificationCodeInput
            onChange={onChange}
            digits={4}
            onComplete={onSubmitAuthCode}
            roomKey={roomKey}
          />
        </div>
      </div>
    </div>
  )
}

export default ChatAuth
