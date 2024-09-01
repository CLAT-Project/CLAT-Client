'use client'

import ChatInput from '@/components/chat/ChatInput'
import Message from '@/components/chat/Message'
import { connect, disconnect, sendMessage } from '@/libs/websocket'
import { ChatFormData, IChatMessag } from '@/types/chat.types'
import { useQueryClient } from '@tanstack/react-query'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './chat.css'
import toast from 'react-hot-toast'
import useChatMsgQuery from '@/hooks/queries/useChatQuery'
import ChatHeader from '@/components/chat/ChatHeader'



const Chat = () => {
  const queryClient = useQueryClient()
  const params = useParams<Params>()
  const { register, handleSubmit, reset, watch } = useForm<ChatFormData>()

  const message = watch('message')
  const [messages, setMessages] = useState<IChatMessag | undefined>(undefined)
  const { data: chatMsg } = useChatMsgQuery({ roomId: params.slug })

  const handleSendMessage = () => {
    if (message) {
      sendMessage(
        '/pub/chat/message',
        JSON.stringify({
          chatRoomId: params.slug,
          message,
        }),
      )
      queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
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
        timeStamp: content.timestamp,
        imageUrl: content.imageUrl
      }
      setMessages(prevMessages => {
        if (!prevMessages) {
          return {
            courseName: "코스 이름",
            roomName: "룸 이름",
            messageFileResponseDTOS: [newMessage]
          };
        }
        return {
          ...prevMessages,
          messageFileResponseDTOS: [...prevMessages.messageFileResponseDTOS, newMessage]
        };
      });
    });

    return () => {
      disconnect()
    }
  }, [params.slug])

  useEffect(() => {
    if (chatMsg) {
      setMessages(chatMsg)
    }
  }, [chatMsg])

  return (
    <>
      <ChatHeader className={chatMsg?.courseName || ''} />
      <div
        className="w-full overflow-y-scroll chat-content-height"
      >
        {messages && <Message messages={messages} />}
        <ChatInput
          handleSendMessage={handleSendMessage}
          register={register}
          reset={reset}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

export default Chat
