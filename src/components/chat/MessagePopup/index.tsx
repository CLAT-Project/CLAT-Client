import { useBookmarkMutation } from '@/hooks/mutations/useChatMutation'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface MessagePopupProps {
  message: string
  messageId: number
  onMemoClick: (messageId: number) => void
  isMessager: boolean
}

const MessagePopup = ({
  message,
  messageId,
  onMemoClick,
  isMessager,
}: MessagePopupProps) => {
  const bookmarkMutation = useBookmarkMutation()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      const truncatedMessage =
        message.length > 20 ? `${message.slice(0, 20)}...` : message
      toast.success(`"${truncatedMessage}" 
        복사 되었습니다.`)
    } catch (error) {
      toast.error('복사 실패')
    }
  }

  const handleMemoClick = () => {
    onMemoClick(messageId)
  }

  const handleBookmark = () => {
    bookmarkMutation.mutate(messageId)
  }

  return (
    <div className="relative flex flex-col items-start rounded-[20px] bg-[#F5F5F5] px-[18px] py-[13px] shadow-lg">
      <div className="flex w-full items-center justify-center gap-[4px]">
        <Image
          src="/images/png/heart.png"
          alt="file"
          width={45}
          height={45}
          quality={100}
          className="h-[28px] w-[28px]"
        />
        <Image
          src="/images/png/crying.png"
          alt="file"
          width={45}
          height={45}
          quality={100}
          className="h-[28px] w-[28px]"
        />
        <Image
          src="/images/png/good.png"
          alt="file"
          width={45}
          height={45}
          quality={100}
          className="h-[28px] w-[28px]"
        />
      </div>
      <div className="my-[7px] h-[0.2px] w-[100px] bg-[#A1A1A1]" />
      <div
        className="w-[100%] rounded-[10px] transition-colors duration-200 hover:bg-[#DDDDDD]"
        onClick={handleCopy}
      >
        <p className="px-[10px]">복사</p>
      </div>
      <div className="my-[7px] h-[0.2px] w-[100px] bg-[#A1A1A1]" />
      <div
        className="w-[100%] rounded-[10px] transition-colors duration-200 hover:bg-[#DDDDDD]"
        onClick={handleBookmark}
      >
        <p className="px-[10px]">북마크</p>
      </div>
      {isMessager ? (
        <>
          <div className="my-[7px] h-[0.2px] w-[100px] bg-[#A1A1A1]" />

          <div
            className="w-[100%] rounded-[10px] transition-colors duration-200 hover:bg-[#DDDDDD]"
            onClick={handleMemoClick}
          >
            <p className="px-[10px]">메모하기</p>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default MessagePopup
