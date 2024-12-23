/* eslint-disable eqeqeq */

'use client'

import ChatInput from '@/components/chat/ChatInput'
import Message from '@/components/chat/Message'
import { connect, disconnect, sendMessage } from '@/libs/websocket'
import { ChatFormData, IChatMessag } from '@/types/chat.types'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './chat.css'
import toast from 'react-hot-toast'
import ChatHeader from '@/components/chat/ChatHeader'
import { useUserClassQuery, useUserQuery } from '@/hooks/queries/useUserQuery'
import {
  useChatMsgQuery,
  useChatRoomIsAuthQuery,
} from '@/hooks/queries/useChatQuery'
import useUser from '@/hooks/common/useUser'
import ChatAuth from '@/components/chat/ChatAuth'
import { useQueryClient } from '@tanstack/react-query'

const Chat = () => {
  const params = useParams<Params>()
  const { isProfessor } = useUser()
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, watch } = useForm<ChatFormData>()

  const message = watch('message')
  const [messages, setMessages] = useState<IChatMessag | undefined>({
    content: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [isAnswering, setIsAnswering] = useState(false)
  const [answer, setAnswer] = useState('')
  const [answerMessageId, setAnswerMessageId] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isNewMessage, setIsNewMessage] = useState(false)
  const {
    data: chatMsg,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useChatMsgQuery({ roomId: params.slug })
  const { data: userData } = useUserQuery()
  const { data: userClassData } = useUserClassQuery({ term: '24-2' })
  const { data: chatRoomIsAuth } = useChatRoomIsAuthQuery(Number(params.slug))

  const courseName = userClassData?.find((classItem) =>
    classItem.chatRooms.find((chatRoom) => chatRoom.chatRoomId == params.slug),
  )?.courseName

  const handleSendMessage = async () => {
    if (isAnswering) {
      try {
        await sendMessage(
          `/pub/chat/answer`,
          JSON.stringify({
            messageId: answerMessageId,
            chatRoomId: params.slug,
            answer,
          }),
        )
        toast.success('답변 작성 완료')
      } finally {
        setIsAnswering(false)
        setAnswer('')
        setAnswerMessageId(0)
        queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
      }
      return
    }

    if (message) {
      sendMessage(
        '/pub/chat/message',
        JSON.stringify({
          chatRoomId: params.slug,
          message,
        }),
      )
      setIsNewMessage(true)
      // queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
    } else {
      toast.error('Please enter your name and a message.')
    }
  }

  useEffect(() => {
    connect(params.slug, (m) => {
      const content = JSON.parse(m.body)
      const newMessage = {
        messageId: content.messageId,
        senderName: content.senderName,
        message: content.message,
        timestamp: content.timestamp,
        imageUrl: content.imageUrl,
      }
      setMessages((prevMessages) => {
        if (!prevMessages) {
          return {
            content: [
              {
                ...newMessage,
                answer: '',
              },
            ],
          }
        }
        return {
          ...prevMessages,
          content: [
            {
              ...newMessage,
              answer: '', // 기본 answer 값 추가
            },
            ...prevMessages.content,
          ],
        }
      })
    })

    return () => {
      disconnect()
    }
  }, [params.slug])

  useEffect(() => {
    if (chatMsg) {
      setMessages({
        content: chatMsg.pages.flatMap((page) => page.content),
      })
    }
  }, [chatMsg])

  useEffect(() => {
    if (isProfessor) {
      setIsAuth(true)
    }
  }, [isProfessor])

  useEffect(() => {
    if (chatRoomIsAuth?.passWorldEnter) {
      setIsAuth(true)
    }
  }, [chatRoomIsAuth])

  useEffect(() => {
    setCurrentAnswer(answer)
  }, [isAnswering])

  useEffect(() => {
    localStorage.setItem('currentRoomId', params.slug)
    return () => {
      localStorage.removeItem('currentRoomId')
    }
  }, [params.slug])

  return (
    <>
      {isAnswering && (
        <div className="absolute left-[41%] top-20 z-50 h-[144px] w-[334px] rounded-[20px] bg-[#F5F5F5] shadow-md shadow-gray-200">
          <div className="mr-10 flex h-full flex-col flex-nowrap items-start justify-center gap-2 overflow-hidden text-ellipsis px-10">
            <p className="text-[18px] text-primary">
              다음 질문에 답변 중입니다.
            </p>
            <p className="text-[18px]">&quot;{currentAnswer}&quot;</p>
          </div>
        </div>
      )}
      <ChatHeader className={courseName || ''} roomId={params.slug} />
      {isAuth || isProfessor ? (
        <div className="chat-content-height w-full overflow-y-scroll pt-8">
          <Message
            isFetching={isFetching}
            isMessage={isNewMessage}
            messages={messages}
            userName={userData?.name}
            chatRoomId={Number(params.slug)}
            setIsAnswering={setIsAnswering}
            setAnswer={setAnswer}
            setAnswerMessageId={setAnswerMessageId}
            isAnswering={isAnswering}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
          <ChatInput
            handleSendMessage={handleSendMessage}
            register={register}
            reset={reset}
            handleSubmit={handleSubmit}
            chatRoomId={params.slug}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            isAnswering={isAnswering}
            setAnswer={setAnswer}
          />
        </div>
      ) : (
        <ChatAuth chatRoomId={params.slug} setIsAuth={setIsAuth} />
      )}
    </>
  )
}

export default Chat
