'use client'

import authApi from '@/apis/auth'
import { useReconfirmPassword } from '@/hooks/mutations/useAuthMutation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormValue {
  id: string
  password: string
}

export default function ReconfirmPage() {
  const [username, setUsername] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<FormValue>()

  const { mutate: reconfirmPassword } = useReconfirmPassword({
    onSuccess: () => {
      console.log('인증 성공')
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userInfo = await authApi.getUserName()
        setUsername(userInfo.username)
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error)
      }
    }

    fetchUserName()
  }, [])

  const handleReconfirm = (data: FormValue) => {
    reconfirmPassword({ password: data.password })
  }

  return (
    <div className="flex h-screen">
      {/* 오른쪽 콘텐츠 영역 */}
      <main className="h-3/5 flex-1 overflow-y-auto rounded-lg border border-black p-6">
        <div className="mb-[7px] flex justify-center border-b border-gray-300 pb-2">
          <h1 className="text-2xl font-bold">비밀번호 재확인</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-[90px]">
            <div className="text-sm text-gray-500">
              개인정보보호를 위해 회원님의 비밀번호를 다시 한번 확인합니다.
            </div>
          </div>

          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(handleReconfirm)}
          >
            <div className="mb-11">
              <span className="mr-10 text-base font-medium">아이디</span>
              <input
                className="w-[185px]"
                id="id"
                type="text"
                value={username}
                {...register('id')}
                readOnly
                aria-invalid={isSubmitted && errors.id ? 'true' : 'false'}
              />
            </div>
            <div className="mb-24">
              <span className="mr-6 text-base font-medium">비밀번호</span>
              <input
                className="w-[185px] border-b border-black"
                id="password"
                type="password"
                placeholder="비밀번호 입력"
                {...register('password', {
                  required: true,
                })}
                aria-invalid={isSubmitted && errors.password ? 'true' : 'false'}
              />
            </div>
            <div className="flex h-[55px] w-[155px] items-center justify-center rounded-md bg-blue-500 text-base font-medium text-white">
              <button type="submit" className="h-auto w-full">
                확인
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
