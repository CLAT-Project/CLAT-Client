import Image from 'next/image'

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
  return (
    <div className="h-screen w-[315px] bg-[#BBC0D2]">
      <div className="flex h-[69px] w-full items-center justify-center bg-[#8A91AC] text-[19px] font-extrabold text-white">
        <p>강의 목록</p>
      </div>
      <div className="flex justify-center py-[25px]">
        <div>
          <div className="mb-[20px] h-[45px] w-[234px] rounded-18 bg-primary"></div>
          <div className="flex flex-col items-end gap-[13px] pr-2">
            {ClASSLIST.map((item, index) => {
              return (
                <div className="relative flex h-[32px] w-[187px] items-center justify-center rounded-18 bg-white">
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
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar
