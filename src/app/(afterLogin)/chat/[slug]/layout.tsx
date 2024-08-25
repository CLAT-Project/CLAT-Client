import ChatHeader from '@/components/chat/ChatHeader'
import ChatSidebar from '@/components/chat/ChatSidebar'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex">
        <ChatSidebar />
        <div style={{ width: 'calc(100% - 315px)' }}>
          <ChatHeader />
          {children}
        </div>
      </body>
    </html>
  )
}

export default ChatLayout
