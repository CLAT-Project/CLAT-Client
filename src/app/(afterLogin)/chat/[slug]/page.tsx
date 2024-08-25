'use client'

import ChatInput from '@/components/chat/ChatInput'
import Message from '@/components/chat/Message'
import { useChatMsgQuery } from '@/hooks/queries/useChatQuery'
import { connect, disconnect, sendMessage } from '@/libs/websocket'
import { IChatMessag } from '@/types/chat.types'
import { useQueryClient } from '@tanstack/react-query'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export interface ChatFormData {
  message: string
  anonymous: boolean
}

const Chat = () => {
  const queryClient = useQueryClient()
  const params = useParams<Params>()
  const { register, handleSubmit, reset, watch } = useForm<ChatFormData>()

  const message = watch('message')
  const anonymous = watch('anonymous') // 익명 체크값
  const [senderName, setSenderName] = useState('쥬')
  const [messages, setMessages] = useState<IChatMessag[]>([])

  const { data: chatMsg } = useChatMsgQuery({ roomId: params.slug })

  const handleSendMessage = () => {
    if (senderName && message) {
      sendMessage(
        '/pub/chat/message',
        JSON.stringify({
          courseId: params.slug,
          senderName: senderName,
          message,
        }),
      )
      queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
    } else {
      alert('Please enter your name and a message.')
    }
  }

  useEffect(() => {
    // 웹소켓 연결 및 메시지 구독
    connect(params.slug, (message) => {
      const content = JSON.parse(message.body)
      const newMessage = {
        senderName: content.senderName,
        message: content.message,
        timestamp: content.timestamp,
      }
      setMessages((prevMessages) => [...prevMessages, newMessage.message])
    })

    return () => {
      disconnect()
    }
  }, [message])

  useEffect(() => {
    if (chatMsg) {
      setMessages(chatMsg)
    }
  }, [chatMsg])

  return (
    <div
      className="w-full overflow-y-scroll"
      style={{ height: 'calc(90vh - 90px)' }}
    >
      <Message messages={messages} senderName={senderName} />
      <ChatInput
        handleSendMessage={handleSendMessage}
        register={register}
        reset={reset}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default Chat
