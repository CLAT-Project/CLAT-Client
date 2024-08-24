import Image from 'next/image'

const ClASSLIST = [{
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
    <div className="w-[315px] h-full bg-[#BBC0D2]">
      <div className="bg-[#8A91AC] w-full h-[69px] flex items-center justify-center text-[19px] font-extrabold text-white">
        <p>강의 목록</p>
      </div>
      <div className="flex justify-center py-[25px]">
        <div>
          <div className="bg-primary w-[234px] h-[45px] rounded-18 mb-[20px]"></div>
          <div className="flex flex-col gap-[13px] items-end pr-2">
            {ClASSLIST.map((item, index) => {
              return (
                <div className="bg-white w-[187px] h-[32px] rounded-18 relative flex justify-center items-center">
                  <p className='text-sm'>{item.weekend}</p>
                  <div className='absolute -left-[10%] -top-1/2 translate-y-1/3'>
                    <Image src="/images/svg/round.svg" alt="round" width={28} height={28} />
                    <div className={`absolute left-0 top-0 bg-white w-[3.74px] ${index === ClASSLIST.length - 1 ? 'h-[10px]' : 'h-[53px]'}`}>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  )
}

export default ChatSidebar