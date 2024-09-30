/* eslint-disable react/button-has-type */
import { usePostChatMemoMutation } from '@/hooks/mutations/useChatMutation'
import { useEffect, useRef, useState } from 'react'

interface MemoPopupProps {
  messageId: number
  onClose: () => void
  chatRoomId: number
  memoContent?: string
}

const MemoPopup = ({
  messageId,
  onClose,
  chatRoomId,
  memoContent,
}: MemoPopupProps) => {
  const [memo, setMemo] = useState(memoContent ?? '')
  const popupRef = useRef<HTMLDivElement>(null)

  const createMemoMutation = usePostChatMemoMutation()

  const handleSaveMemo = () => {
    createMemoMutation.mutate({
      messageId: Number(messageId),
      chatRoomId: Number(chatRoomId),
      memo,
    })
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSaveMemo()
    }
  }

  const handleTextareaClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div
      ref={popupRef}
      className="z-50 flex h-full w-full flex-col items-start rounded-[20px] bg-[#F5F5F5] px-[21px] py-[20px] shadow-lg"
    >
      <textarea
        className="h-full w-full resize-none rounded-[10px] bg-[#F5F5F5] text-sm focus:outline-none active:outline-none"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        onClick={handleTextareaClick}
        placeholder="간단한 메모를 입력해보세요!"
        maxLength={300}
        onKeyDown={handleKeyDown}
      />
      <div className="w-full text-right text-sm text-gray-500">
        {memo?.length}/300
      </div>
    </div>
  )
}

export default MemoPopup
