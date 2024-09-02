import { IChatMessag } from '@/types/chat.types'
import { useEffect, useRef } from 'react'

interface IMessageProps {
  messages: IChatMessag
}

const Message = ({ messages }: IMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative flex w-full p-[47px] pb-0">
      <div className="flex h-full w-full flex-col gap-[31px]">
        {messages.messageFileResponseDTOS.map((msg) => {

          return (
            <div
              key={msg.messageId + msg.message}
              className={`flex flex-col `}
            >
              <p className="mb-[6px]">{msg.senderName}</p>
              <div className="inline-block max-w-[600px] rounded-[21px] border border-[#363D55] py-[10px] pl-[18px] pr-[33px]">
                <div className='flex flex-row gap-[10px]'>
                  {msg.imageUrl &&
                    msg.imageUrl.map((image) => {
                      return (
                        <img src={image} alt="message" className='w-[200px] h-[200p]' key={image} />
                      )
                    })
                  }
                </div>
                <p className="w-full text-[16px]">{msg.message}</p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default Message
