import { IChatRoomInfoResponse } from '@/types/chat.types'
import React from 'react'

interface ChatRoomInfoPopupProps {
  chatRoomInfo?: IChatRoomInfoResponse
}

const ChatRoomInfoPopup = ({
  chatRoomInfo,
}: ChatRoomInfoPopupProps) => {
  return (
    <div className="fixed right-10 top-20  flex h-[665px] w-[577px] flex-col justify-between rounded-[20px] border border-[#7889A9] bg-white px-[60px] pb-[35px] pt-[79px] z-30">
      <div className="flex flex-col gap-[60px]">
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
          <p className="text-red-600">채팅방 삭제</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="h-[47px] w-[105px] rounded-[14px] border border-primary text-primary"
        >
          수정 완료
        </button>
      </div>
    </div>
  )
}

export default ChatRoomInfoPopup
