'use client'

import NavigationBar from '@/components/home/navigationBar'
import { useDeleteMutation } from '@/hooks/mutations/useAuthMutation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DeleteModal from './_component/deleteModal'

interface FormValue {
  id: string
  password: string
}

export default function DeleteAccountPage() {
  const router = useRouter() // route.push('/login')
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState<FormValue | null>(null)

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<FormValue>()

  const accountDelete = useDeleteMutation({
    onSuccess: () => {
      // 탈퇴완료되면 안녕히가세요 모달 뜨고 2초후 로그인페이지이동
      setModalOpen(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    },
  })

  // 회원 탈퇴를 실제로 수행하는 함수
  const handleConfirmDelete = () => {
    if (formData) {
      accountDelete.mutate({
        username: formData.id,
        password: formData.password,
      })
    }
  }

  // 확인버튼클릭 시 재확인 모달
  const onSubmitDelete = (data: FormValue) => {
    setModalOpen(true)
    setFormData(data) // 폼 데이터를 상태로 저장
  }

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      {/* 오른쪽 콘텐츠 영역 */}
      <main className="h-3/5 flex-1 overflow-y-auto rounded-lg border border-black p-6">
        <div className="mb-[7px] flex justify-between border-b border-gray-300 pb-2">
          <h1 className="text-2xl font-bold">탈퇴하기</h1>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-[90px]">
            <div className="text-sm text-gray-500">
              아이디와 비밀번호를 입력해주세요
            </div>
          </div>
          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(onSubmitDelete)}
          >
            <div className="mb-11">
              <span className="mr-10 text-base font-medium">아이디</span>
              <input
                className="w-[185px] border-b border-black"
                id="id"
                type="text"
                placeholder="아이디 입력"
                {...register('id', {
                  required: true,
                })}
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
                aria-invalid={isSubmitted && errors.id ? 'true' : 'false'}
              />
            </div>
            <div className="flex h-[55px] w-[155px] items-center justify-center rounded-md bg-blue-500 text-base font-medium text-white">
              <button type="submit">확인</button>
            </div>
          </form>
        </div>
      </main>
      {modalOpen && (
        <DeleteModal onConfirm={handleConfirmDelete} formData={formData!} />
      )}
    </div>
  )
}
