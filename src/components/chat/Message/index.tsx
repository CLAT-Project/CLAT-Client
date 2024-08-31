import { IChatMessag } from '@/types/chat.types'
import { useEffect, useRef } from 'react'

interface IMessageProps {
  messages: IChatMessag[]
  senderName: string
}

const Message = ({ messages, senderName }: IMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative flex w-full p-[47px] pb-0">
      <div className="flex h-full w-full flex-col gap-[31px]">
        {messages.map((msg) => {
          const isMyMessage = msg.senderName === senderName

          return (
            <div
              key={`${msg.senderName}-${msg.message}`}
              className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}
            >
              <p className="mb-[6px]">{msg.senderName}</p>
              <div className="inline-block max-w-[600px] rounded-[21px] bg-[#BBC0D2] py-[10px] pl-4 pr-[33px]">
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
