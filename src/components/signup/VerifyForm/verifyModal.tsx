'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface VerifyModalProps {
  onVerify: (verificationCode: string) => void
  onClose: () => void
}

export default function VerifyModal({ onVerify, onClose }: VerifyModalProps) {
  const [verificationCode, setVerificationCode] = useState('')

  const handleVerify = () => {
    if (!verificationCode.trim()) {
      alert('인증 코드를 입력하세요.')
      return
    }
    onVerify(verificationCode)
  }
  return (
    <div className="fixed inset-0 bottom-[50px] left-[350px] flex items-center justify-center sm:left-[350px]">
      <main className="absolute flex items-center justify-center rounded-lg border border-black bg-white p-6 md:h-[100px] md:w-[400px]">
        <div className="absolute right-2 top-3">
          <button onClick={onClose} type="button">
            <Image
              src="/images/svg/close.svg"
              alt="arrow-login"
              width={15}
              height={15}
              className="mr-2"
            />
          </button>
        </div>

        <div className="mt-7 flex items-center justify-center">
          <input
            type="text"
            value={verificationCode}
            placeholder="인증 코드를 입력하세요."
            onChange={(e) => setVerificationCode(e.target.value)}
            className="mr-5 border-b"
          />

          <button
            onClick={handleVerify}
            type="button"
            className="h-[30px] w-[40px] items-center justify-center rounded-md bg-blue-700 text-sm text-white"
          >
            확인
          </button>
        </div>
      </main>
    </div>
  )
}
