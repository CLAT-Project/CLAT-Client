'use client'

import BackButton from '@/components/home/BackButton'
import Image from 'next/image'

interface FormValue {
  username: string
  password: string
}

interface DeleteModalProps {
  onConfirm: (data: FormValue) => void
  formData: FormValue
}

export default function DeleteModal({ onConfirm, formData }: DeleteModalProps) {
  const handleDelete = () => {
    // 부모에서 넘겨받은 onConfirm 함수 호출
    onConfirm(formData)
  }

  return (
    <div className="fixed inset-0 bottom-[50px] left-[350px] flex items-center justify-center sm:left-[350px]">
      <main className="absolute flex items-center justify-center rounded-lg border border-black bg-white p-6 md:h-[312px] md:w-[458px]">
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
      </main>
    </div>
  )
}
