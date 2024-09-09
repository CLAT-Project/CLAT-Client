import Image from "next/image";
import toast from "react-hot-toast";

interface MessagePopupProps {
  messageId: string;
  message: string;
  onClose: () => void;
}

const MessagePopup = ({ messageId, onClose, message }: MessagePopupProps) => {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      const truncatedMessage = message.length > 20 ? `${message.slice(0, 20)}...` : message;
      toast.success(`"${truncatedMessage}" 
        복사 되었습니다.`);
    } catch (error) {
      toast.error('복사 실패')
    }
  };

  return (
    <div className="bg-[#F5F5F5] py-[13px] px-[18px] shadow-lg z-50 rounded-[20px] flex flex-col items-start" >
      <div className="flex items-center gap-[4px] justify-center w-full">
        <Image src="/images/png/heart.png" alt="file" width={45} height={45} quality={100} className='w-[28px] h-[28px]' />
        <Image src="/images/png/crying.png" alt="file" width={45} height={45} quality={100} className='w-[28px] h-[28px]' />
        <Image src="/images/png/good.png" alt="file" width={45} height={45} quality={100} className='w-[28px] h-[28px]' />
      </div>
      <div className="w-[100px] h-[0.2px] bg-[#A1A1A1] my-[7px]" />
      <div className="hover:bg-[#DDDDDD] transition-colors duration-200 w-[100%] rounded-[10px]" onClick={handleCopy}>
        <p className=" px-[10px] ">복사</p>
      </div>
      <div className="w-[100px] h-[0.2px] bg-[#A1A1A1] my-[7px]" />
      <div className="hover:bg-[#DDDDDD] transition-colors duration-200 w-[100%] rounded-[10px]">
        <p className=" px-[10px]">북마크</p>
      </div>
      <div className="w-[100px] h-[0.2px] bg-[#A1A1A1] my-[7px]" />
      <div className="hover:bg-[#DDDDDD] transition-colors duration-200 w-[100%] rounded-[10px]">
        <p className=" px-[10px]">메모하기</p>
      </div>
    </div>
  );
};

export default MessagePopup;