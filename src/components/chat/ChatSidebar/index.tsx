import { useUserClassQuery } from '@/hooks/queries/useUserQuery'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

const ClASSLIST = [
  {
    id: 1,
    name: '사고와 표현 3주차',
    weekend: '1주차',
  },
  {
    id: 2,
    name: '사고와 표현 3주차',
    weekend: '2주차',
  },
  {
    id: 3,
    name: '사고와 표현 3주차',
    weekend: '3주차',
  },
  {
    id: 4,
    name: '사고와 표현 3주차',
    weekend: '4주차',
  },
]
// TODO : 데이터 형식에 맞게 수정
const ChatSidebar = () => {
  const { data: userClassData } = useUserClassQuery()
  const params = useParams<Params>()
  const router = useRouter()
  // eslint-disable-next-line eqeqeq
  const courseName = userClassData?.find((classItem) =>
    classItem.chatRooms.find((chatRoom) => chatRoom.chatRoomId == params.slug),
  )?.courseName
  const weeks = userClassData
    ?.find((classItem) =>
      classItem.chatRooms.find(
        (chatRoom) => chatRoom.chatRoomId === params.slug,
      ),
    )
    ?.chatRooms.map((chatRoom) => chatRoom.week)
  return (
    <div className="flex h-screen w-[315px] flex-col justify-between bg-[#A1B5DC]">
      <div className="flex justify-center py-[31px]">
        <div>
          <div className="mb-[20px] flex h-[45px] w-[234px] items-center justify-center rounded-18 bg-primary">
            <p className="text-lg font-bold text-white">{courseName}</p>
          </div>
          <div className="flex flex-col items-end gap-[13px] pr-2">
            {ClASSLIST.map((item, index) => {
              return (
                <div
                  className="relative flex h-[32px] w-[187px] items-center justify-center rounded-18 bg-white"
                  key={item.id}
                >
                  <p className="text-sm">{item.weekend}</p>
                  <div className="absolute -left-[10%] -top-1/2 translate-y-1/3">
                    <Image
                      src="/images/svg/round.svg"
                      alt="round"
                      width={28}
                      height={28}
                    />
                    <div
                      className={`absolute left-0 top-0 w-[3.74px] bg-white ${index === ClASSLIST.length - 1 ? 'h-[10px]' : 'h-[53px]'}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className="flex cursor-pointer items-center gap-[14px] p-[30px]"
        onClick={() => router.push('/home')}
      >
        <Image src="/images/svg/prev.svg" alt="prev" width={15} height={13} />
        <p>홈으로 가기</p>
      </div>
    </div>
  )
}

export default ChatSidebar
