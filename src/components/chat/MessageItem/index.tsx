/* eslint-disable @typescript-eslint/no-shadow */
import MemoPopup from '@/components/chat/MemoPopup';
import MessagePopup from '@/components/chat/MessagePopup';
import { useChatMemoListQuery, useChatMemoQuery } from '@/hooks/queries/useChatQuery';
import { IChatMessag } from '@/types/chat.types';
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react';

interface IMessageItemProps {
  msg: {
    messageId: number;
    message: string;
    answerId?: number;
    answer: string;
  };
  messages: IChatMessag;
  isMessager: boolean;
  handleSwipe: (messageId: number, message: string) => void
  isMemoedMessage: boolean;
  chatRoomId: number;
  setMemoedMessageIds: React.Dispatch<React.SetStateAction<number[]>>;
  setAnswering: React.Dispatch<React.SetStateAction<boolean>>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setAnswerMessageId: React.Dispatch<React.SetStateAction<number>>;
  isAnswering: boolean;
}

const MessageItem = ({ msg, isMessager, handleSwipe, isMemoedMessage, chatRoomId, setMemoedMessageIds, messages, setAnswering, setAnswer, setAnswerMessageId, isAnswering }: IMessageItemProps) => {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [0, 50],
    ["#fff", "#c8d5ec"]
  );

  const [isDragging, setIsDragging] = useState(false);
  const [memoMessageId, setMemoMessageId] = useState<number>();
  const [memoContent, setMemoContent] = useState<{ [key: number]: string }>({})
  const [showMemoPopup, setShowMemoPopup] = useState(false)
  const [showMessagePopup, setShowMessagePopup] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  )
  const { data: chatMemo, refetch: refetchChatMemo } = useChatMemoQuery(memoMessageId ?? 0)
  const { data: chatMemoList } = useChatMemoListQuery(chatRoomId)

  const handlePopupToggle = (msgId: number) => {
    setSelectedMessageId((prevId) => (prevId === msgId ? null : msgId))
    setShowMessagePopup(!showMessagePopup)
  }

  const onClickMemo = async (messageId: number) => {
    setMemoMessageId(messageId);
    setShowMemoPopup(true);
    setShowMessagePopup(false);
    await refetchChatMemo();
    if (chatMemo) {
      setMemoContent(prevContent => ({
        ...prevContent,
        [messageId]: chatMemo.memo
      }));
    }
  }


  const handleMemoClick = (msgId: number) => {
    setMemoMessageId(msgId);
    setShowMemoPopup(true);
    setShowMessagePopup(false);
    setMemoContent('')
  };

  useEffect(() => {
    if (!isAnswering) {
      x.set(0);
    }
  }, [isAnswering, x]);


  useEffect(() => {
    if (messages && chatMemoList) {
      const memoedIds = messages.messageFileResponseDTOS
        .filter(msg => chatMemoList.some(memo => memo.messageId === msg.messageId))
        .map(msg => msg.messageId)
      setMemoedMessageIds(memoedIds)

      const memoContents = Object.fromEntries(
        chatMemoList.map(memo => [memo.messageId, memo.memo])
      )


      setMemoContent(memoContents)
    }
  }, [messages, chatMemoList])

  return (
    <div className="relative mb-4">
      <motion.div
        className={`relative max-w-[600px] cursor-pointer rounded-[21px] border border-[#363D55] py-[10px] pl-[18px] pr-[33px] z-50 `}
        onClick={() => handlePopupToggle(Number(msg.messageId))}
        style={{ x, background }}
        drag="x"
        dragSnapToOrigin={false}
        dragConstraints={{ left: 0, right: 50 }}
        onDragStart={() => setIsDragging(true)}
        onDrag={(event, info) => {
          if (isDragging && info.offset.x < 50 && !isMessager) {
            setAnswering(true);
            setAnswer(msg.message); // 메시지 내용을 답변으로 설정
            setAnswerMessageId(msg.messageId); // 메시지 ID를 답변 메시지 ID로 설정
          }
        }}
        onDragEnd={(event, info) => {
          setIsDragging(false);
          if (info.offset.x < 50 && !isMessager) {
            if (isAnswering) {
              handleSwipe(msg.messageId, msg.message);
              x.set(50); // 드래그된 위치에 고정
            } else {
              x.set(0); // isAnswering이 false이면 원위치로
            }
          } else {
            x.set(0); // 충분히 드래그되지 않았다면 원위치로
          }
        }}
      >
        <div className="flex items-center">
          <p className="w-full break-words text-[16px]">
            {msg.message}
          </p>
        </div>

        {isMemoedMessage && (
          <div
            className={`absolute -top-[10px] bg-[#FF9900] w-[22px] h-[22px] rounded-full ${isMessager ? 'sender' : 'receiver'}`}
            onClick={(e) => {
              e.stopPropagation();
              onClickMemo(msg.messageId);
            }}
          />
        )}

        {showMessagePopup && selectedMessageId === msg.messageId && (
          <div
            className={`absolute -top-[110px] ${isMessager ? 'right-[106%]' : 'left-[106%]'} z-50 h-[174px] w-[134px]`}
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
          <div className={`absolute z-50 -top-1/2 w-[351px] h-[174px] ${isMessager ? 'right-[106%]' : 'left-[106%]'} ml-2 mr-2`}>
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
  );
};

export default MessageItem;
