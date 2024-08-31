import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface WelcomeProps {
  name: string
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
      <div className="mx-auto mb-[70px] mt-[55px] flex w-[60%] flex-col items-center">
        <div>
          <Image
            src="/images/svg/check.svg"
            alt="checkImg"
            width={140}
            height={140}
          />
        </div>
        <div className="my-[27px] flex flex-col items-center gap-[27px] text-[36px] font-bold">
          <p>인증 및 회원가입이 완료되었습니다. </p>
          <p>
            <span className="text-primary">{name}</span> 님을 환영합니다!
          </p>
        </div>
        <p className="text-[14px] opacity-70">
          회원가입 절차가 모두 완료되었습니다. 로그인 후, CLAT으로 익명 보장
          질문을 시작해 보세요.
        </p>
      </div>
      <div className="mx-auto mt-[60px] h-[1px] w-[60%] bg-black opacity-40" />
      <div className="mt-[67px] flex w-full justify-center gap-[34px]">
        <button
          type="button"
          className="h-[55px] w-[171px] rounded-[9px] border border-primary"
          onClick={onClickHomeBtn}
        >
          메인화면
        </button>
        <button
          type="button"
          className="h-[55px] w-[171px] rounded-[9px] bg-primary text-white"
          onClick={onClickLoginBtn}
        >
          로그인
        </button>
      </div>
    </>
  )
}

export default Welcome
