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
            <div>
              <p>{msg.message}</p>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default Message
