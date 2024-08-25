'use client'

import { useEffect, useState } from 'react'
import ChatHeader from '@/components/chat/ChatHeader'
import ChatSidebar from '@/components/chat/ChatSidebar'
import './chat.css'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className='flex'>
      <ChatSidebar />
      <div className='chat-content-width'>
        <ChatHeader />
        {children}
      </div>
    </div>
  )
}

export default ChatLayout
