import { useUserClassQuery } from '@/hooks/queries/useUserQuery'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

// TODO : 데이터 형식에 맞게 수정
const ChatSidebar = () => {
  const { data: userClassData } = useUserClassQuery()
  const params = useParams<Params>()
  const router = useRouter()
  // eslint-disable-next-line eqeqeq
  const matchingClass = userClassData?.find((classItem) => classItem.chatRooms.find((chatRoom) => chatRoom.chatRoomId == params.slug))
  const courseName = matchingClass?.courseName

  const weekRooms = matchingClass?.chatRooms.map((chatRoom) => ({
    week: chatRoom.week,
    roomId: chatRoom.chatRoomId
  }))

  const handleWeekClick = (roomId: number) => {
    router.push(`/chat/${roomId}`)
  }
  return (
    <div className="h-screen w-[315px] bg-[#A1B5DC]  flex flex-col justify-between">
      <div className="flex justify-center py-[31px] ">
        <div>
          <div className="mb-[20px] h-[45px] w-[234px] rounded-18 bg-primary flex justify-center items-center z-10" >
            <p className='text-white  text-lg font-bold'>{courseName}</p>
          </div>
          <div className="flex flex-col items-end gap-[13px] pr-2">
            {weekRooms?.map((item, index) => {
              // eslint-disable-next-line eqeqeq
              const isActive = item.roomId == params.slug
              return (
                <div
                  className={`relative flex h-[32px] w-[187px] items-center justify-center rounded-18 cursor-pointer  ${isActive ? 'bg-white text-primary' : 'bg-white text-black'
                    }`}
                  key={item.roomId}
                  onClick={() => handleWeekClick(item.roomId)}
                >
                  <p className="text-sm relative z-20">{item.week}주차</p>
                  <div className="absolute -left-[10%] -top-1/2 translate-y-1/3 z-10">
                    <Image
                      src="/images/svg/round.svg"
                      alt="round"
                      width={28}
                      height={28}
                    />
                    <div
                      className={`absolute left-0 top-0 w-[3.74px]  bg-white z-10 ${index === weekRooms.length - 1 ? 'h-[10px]' : 'h-[53px]'}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='flex items-center gap-[14px] p-[30px] cursor-pointer' onClick={() => router.push('/home')}>
        <Image src="/images/svg/prev.svg" alt="prev" width={15} height={13} />
        <p>홈으로 가기</p>
      </div>
    </div>
  )
}

export default ChatSidebar
