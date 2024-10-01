import Image from 'next/image'
import { IChatMessag } from '@/types/chat.types'
import { useEffect, useRef, useState } from 'react'
import formatTime from '@/utils/time'
import ImageLayout from '@/components/chat/ImageLayout'
import './Message.css'
import MessageItem from '@/components/chat/MessageItem'

interface IMessageProps {
  messages?: IChatMessag
  userName?: string
  chatRoomId: number
  setIsAnswering: React.Dispatch<React.SetStateAction<boolean>>
  setAnswer: React.Dispatch<React.SetStateAction<string>>
  setAnswerMessageId: React.Dispatch<React.SetStateAction<number>>
  isAnswering: boolean
}

const Message = ({
  messages,
  userName,
  chatRoomId,
  setIsAnswering,
  setAnswer,
  setAnswerMessageId,
  isAnswering,
}: IMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [memoedMessageIds, setMemoedMessageIds] = useState<number[]>([])

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'download.pdf'
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative flex w-full p-[47px] pb-0">
      <div className="flex h-full w-full flex-col gap-[31px]">
        {messages?.messageFileResponseDTOS.map((msg) => {
          const isMessager = msg.senderName === userName
          const isMemoedMessage = memoedMessageIds.includes(msg.messageId)

          return (
            <div
              key={msg.messageId + msg.message}
              className={`flex flex-col ${isMessager ? 'items-end' : 'items-start'} w-full`}
            >
              <p className="mb-[8px] mr-2">{msg.senderName}</p>
              <div
                className={`flex items-end gap-[10px] ${isMessager ? 'flex-row-reverse' : ''} w-full`}
              >
                <div
                  className={`flex flex-col ${isMessager ? 'items-end' : 'items-start'} max-w-[70%]`}
                >
                  {msg.message && (
                    <div
                      className={`flex items-end gap-2 ${isMessager ? 'flex-row-reverse' : ''}`}
                    >
                      <MessageItem
                        msg={{
                          messageId: msg.messageId,
                          message: msg.message,
                          answerId: msg.answerId,
                          answer: msg.answer,
                        }}
                        isMessager={isMessager}

                        isMemoedMessage={isMemoedMessage}
                        chatRoomId={chatRoomId}
                        setMemoedMessageIds={setMemoedMessageIds}
                        messages={messages}
                        setIsAnswering={setIsAnswering}
                        setAnswer={setAnswer}
                        setAnswerMessageId={setAnswerMessageId}
                        isAnswering={isAnswering}
                      />
                      <div className='mb-4 flex gap-2'>
                        <div className='w-[82px] h-[36px] bg-[#efefef] rounded-[20px]'>
                          <div className='flex items-center justify-center h-full gap-2'>
                            <Image
                              src="/images/png/heart.png"
                              alt="heart"
                              width={26}
                              height={26}
                            />
                            <p className='text-[18px]'>25</p>
                          </div>
                        </div>
                        <div className='w-[82px] h-[36px] bg-[#efefef] rounded-[20px]'>
                          <div className='flex items-center justify-center h-full gap-2'>
                            <Image
                              src="/images/png/crying.png"
                              alt="heart"
                              width={26}
                              height={26}
                            />
                            <p className='text-[18px]'>12</p>
                          </div>
                        </div>
                        <div className='w-[82px] h-[36px] bg-[#efefef] rounded-[20px]'>
                          <div className='flex items-center justify-center h-full gap-2'>
                            <Image
                              src="/images/png/good.png"
                              alt="heart"
                              width={26}
                              height={26}
                            />
                            <p className='text-[18px]'>10</p>
                          </div>
                        </div>
                      </div>
                      <p className="mb-4 text-[14px] text-[#959595]">
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  )}
                  {msg.answerId && (
                    <div className="relative ml-10 mt-0 max-w-[600px]">
                      {isMessager ? (
                        <Image
                          src="/images/png/answer2.png"
                          alt="arrow"
                          width={20}
                          height={20}
                          className="absolute right-[14px] top-[-10px] w-7"
                        />
                      ) : (
                        <Image
                          src="/images/png/answer.png"
                          alt="arrow"
                          width={20}
                          height={20}
                          className="absolute left-[-24px] top-[-10px] w-7"
                        />
                      )}
                      <div
                        className={`relative mt-5 rounded-[21px] bg-[#BBC0D2] py-[10px] pl-[18px] pr-[33px] ${isMessager ? 'mr-12' : 'ml-4'}`}
                      >
                        <p className="text-[16px]">{msg.answer}</p>
                      </div>
                    </div>
                  )}
                  {msg?.imageUrl?.length > 0 &&
                    (msg?.imageUrl[0]?.slice(-3).toLowerCase() === 'pdf' ? (
                      <a
                        href={msg?.imageUrl[0]}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-[107px] w-[446px] items-center justify-center rounded-[21px] bg-primary px-[40px] py-[20px] no-underline"
                      >
                        <div className="flex cursor-pointer items-center gap-[10px]">
                          <Image
                            src="/images/png/file.png"
                            alt="file"
                            width={45}
                            height={45}
                            quality={100}
                            className="h-[45px] w-[45px]"
                          />
                          <p className="max-w-[300px] truncate text-[18px] text-white">
                            {getFileName(msg.imageUrl[0])}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="relative flex h-[248px] w-[404px] items-center justify-center rounded-[21px] bg-primary">
                        <ImageLayout images={msg?.imageUrl} />
                      </div>
                    ))}
                </div>
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
