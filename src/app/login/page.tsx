import Image from 'next/image'
import './login.css'

const Login = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute left-0 top-0 h-full w-full">
        <Image
          src="/images/png/background.png"
          alt="background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="trnasform z-1 absolute left-1/2 top-1/2 flex h-[703px] w-[504px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[49px] bg-white shadow-login">
        <div className="flex justify-center pb-[40px] pt-[147px]">
          <Image
            src="/images/svg/CLAT-LOGO.svg"
            alt="Logo"
            width={195}
            height={69}
          />
        </div>
        <div className="flex w-[331px] flex-col">
          <p className="text-[18px] font-bold">LOGIN</p>
          <form className="mt-[9px]">
            <div className="flex flex-col gap-[16px]">
              <div className="input-with-login-icon">
                <input
                  className="h-[52px] w-full rounded-[18px] border border-[#616161] px-[45px] py-[12px] focus:outline-none"
                  type="text"
                  placeholder="이메일"
                />
              </div>
              <div className="input-with-password-icon">
                <input
                  className="h-[52px] w-full rounded-[18px] border border-[#616161] px-[45px] py-[12px] focus:outline-none"
                  type="password"
                  placeholder="비밀번호"
                />
              </div>
              <div className="h-[39px]">
                {/* <p className=' text-[8px] text-center'>올바르지 않은 이메일 또는 비밀번호입니다.</p> */}
              </div>
            </div>
            <button className="h-[52px] w-full rounded-[18px] bg-primary text-white">
              로그인
            </button>
          </form>
          <div className='mt-[36px] flex flex-col gap-[10px] text-center text-[14px] font-light text-lightBlack'>
            <p className='cursor-pointer'>비밀번호를 잊으셨나요?</p>
            <p className='cursor-pointer'>회원가입 하기</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
