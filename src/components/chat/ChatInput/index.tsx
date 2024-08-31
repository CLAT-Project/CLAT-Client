import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'
import Image from 'next/image'
import '@/app/(afterLogin)/chat/[slug]/chat.css'
import { ChatFormData } from '@/types/chat.types'

interface ChatInputProps {
  reset: UseFormReset<ChatFormData>
  register: UseFormRegister<ChatFormData>
  handleSendMessage: () => void
  handleSubmit: UseFormHandleSubmit<ChatFormData, undefined>
}

const ChatInput = ({
  reset,
  register,
  handleSendMessage,
  handleSubmit,
}: ChatInputProps) => {

  const onSubmitMessage = () => {
    handleSendMessage()
    reset()
  }

  return (
    <div
      className="fixed bottom-0 right-0 h-[90px] w-full bg-white chat-content-width"
    >
      <form
        className="flex h-[90%] items-center justify-between px-[90px]"
        onSubmit={handleSubmit(onSubmitMessage)}
      >
        <div className="flex w-[100px] gap-2 text-primary">
          <input
            type="checkbox"
            id="anonymous"
            {...register('anonymous')}
            className=""
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            {...register('message', { required: true })}
            className="h-[38px] w-full rounded-[21px] bg-[#EFEFEF] px-5"
          />
        </div>
        <div className="flex min-w-[120px] justify-center gap-2">
          <Image
            src="/images/png/file-send.png"
            alt="file-send"
            width={45}
            height={45}
            className="cursor-pointer"
          />
          <button type="submit">
            <Image
              src="/images/png/message-send.png"
              alt="file-send"
              width={45}
              height={45}
              className="cursor-pointer"
            />
          </button>
        </div>
      </form>
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[14px] text-black">
        <p>※ 무례한 발언 및 욕설 남발 시 법적 조치가 가능합니다. ※</p>
      </div>
    </div>
  )
}

export default ChatInput
