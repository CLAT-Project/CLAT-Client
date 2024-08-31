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



const Chat = () => {
  const queryClient = useQueryClient()
  const params = useParams<Params>()
  const { register, handleSubmit, reset, watch } = useForm<ChatFormData>()

  const message = watch('message')
  const [senderName] = useState('쥬')
  const [messages, setMessages] = useState<IChatMessag[]>([])

  const { data: chatMsg } = useChatMsgQuery({ roomId: params.slug })

  const handleSendMessage = () => {
    if (senderName && message) {
      sendMessage(
        '/pub/chat/message',
        JSON.stringify({
          courseId: params.slug,
          senderName,
          message,
        }),
      )
      queryClient.invalidateQueries({ queryKey: ['chatMsg'] })
    } else {
      toast.error('Please enter your name and a message.')
    }
  }

  useEffect(() => {
    // 웹소켓 연결 및 메시지 구독
    connect(params.slug, (m) => {
      const content = JSON.parse(m.body)
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
  }, [params.slug])

  useEffect(() => {
    if (chatMsg) {
      setMessages(chatMsg)
    }
  }, [chatMsg])

  return (
    <div
      className="w-full overflow-y-scroll chat-content-height"
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
