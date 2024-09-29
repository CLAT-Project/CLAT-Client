'use client'

import ChatInput from '@/components/chat/ChatInput'
import Message from '@/components/chat/Message'
import { connect, disconnect, sendMessage } from '@/libs/websocket'
import { ChatFormData, IChatMessag } from '@/types/chat.types'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './chat.css'
import toast from 'react-hot-toast'
import ChatHeader from '@/components/chat/ChatHeader'
import { useUserClassQuery, useUserQuery } from '@/hooks/queries/useUserQuery'
import { useChatMsgQuery, useChatRoomIsAuthQuery } from '@/hooks/queries/useChatQuery'
import useUser from '@/hooks/common/useUser'
import ChatAuth from '@/components/chat/ChatAuth'
import { useQueryClient } from '@tanstack/react-query'

const Chat = () => {
  const params = useParams<Params>()
  const { isProfessor } = useUser()
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, watch } = useForm<ChatFormData>()

  const message = watch('message')
  const [messages, setMessages] = useState<IChatMessag | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [isAnswering, setIsAnswering] = useState(true)
  const [answer, setAnswer] = useState('')
  const [answerMessageId, setAnswerMessageId] = useState(0)

  const { data: chatMsg } = useChatMsgQuery({ roomId: params.slug })
  const { data: userData } = useUserQuery()
  const { data: userClassData } = useUserClassQuery()
  const { data: chatRoomIsAuth } = useChatRoomIsAuthQuery(Number(params.slug))

  const courseName = userClassData?.find((classItem) =>
    classItem.chatRooms.find((chatRoom) => chatRoom.chatRoomId === params.slug),
  )?.courseName

  const handleSendMessage = async () => {
    if (isAnswering) {
      try {
        await sendMessage(`/pub/chat/answer`, JSON.stringify({
          messageId: answerMessageId,
          chatRoomId: params.slug,
          answer,
        }));
        setAnswer('');
        setAnswerMessageId(0);
      } finally {
        setIsAnswering(false);
        queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
      }
      return;
    }

    if (message) {
      sendMessage(
        '/pub/chat/message',
        JSON.stringify({
          chatRoomId: params.slug,
          message,
        }),
      )
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
            courseName: '코스 이름',
            roomName: '룸 이름',
            messageFileResponseDTOS: [{
              ...newMessage,
              answer: '',
            }],
          }
        }
        return {
          ...prevMessages,
          messageFileResponseDTOS: [
            ...prevMessages.messageFileResponseDTOS,
            {
              ...newMessage,
              answer: '', // 기본 answer 값 추가
            },
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
      setMessages(chatMsg)
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
  return (
    <>
      <ChatHeader className={courseName || ''} roomId={params.slug} />
      {isAuth || isProfessor ?
        <div className="chat-content-height w-full overflow-y-scroll">
          <Message
            messages={messages}
            userName={userData?.name}
            chatRoomId={Number(params.slug)}
            setIsAnswering={setIsAnswering}
            setAnswer={setAnswer}
            setAnswerMessageId={setAnswerMessageId}
            isAnswering={isAnswering}
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
        :
        <ChatAuth chatRoomId={params.slug} setIsAuth={setIsAuth} />
      }
    </>
  )
}

export default Chat
