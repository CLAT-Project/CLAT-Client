'use client';

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

  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IChatMessag[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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
    <div id="chat-container" className="flex flex-col h-screen p-4">
      <div id="messages" className="flex-1 overflow-auto border p-2 mb-2 bg-gray-100">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderName}:</strong> {msg.message}
            <span style={{ color: 'grey', fontSize: '0.8em' }}>
            </span>
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div id="input-container" className="flex flex-col">
        <input
          type="text"
          placeholder="Your Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          className="mb-2 p-2 border"
        />
        <input
          type="text"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-2 p-2 border"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>

  )
}

export default Chat