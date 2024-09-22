import Image from 'next/image'
import { IChatMessag } from '@/types/chat.types'
import { useEffect, useRef, useState } from 'react'
import formatTime from '@/utils/time'
import ImageLayout from '@/components/chat/ImageLayout'
import MessagePopup from '@/components/chat/MessagePopup'
import { useChatMemoListQuery, useChatMemoQuery } from '@/hooks/queries/useChatQuery'
import './Message.css'
import MemoPopup from '@/components/chat/MemoPopup'

interface IMessageProps {
  messages?: IChatMessag
  isLoading: boolean
  userName?: string
  chatRoomId: number;
}

const Message = ({ messages, isLoading, userName, chatRoomId }: IMessageProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  )
  const [memoMessageId, setMemoMessageId] = useState<number>();
  const [memoedMessageIds, setMemoedMessageIds] = useState<number[]>([])
  const [showMemoPopup, setShowMemoPopup] = useState(false)
  const [showMessagePopup, setShowMessagePopup] = useState(false)
  const [memoContent, setMemoContent] = useState('')

  const { data: chatMemo, refetch: refetchChatMemo, isLoading: isLoadingChatMemo } = useChatMemoQuery(memoMessageId ?? 0)
  const { data: chatMemoList } = useChatMemoListQuery(chatRoomId)

  const onClickMemo = (messageId: number) => {
    refetchChatMemo()
    setMemoMessageId(messageId)
    setMemoContent(chatMemo?.memo)
    setShowMemoPopup(true);
    setShowMessagePopup(false);
  }

  const getFileName = (url: string) => {
    return url.split('/').pop() || 'download.pdf'
  }

  const handleMemoClick = (msgId: number) => {
    setMemoMessageId(msgId);
    setShowMemoPopup(true);
    setShowMessagePopup(false);
    setMemoContent('')
  };


  const handlePopupToggle = (msgId: number) => {
    setSelectedMessageId((prevId) => (prevId === msgId ? null : msgId))
    setShowMessagePopup(!showMessagePopup)
  }

  useEffect(() => {
    if (messages && chatMemoList) {
      const memoedIds = messages.messageFileResponseDTOS
        .filter(msg => chatMemoList.some(memo => memo.messageId === msg.messageId))
        .map(msg => msg.messageId)
      setMemoedMessageIds(memoedIds)
    }
  }, [messages, chatMemoList])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="relative flex w-full p-[47px] pb-0">
      <div className="flex h-full w-full flex-col gap-[31px]">
        {isLoading && <div>Loading</div>}
        {messages?.messageFileResponseDTOS.map((msg) => {
          const isMessager = msg.senderName === userName
          const isMemoedMessage = memoedMessageIds.includes(msg.messageId)

          return (
            <div
              key={msg.messageId + msg.message}
              className={`flex flex-col ${isMessager ? 'items-end' : 'items-start'} w-full`}
            >
              <p className="mb-[8px] mr-2">{msg.senderName}</p>
              <div className={`flex items-end gap-[10px] ${isMessager ? 'flex-row-reverse' : ''} w-full`}>
                <div className={`flex flex-col ${isMessager ? 'items-end' : 'items-start'} max-w-[70%]`}>
                  {msg.message && (
                    <div
                      className={`relative max-w-[600px] cursor-pointer rounded-[21px] border border-[#363D55] py-[10px] pl-[18px] pr-[33px] `}
                      onClick={() => handlePopupToggle(msg.messageId)}
                    >
                      <div className="flex items-center"


                      >
                        <p className="w-full break-words text-[16px]">
                          {msg.message}
                        </p>
                      </div>

                      {isMemoedMessage && !isLoadingChatMemo && (
                        <div
                          className={`absolute -top-[10px] bg-[#FF9900] w-[22px] h-[22px] rounded-full ${isMessager ? 'sender' : 'receiver'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onClickMemo(msg.messageId);
                          }}
                        />
                      )}

                      {showMessagePopup && selectedMessageId === msg.messageId && (
                        <div
                          className={`absolute -top-[110px] ${isMessager ? 'right-[106%]' : 'left-[106%]'} z-50 h-[174px] w-[134px]`}
                        >
                          <MessagePopup
                            message={msg.message}
                            messageId={msg.messageId}
                            onMemoClick={handleMemoClick}
                          />
                        </div>
                      )}

                      {showMemoPopup && memoMessageId === msg.messageId && (
                        <div className={`absolute z-50 -top-1/2 w-[351px] h-[174px] ${isMessager ? 'right-[106%]' : 'left-[106%]'} ml-2 mr-2`}>
                          <MemoPopup
                            messageId={msg.messageId}
                            chatRoomId={chatRoomId}
                            memoContent={memoContent}
                            onClose={() => {
                              setShowMemoPopup(false)
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {msg.imageUrl?.length > 0 &&
                    (msg.imageUrl[0].slice(-3).toLowerCase() === 'pdf' ? (
                      <a
                        href={msg.imageUrl[0]}
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
                        <ImageLayout images={msg.imageUrl} />
                      </div>
                    ))}

                </div>
                <p className="w-18 text-[14px] text-[#959595]">
                  {formatTime(msg.timestamp)}
                </p>
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
