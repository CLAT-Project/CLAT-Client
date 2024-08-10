import Image from 'next/image'
import './signupHeader.css'

const SignupHeader = () => {
  return (
    <div>
      <div className="flex justify-center pb-[50px] pt-[76px]">
        <Image
          src="/images/svg/CLAT-LOGO.svg"
          alt="Logo"
          width={151}
          height={53}
        />
      </div>
      <div className="flex justify-center">
        <div className="signup-progress-bar">
          <div className="signuo-progress-circle left-[-2%]">
            <div className="absolute left-1/2 top-[120%] w-[120px] -translate-x-1/2 text-center text-[12px] opacity-70">
              회원정보
            </div>
          </div>
          <div className="signuo-progress-circle left-[48%] -translate-x-1/2">
            <div className="absolute left-1/2 top-[120%] w-[120px] -translate-x-1/2 text-center text-[12px] opacity-70">
              본인인증
            </div>
          </div>
          <div className="signuo-progress-circle left-[98%]">
            <div className="absolute left-1/2 top-[120%] w-[120px] -translate-x-1/2 text-center text-[12px] opacity-70">
              인증 확인 및 완료
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-[60px] h-[1px] w-[60%] bg-black opacity-40" />
    </div>
  )
}

export default SignupHeader
