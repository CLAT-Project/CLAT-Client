import { IChatRoomInfoResponse } from '@/types/chat.types';
import React from 'react';

interface ChatRoomInfoPopupProps {
  chatRoomInfo?: IChatRoomInfoResponse;
  onClose: () => void;
}

const ChatRoomInfoPopup = ({ chatRoomInfo, onClose }: ChatRoomInfoPopupProps) => {
  return (
    <div className="fixed top-20 right-10 w-[577px] h-[665px] border border-[#7889A9] bg-white z-10 rounded-[20px] pt-[79px] pb-[35px] px-[60px] flex flex-col justify-between">
      <div className="flex flex-col gap-[60px] ">
        <div className="flex">
          <p className="w-[190px]">채팅방 이름</p>
          <p>{chatRoomInfo?.chatRoomName}</p>
        </div>
        <div className="flex">
          <p className="w-[190px]">채팅방 개설일</p>
          <p>{chatRoomInfo?.creationTime}</p>
        </div>
        <div className="flex">
          <p className="w-[190px]">채팅방 인증번호</p>
          <p>{chatRoomInfo?.roomKey}</p>
        </div>
        <div className="flex">
          <p className="w-[190px]">채팅방 자동 삭제 예약</p>
          <p>2021.06.28 / 14:00</p>
        </div>
        <div>
          <p className='text-red-600'>채팅방 삭제</p>
        </div>
      </div >
      <div className='flex justify-end'>
        <button type='button' className='w-[105px] h-[47px] rounded-[14px] border border-primary text-primary'>수정 완료</button>
      </div>
    </div >
  );
};

export default ChatRoomInfoPopup;