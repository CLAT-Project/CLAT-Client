import ChatRoomInfoPopup from '@/components/chat/ChatRoomInfoPopup';
import useUser from '@/hooks/common/useUser';
import { useChatRoomInfoQuery } from '@/hooks/queries/useChatQuery';
import { useUserQuery } from '@/hooks/queries/useUserQuery'
import Image from 'next/image'
import { useState } from 'react';

interface IChatHeaderProps {
  className: string
  roomId: string;
}
const ChatHeader = ({ className, roomId }: IChatHeaderProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const { isProfessor } = useUser()

  const { data: userData } = useUserQuery()
  const { data: chatRoomInfo } = useChatRoomInfoQuery(Number(roomId))

  const handleSettingClick = () => {
    setShowPopup(!showPopup);
  };


  return (
    <>
      <div className="flex h-[69px] w-full items-center justify-between bg-white px-[40px] py-[14px]">
        <div className="flex items-center gap-[10px]">
          <Image src="/images/svg/logo.svg" alt="logo" width={41} height={41} />
          <div>
            <p className="text-[20px] font-bold leading-6">
              {userData?.schoolName}
            </p>
            <p className="text-[13px] leading-4">{userData?.username}</p>
          </div>
        </div>
        <div>
          <p className="text-[19px] font-bold">{className}</p>
        </div>
        <div className="flex items-center gap-[12px]">
          {isProfessor && (
            <Image
              src="/images/svg/setting.svg"
              alt="setting"
              width={26}
              height={26}
              className="cursor-pointer"
              onClick={handleSettingClick}
            />
          )}
          <Image
            src="/images/png/user.png"
            alt="user"
            width={40}
            height={40}
            className="cursor-pointer rounded-full border"
          />
        </div>
      </div>
      {showPopup && (
        <ChatRoomInfoPopup
          chatRoomInfo={chatRoomInfo}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  )
}

export default ChatHeader
