import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form'
import Image from 'next/image'
import '@/app/(afterLogin)/chat/[slug]/chat.css'
import { ChatFormData } from '@/types/chat.types'
import { useRef, useState } from 'react'
import chatApi from '@/apis/chat'
import { sendMessage } from '@/libs/websocket'
import { useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
  const imageRef = useRef<HTMLInputElement>(null)
  const [, setImages] = useState<File[]>([]);

  const handleClick = () => {
    if (imageRef.current) {
      imageRef.current.click()
    }
  }

  const onSubmitMessage = async () => {
    handleSendMessage()
    reset()
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      setImages(Array.from(files));

      const formData = new FormData();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[0]);
      }

      await chatApi.postChatImageFile(formData)

      sendMessage(
        '/pub/chat/file',
        'https://sung-won-chat.s3.ap-northeast-2.amazonaws.com/chat-service/a8a7dc03-5250-4769-bd17-b93edbf67bd7.png'
      )
    }
    queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
  }


  return (
    <div
      className="fixed bottom-0 right-0 h-[90px] w-full bg-white chat-content-width"
    >
      <form
        className="flex h-[90%] items-center justify-between px-[90px]"
        onSubmit={handleSubmit(onSubmitMessage)}
      >
        <div className="w-full">
          <input
            type="text"
            {...register('message', { required: true })}
            className="h-[38px] w-full rounded-[21px] bg-[#EFEFEF] px-5"
          />
        </div>
        <div className="flex min-w-[120px] justify-center gap-2" >
          <Image
            src="/images/png/file-send.png"
            alt="file-send"
            width={45}
            height={45}
            className="cursor-pointer"
            onClick={handleClick}
          />
          <input type="file" accept='image/*' onChange={handleImageUpload} className='hidden' ref={imageRef} multiple />
          <button type="submit">
            <Image
              src="/images/png/message-send.png"
              alt="message-send"
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

