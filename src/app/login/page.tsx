'use client'

import Image from 'next/image'
import './login.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useSigninMutation } from '@/hooks/mutations/useAuthMutation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormValue {
  id: string
  password: string
}

const Login = () => {
  const route = useRouter()
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<FormValue>()

  const signin = useSigninMutation({
    onSuccess: () => {
      route.push('/home')
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data.message ?? '로그인에 실패하였습니다.')
    },
  })

  const onSubmitSignin = (data: FormValue) => {
    signin.mutate({
      username: data.id,
      password: data.password,
    })
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      // 이미 로그인된 상태라면 홈으로 리다이렉트
      route.push('/home')
    }
  }, [route])

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
          <form className="mt-[12px]" onSubmit={handleSubmit(onSubmitSignin)}>
            <div className="flex flex-col gap-[16px]">
              <div className="input-with-login-icon">
                <input
                  id="id"
                  className={`h-[52px] w-full rounded-18 border border-[#616161] px-[45px] py-[12px] focus:outline-none ${errors.id ? 'border-errorRed shadow-inner' : 'border-[#616161]'}`}
                  type="text"
                  placeholder="아이디"
                  {...register('id', {
                    required: true,
                  })}
                  aria-invalid={isSubmitted && errors.id ? 'true' : 'false'}
                />
              </div>
              <div className="input-with-password-icon">
                <input
                  id="password"
                  className={`h-[52px] w-full rounded-18 border border-[#616161] px-[45px] py-[12px] focus:outline-none ${errors.password ? 'border-errorRed shadow-inner' : 'border-[#616161]'}`}
                  type="password"
                  placeholder="비밀번호"
                  {...register('password', {
                    required: true,
                  })}
                  aria-invalid={
                    isSubmitted && errors.password ? 'true' : 'false'
                  }
                />
              </div>
            </div>
            <div className="flex h-[39px] items-center justify-center gap-2">
              {errorMsg && (
                <>
                  <p>
                    <Image
                      src="/images/svg/info.svg"
                      width={8}
                      height={8}
                      alt="info"
                    />
                  </p>
                  <p className="relative inline-block text-center text-[10px] text-errorRed">
                    {errorMsg}
                  </p>
                </>
              )}
            </div>
            <button
              className="h-[52px] w-full rounded-18 bg-primary text-white"
              type="submit"
              disabled={isSubmitting}
            >
              로그인
            </button>
          </form>
          <div className="mt-[36px] flex flex-col gap-[10px] text-center text-[14px] font-light text-lightBlack">
            <Link href="/login/find/password">
              <p className="cursor-pointer">비밀번호를 잊으셨나요?</p>
            </Link>
            <Link href="/signup">
              <p className="cursor-pointer">회원가입 하기</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
