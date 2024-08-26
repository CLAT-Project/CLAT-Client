import Image from 'next/image'

const ChatHeader = () => {
  return (
    <div className="flex h-[69px] w-full items-center justify-between bg-[#363D55] px-[40px] py-[14px] text-white">
      <div className="flex items-center gap-[10px]">
        <Image src="/images/svg/logo.svg" alt="logo" width={41} height={41} />
        <div>
          <p className="text-[20px] font-bold leading-6">단국대</p>
          <p className="text-[13px] leading-4">천안캠</p>
        </div>
      </div>
      <div>
        <p className="text-[19px] font-bold">사고와 표현 3주차</p>
      </div>
      <div>
        <Image src="/images/png/user.png" alt="user" width={40} height={40} />
      </div>
    </div>
  )
}

export default ChatHeader
