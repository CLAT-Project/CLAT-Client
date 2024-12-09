'use client'

import React from 'react'

interface ErrorModalProps {
  errorMessage: string | null
  onClose: () => void
}

export default function errorModal({ errorMessage, onClose }: ErrorModalProps) {
  if (!errorMessage) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-[400px] rounded-lg bg-white p-6">
        <div className="mb-4 text-center font-bold text-red-500">
          <span>{errorMessage}</span>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="h-[35px] w-[100px] rounded-md bg-red-500 font-semibold text-white"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
