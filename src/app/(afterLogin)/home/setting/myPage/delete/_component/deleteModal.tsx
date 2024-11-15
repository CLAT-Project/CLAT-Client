'use client'

import BackButton from '@/components/home/BackButton'
import Image from 'next/image'
import { useState } from 'react'

interface DeleteModalProps {
  onConfirm: (data: { id: string; password: string }) => void // 탈퇴 버튼 클릭 시 호출되는 함수
  formData: { id: string; password: string } // 폼 데이터
}

export default function DeleteModal({ onConfirm, formData }: DeleteModalProps) {
  const [isDeleted, setIsDeleted] = useState(false) // 탈퇴 여부 상태 관리

  const handleDelete = () => {
    // 부모에서 넘겨받은 onConfirm 함수 호출
    onConfirm(formData)
    setIsDeleted(true)
  }

  return (
    <div className="fixed inset-0 bottom-[50px] left-[350px] flex items-center justify-center sm:left-[350px]">
      <main className="absolute flex items-center justify-center rounded-lg border border-black bg-white p-6 md:h-[312px] md:w-[458px]">
        {!isDeleted ? (
          <>
            <div className="absolute right-4 top-3 flex">
              <BackButton />
            </div>

            <div className="mt-6 flex flex-col items-center">
              <div className="mb-5 flex items-center justify-center">
                <Image
                  src="/images/svg/CLAT-LOGO.svg"
                  alt="Logo"
                  width={151}
                  height={53}
                />
              </div>
              <div className="mb-10 font-bold">
                <span>정말 탈퇴하시겠습니까?</span>
              </div>
              <div className="mt-5 flex h-[55px] w-[212px] items-center justify-center rounded-md bg-blue-500 text-base font-medium text-white">
                <button type="button" onClick={handleDelete}>
                  탈퇴하기
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute right-4 top-3 flex">
              <BackButton redirectLogin />
            </div>
            <div className="mt-6 flex flex-col items-center">
              <div className="mb-5 flex items-center justify-center">
                <Image
                  src="/images/svg/check.svg"
                  alt="Logo"
                  width={123}
                  height={123}
                />
              </div>
              <div className="mb-10 text-center font-bold">
                <span>탈퇴가 완료되었습니다.</span>
                <br />
                <span>안녕히 가세요.</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
