/* eslint-disable @typescript-eslint/no-shadow */
import MemoPopup from '@/components/chat/MemoPopup'
import MessagePopup from '@/components/chat/MessagePopup'
import {
  useChatMemoListQuery,
  useChatMemoQuery,
} from '@/hooks/queries/useChatQuery'
import { IChatMessag } from '@/types/chat.types'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface IMessageItemProps {
  msg: {
    messageId: number
    message: string
    answerId?: number
    answer: string
  }
  messages: IChatMessag
  isMessager: boolean
  isMemoedMessage: boolean
  chatRoomId: number
  setMemoedMessageIds: React.Dispatch<React.SetStateAction<number[]>>
  setIsAnswering: React.Dispatch<React.SetStateAction<boolean>>
  setAnswer: React.Dispatch<React.SetStateAction<string>>
  setAnswerMessageId: React.Dispatch<React.SetStateAction<number>>
  isAnswering: boolean
}

const MessageItem = ({
  msg,
  isMessager,
  isMemoedMessage,
  chatRoomId,
  setMemoedMessageIds,
  messages,
  setIsAnswering,
  setAnswer,
  setAnswerMessageId,
  isAnswering,
}: IMessageItemProps) => {
  const x = useMotionValue(0)
  const background = useTransform(x, [0, 50], ['#fff', '#c8d5ec'], {
    clamp: false,
  })

  const [isDragging, setIsDragging] = useState(false)
  const [memoMessageId, setMemoMessageId] = useState<number>()
  const [memoContent, setMemoContent] = useState<{ [key: number]: string }>({})
  const [showMemoPopup, setShowMemoPopup] = useState(false)
  const [showMessagePopup, setShowMessagePopup] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  )
  const { data: chatMemo, refetch: refetchChatMemo } = useChatMemoQuery(
    memoMessageId ?? 0,
  )
  const { data: chatMemoList } = useChatMemoListQuery(chatRoomId)

  const handlePopupToggle = (msgId: number) => {
    if (!isDragging) {
      setSelectedMessageId((prevId) => (prevId === msgId ? null : msgId))
      setShowMessagePopup(!showMessagePopup)
    }
  }

  const onClickMemo = async (messageId: number) => {
    setMemoMessageId(messageId)
    setShowMemoPopup(true)
    setShowMessagePopup(false)
    await refetchChatMemo()
    if (chatMemo) {
      setMemoContent((prevContent) => ({
        ...prevContent,
        [messageId]: chatMemo.memo,
      }))
    }
  }

  const handleMemoClick = (msgId: number) => {
    setMemoMessageId(msgId)
    setShowMemoPopup(true)
    setShowMessagePopup(false)
    setMemoContent('')
  }

  useEffect(() => {
    if (!isAnswering) {
      x.set(0)
    }
  }, [isAnswering, x])

  useEffect(() => {
    const unsubscribe = x.onChange((value) => {
      if (value === 0 && isAnswering) {
        setIsAnswering(false)
      }
    })

    return () => unsubscribe()
  }, [x, setIsAnswering, isAnswering])

  useEffect(() => {
    if (messages && chatMemoList) {
      const memoedIds = messages.messageFileResponseDTOS
        .filter((msg) =>
          chatMemoList.some((memo) => memo.messageId === msg.messageId),
        )
        .map((msg) => msg.messageId)
      setMemoedMessageIds(memoedIds)

      const memoContents = Object.fromEntries(
        chatMemoList.map((memo) => [memo.messageId, memo.memo]),
      )

      setMemoContent(memoContents)
    }
  }, [messages, chatMemoList])

  return (
    <div className="relative mb-4">
      <motion.div
        className="relative z-10 max-w-[600px] cursor-pointer rounded-[21px] border border-[#363D55] py-[10px] pl-[18px] pr-[33px]"
        onClick={() => handlePopupToggle(Number(msg.messageId))}
        style={{ x, background }}
        drag="x"
        dragSnapToOrigin={false}
        dragConstraints={{ left: 0, right: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(event, info) => {
          if (isDragging && info.offset.x < 50 && !isMessager) {
            setIsAnswering(true)
            setAnswer(msg.message) // 메시지 내용을 답변으로 설정
            setAnswerMessageId(msg.messageId) // 메시지 ID를 답변 메시지 ID로 설정
          }
        }}
        onDragEnd={(event, info) => {
          setIsDragging(false)
          if (info.offset.x < 50 && !isMessager) {
            if (isAnswering) {
              x.set(50)
            } else {
              x.set(0)
            }
          }
        }}
      >
        <div className="flex items-center">
          <p className="w-full break-words text-[16px]">{msg.message}</p>
        </div>

        {isMemoedMessage && (
          <div
            className={`absolute -top-[10px] h-[22px] w-[22px] rounded-full bg-[#FF9900] ${isMessager ? 'sender' : 'receiver'}`}
            onClick={(e) => {
              e.stopPropagation()
              onClickMemo(msg.messageId)
            }}
          />
        )}

        {showMessagePopup && selectedMessageId === msg.messageId && (
          <div
            className={`absolute -top-[110px] ${isMessager ? 'right-[106%]' : 'left-[106%]'} z-[99999] h-[174px] w-[134px]`}
          >
            <MessagePopup
              message={msg.message}
              messageId={msg.messageId}
              onMemoClick={handleMemoClick}
              isMessager={isMessager}
            />
          </div>
        )}

        {showMemoPopup && memoMessageId === msg.messageId && (
          <div
            className={`absolute -top-1/2 z-50 h-[174px] w-[351px] ${isMessager ? 'right-[106%]' : 'left-[106%]'} ml-2 mr-2`}
          >
            <MemoPopup
              messageId={msg.messageId}
              chatRoomId={chatRoomId}
              memoContent={memoContent?.[msg.messageId] || ''}
              onClose={() => {
                setShowMemoPopup(false)
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default MessageItem
