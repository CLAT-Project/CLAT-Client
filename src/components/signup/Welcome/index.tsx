import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface WelcomeProps {
  name: string;
}
const Welcome = ({ name }: WelcomeProps) => {
  const route = useRouter()

  const onClickHomeBtn = () => {
    route.push('/')
  }
  const onClickLoginBtn = () => {
    route.push('/login')
  }

  return (
    <>
      <div className="mx-auto w-[60%] flex flex-col items-center mt-[55px] mb-[70px]" >
        <div>
          <Image src="/images/svg/check.svg" alt="checkImg" width={140} height={140} />
        </div>
        <div className='my-[27px] flex flex-col items-center gap-[27px] text-[36px] font-bold'>
          <p>인증 및 회원가입이 완료되었습니다. </p>
          <p><span className='text-primary'>{name}</span> 님을 환영합니다!</p>
        </div>
        <p className='text-[14px] opacity-70'>회원가입 절차가 모두 완료되었습니다. 로그인 후, CLAT으로 익명 보장 질문을 시작해 보세요.</p>
      </div>
      <div className="mx-auto mt-[60px] h-[1px] w-[60%] bg-black opacity-40" />
      <div className='w-full flex justify-center gap-[34px] mt-[67px]'>
        <button className='w-[171px] h-[55px] border border-primary rounded-[9px]' onClick={onClickHomeBtn}>메인화면</button>
        <button className='w-[171px] h-[55px] text-white bg-primary rounded-[9px]' onClick={onClickLoginBtn}>로그인</button>
      </div>
    </>
  )
}

export default Welcome
