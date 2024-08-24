'use client';

import ChatHeader from "@/components/chat/ChatHeader";
import ChatSidebar from "@/components/chat/ChatSidebar";
import { useChatMsgQuery } from "@/hooks/queries/useChatQuery"
import { connect, disconnect, sendMessage } from "@/libs/websocket";
import { IChatMessag } from "@/types/chat.types";
import { useQueryClient } from "@tanstack/react-query";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Chat = () => {
  const queryClient = useQueryClient();
  const params = useParams<Params>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IChatMessag[]>([]);

  const { data: chatMsg } = useChatMsgQuery({ roomId: params.slug });

  const handleSendMessage = () => {
    if (senderName && message) {
      sendMessage('/pub/chat/message', JSON.stringify({
        courseId: params.slug,
        senderName,
        message
      }));
      queryClient.invalidateQueries({ queryKey: ['chatMsg'] });
      setMessage('');
    } else {
      alert('Please enter your name and a message.');
    }
  };

  useEffect(() => {
    // 웹소켓 연결 및 메시지 구독
    connect(params.slug, (message) => {
      const content = JSON.parse(message.body);
      const newMessage = {
        senderName: content.senderName,
        message: content.message,
        timestamp: content.timestamp
      };
      setMessages((prevMessages) => [...prevMessages, newMessage.message]);
    });

    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatMsg) {
      setMessages(chatMsg)
    }
  }, [chatMsg])


  return (
    <div>
      <div className="flex w-full h-screen">
        <ChatSidebar />
        <ChatHeader />
      </div>
    </div>

  )
}

export default Chat