'use client'

import { Api } from '@/apis/axios'
import VerifyModal from '@/components/signup/VerifyForm/verifyModal'
import {
  useModifyProfileMutation,
  useVerifyCodeMutation,
  useVerifyEmailMutation,
} from '@/hooks/mutations/useAuthMutation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Profile {
  name?: string
  email?: string
  password?: string
  newEmail?: string
}

export default function UserInfoPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false) // 이메일 인증 여부

  const { register, handleSubmit, reset, watch, getValues } = useForm<Profile>()

  const modifyProfile = useModifyProfileMutation()
  const verifyEmail = useVerifyEmailMutation()
  const verifyCode = useVerifyCodeMutation({
    onSuccessFallback: () => {
      setEmailVerified(true)
      alert('인증되었습니다.')
      setModalOpen(false)
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await Api.get('/my-profile')
        reset({
          ...response.data, // name, email만 기존값
          password: null,
          newEmail: null,
        })
      } catch (err) {
        console.error('프로필 정보 조회 실패:', err)
      }
    }

    fetchProfile()
  }, [reset])

  const onEmailVerify = async () => {
    const email = watch('email') // 현재 입력된 이메일
    if (!email) {
      alert('이메일을 입력하세요!')
      return
    }

    setModalOpen(true)
    verifyEmail.mutate({ email })
  }

  const onSubmitVerifyCode = (verificationCode: string) => {
    const email = watch('email') || ''

    if (!email) {
      alert('이메일을 입력하세요!')
      return
    }

    verifyCode.mutate({
      email,
      verificationCode: Number(verificationCode),
    })
  }

  const onSubmitModify = async () => {
    try {
      const { name, newEmail, password } = getValues()

      // console.log({ name, newEmail, password, emailVerified })

      const newData: Profile = {}
      if (name) newData.name = name
      if (password) newData.password = password
      if (newEmail) newData.email = newEmail

      modifyProfile.mutate({
        newData,
        emailVerified,
      })
    } catch (err) {
      console.error('회원 정보 수정 실패:', err)
    }
  }

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center justify-center">
        <div className="h-[580px] w-auto overflow-y-auto rounded-lg border border-black p-6 sm:h-[580px] sm:w-[700px]">
          <div className="mb-[7px] flex justify-center border-b border-gray-300 pb-2">
            <h1 className="text-2xl font-bold">내 정보 변경</h1>
          </div>
          <form className="ml-5 mr-5" onSubmit={handleSubmit(onSubmitModify)}>
            <div className="space-y-10">
              {/* 별명 */}
              <div className="mt-[50px] flex items-center justify-between">
                <span className="mr-20 block w-14 text-lg font-medium sm:text-lg">
                  닉네임
                </span>
                <div className="flex justify-end">
                  <input
                    type="text"
                    {...register('name')}
                    className="border-b"
                  />
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="flex items-center justify-between">
                <span className="block text-lg font-medium sm:text-lg">
                  비밀번호 변경
                </span>
                <input
                  type="password"
                  {...register('password')}
                  className="border-b"
                  placeholder="새 비밀번호"
                />
              </div>

              <div className="mt-[200px] flex justify-between">
                <div>
                  <span className="text-lg font-medium sm:text-lg">이메일</span>
                </div>

                {/* 기존 이메일 */}
                <div className="flex-col">
                  <div className="flex">
                    <div>
                      <input
                        type="email"
                        {...register('email', {
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: '올바른 이메일 형식을 입력하세요.',
                          },
                        })}
                        className="mr-5 border-b"
                        placeholder="기존 이메일"
                      />
                      <div className="text-xs text-gray-500">
                        현재 이메일을 인증 해주세요.
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={onEmailVerify}
                        type="button"
                        className="h-[30px] w-[40px] items-center justify-center rounded-md bg-blue-700 text-sm text-white"
                      >
                        인증
                      </button>
                    </div>
                  </div>

                  {/* 인증 코드 */}
                  {modalOpen && (
                    <VerifyModal
                      onClose={() => setModalOpen(false)}
                      onVerify={onSubmitVerifyCode}
                    />
                  )}

                  {/* 새 이메일 */}
                  <div className="mt-7 flex items-center justify-start">
                    <div>
                      <input
                        type="email"
                        placeholder="새 이메일"
                        {...register('newEmail')}
                        className="border-b"
                      />
                      <div className="text-xs text-gray-500">
                        새 이메일을 입력해주세요.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 회원정보 수정버튼 */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-11 flex h-[40px] w-[120px] items-center justify-center rounded-md bg-blue-700 text-white"
                >
                  회원 정보 수정
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
