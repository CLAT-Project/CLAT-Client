'use client'

import authApi from '@/apis/auth'
import NavigationBar from '@/components/home/navigationBar'
import { useDeleteMutation } from '@/hooks/mutations/useAuthMutation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import DeleteModal from './_component/deleteModal'
import ErrorModal from './_component/errorModal'
import DeleteSuccess from './_component/deleteSuccess'

interface FormValue {
  id: string
  password: string
}

export default function DeleteAccountPage() {
  const router = useRouter() // route.push('/login')
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState<FormValue | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [username, setUsername] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitted, errors },
  } = useForm<FormValue>()

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

  const accountDelete = useDeleteMutation({
    onSuccess: () => {
      // 탈퇴성공시 에러메세지 제거
      setErrorMessage(null)
      // 탈퇴 성공시 탈퇴확인버튼과 감사합니다 모달
      setModalOpen(true)
      setDeleteSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    },
    // 아이디와 비밀번호가 다른경우
    onError: (error) => {
      setModalOpen(false)
      setErrorMessage(error.message)
    },
  })

  // 회원 탈퇴를 실제로 수행하는 함수
  const handleConfirmDelete = () => {
    if (formData) {
      accountDelete.mutate({
        username,
        password: formData.password,
      })
    }
  }

  // 확인버튼클릭 시 재확인 모달
  const onSubmitDelete = (data: FormValue) => {
    setModalOpen(true)
    setFormData(data)
  }

  const handleErrorModalClose = () => {
    setErrorMessage(null) // 에러 메시지 초기화하고 모달 닫기
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
            <div className="text-sm text-gray-500">비밀번호를 입력해주세요</div>
          </div>

          <form
            className="flex flex-col items-center"
            onSubmit={handleSubmit(onSubmitDelete)}
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
              <button type="submit">확인</button>
            </div>
          </form>
        </div>
      </main>

      {modalOpen && formData && !errorMessage && !deleteSuccess && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          formData={{ username: formData.id, password: formData.password }}
        />
      )}
      {deleteSuccess && <DeleteSuccess />}
      {errorMessage && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={handleErrorModalClose}
        />
      )}
    </div>
  )
}
