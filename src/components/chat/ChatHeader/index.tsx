import Image from 'next/image'

interface IChatHeaderProps {
  className: string
}
const ChatHeader = ({ className }: IChatHeaderProps) => {
  return (
    <div className="flex h-[69px] w-full items-center justify-between bg-white px-[40px] py-[14px]">
      <div className="flex items-center gap-[10px]">
        <Image src="/images/svg/logo.svg" alt="logo" width={41} height={41} />
        <div>
          <p className="text-[20px] font-bold leading-6">단국대</p>
          <p className="text-[13px] leading-4">천안캠</p>
        </div>
      </div>
      <div>
        <p className="text-[19px] font-bold">{className}</p>
      </div>
      <div>
        <Image src="/images/png/user.png" alt="user" width={40} height={40} className='border rounded-full' />
      </div>
    </div>
  )
}

export default ChatHeader
