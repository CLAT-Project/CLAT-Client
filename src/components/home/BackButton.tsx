'use client'

import { useRouter } from 'next/navigation'

interface BackButtonProps {
  redirectLogin?: boolean
}

export default function BackButton({ redirectLogin }: BackButtonProps) {
  const router = useRouter()

  const onClose = () => {
    if (redirectLogin) {
      // 탈퇴 완료 상태일 경우 로그인 페이지로
      router.push('/login')
    } else {
      // 그렇지 않으면 이전 페이지로
      router.back()
    }
  }

  return (
    <button type="button" onClick={onClose}>
      ✖
    </button>
  )
}
