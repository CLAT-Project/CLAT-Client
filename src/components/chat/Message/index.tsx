import { IChatMessag } from '@/types/chat.types'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import formatTime from '@/utils/time';

interface IMessageProps {
  messages: IChatMessag
  isLoading: boolean;
  userName?: string;
}

const Message = ({ messages, isLoading, userName }: IMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative flex w-full p-[47px] pb-0">
      <div className="flex h-full w-full flex-col gap-[31px]">
        {isLoading && <div >Loading</div>}
        {messages.messageFileResponseDTOS.map((msg) => {
          const isMessager = msg.senderName === userName

          return (
            <div
              key={msg.messageId + msg.message}
              className={`flex flex-col ${isMessager ? 'items-end' : 'items-start'}`}
            >
              <p className="mb-[8px] mr-2">{msg.senderName}</p>
              <div className={`flex items-end gap-[10px] ${isMessager ? 'flex-row-reverse' : ''}`}  >
                <div className={`inline-block  rounded-[21px] border border-[#363D55] py-[10px] pl-[18px] pr-[33px] relative `}>
                  <div className={`flex flex-row gap-[10px] `}>
                    {msg.imageUrl &&
                      msg.imageUrl.map((image) => {
                        return (
                          <div key={image}>
                            <Image src={image} alt="message" width={200} height={200} />
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className="flex items-center">
                    <p className="w-full text-[16px]">{msg.message}</p>

                  </div>
                </div>
                <p className='text-[#959595] text-[14px] ml-2'>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div >
  )
}

export default Message
