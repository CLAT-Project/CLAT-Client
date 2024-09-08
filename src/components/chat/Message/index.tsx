import Image from 'next/image';
import { IChatMessag } from '@/types/chat.types'
import { useEffect, useRef } from 'react'
import formatTime from '@/utils/time';
import ImageLayout from '@/components/chat/ImageLayout';

interface IMessageProps {
  messages?: IChatMessag
  isLoading: boolean;
  userName?: string;
}

const Message = ({ messages, isLoading, userName }: IMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'download.pdf';
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative flex w-full p-[47px] pb-0">
      <div className="flex h-full w-full flex-col gap-[31px]">
        {isLoading && <div >Loading</div>}
        {messages?.messageFileResponseDTOS.map((msg) => {
          const isMessager = msg.senderName === userName

          return (
            <div
              key={msg.messageId + msg.message}
              className={`flex flex-col ${isMessager ? 'items-end' : 'items-start'} `}
            >
              <p className="mb-[8px] mr-2">{msg.senderName}</p>
              <div className={`flex items-end gap-[3px] ${isMessager ? 'flex-row-reverse' : ''}   `}  >
                {msg.message &&
                  <div className="inline-block  rounded-[21px] border border-[#363D55] py-[10px] pl-[18px] pr-[33px] relative w-1/2">
                    <div className="flex items-center ">
                      <p className="w-full text-[16px] break-words">{msg.message}</p>
                    </div>
                  </div>
                }

                {msg.imageUrl?.length > 0 && (
                  msg.imageUrl[0].slice(-3).toLowerCase() === 'pdf' ? (
                    <a
                      href={msg.imageUrl[0]}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center rounded-[21px] w-[446px] h-[107px] py-[20px] px-[40px] bg-primary no-underline"
                    >
                      <div className='flex items-center gap-[10px] cursor-pointer'>
                        <Image src="/images/png/file.png" alt="file" width={45} height={45} quality={100} className='w-[45px] h-[45px]' />
                        <p className='text-white truncate max-w-[300px] text-[18px]'>{getFileName(msg.imageUrl[0])}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex justify-center items-center rounded-[21px] w-[404px] h-[248px] relative bg-primary">
                      <ImageLayout images={msg.imageUrl} />
                    </div>
                  )
                )}
                <p className='text-[#959595] text-[14px] ml-2 w-20'>
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
