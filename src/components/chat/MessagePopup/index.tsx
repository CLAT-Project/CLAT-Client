import Image from "next/image";

interface MessagePopupProps {
  messageId: string;
  onClose: () => void;
}

const MessagePopup = ({ messageId, onClose }: MessagePopupProps) => {
  return (
    <div className="bg-[#F5F5F5] py-[13px] px-[18px] shadow-lg z-50 rounded-[20px] flex flex-col items-start" >
      <div className="flex items-center gap-[4px] justify-center w-full">
        <Image src="/images/png/heart.png" alt="file" width={45} height={45} quality={100} className='w-[28px] h-[28px]' />
        <Image src="/images/png/crying.png" alt="file" width={45} height={45} quality={100} className='w-[28px] h-[28px]' />
        <Image src="/images/png/good.png" alt="file" width={45} height={45} quality={100} className='w-[28px] h-[28px]' />
      </div>
      <div className="w-[100px] h-[0.2px] bg-[#A1A1A1] my-[7px]" />
      <div className="hover:bg-[#DDDDDD] transition-colors duration-200 w-[100%] rounded-[10px]">
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