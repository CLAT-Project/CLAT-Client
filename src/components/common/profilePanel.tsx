'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLogoutMutation } from '@/hooks/mutations/useAuthMutation'
import { useUserQuery } from '@/hooks/queries/useUserQuery'

interface Notification {
  id: number
  message: string
  read: boolean
}

const ProfilePanel = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [username, setUsername] = useState('User Name')
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: '답변', read: false },
    { id: 2, message: '세모세모 도형', read: true },
    { id: 3, message: '네트워크 7계층', read: true },
    { id: 4, message: '어쩌구 저쩌구? ??', read: true },
    { id: 5, message: '헤더 값 훔치는 방법', read: true },
    { id: 6, message: 'order as b', read: true },
    { id: 7, message: 'at 3 PM', read: false },
  ])

  const logoutMutation = useLogoutMutation()
  const { data: userData } = useUserQuery()

  const panelRef = useRef<HTMLDivElement>(null)

  const handleClick = (event: MouseEvent) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target as HTMLElement)
    ) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  })

  return (
    <div
      ref={panelRef}
      className={`fixed right-0 top-0 h-3/4 w-1/4 transform rounded-l-3xl bg-slate-500 bg-opacity-70 p-7 text-white ${isOpen ? 'rounded-l-lg-costum translate-x-0' : 'translate-x-full'} transition-transform duration-300`}
    >
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-2 py-1 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {/* 상단 */}
      <div className="mb-4 flex items-center justify-end border-b border-white pb-2">
        <div className="mr-4 text-right">
          <h6 className="text-xs">어서오세요!</h6>
          <h5 className="mt-1 text-sm">{userData?.name}님</h5>

          {isOpen && (
            <button
              type="button"
              className="mt-5 rounded-lg bg-blue-700 px-2 py-1 text-center text-xs font-medium text-white hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => logoutMutation.mutate()}
            >
              Logout
            </button>
          )}
        </div>
        <Image
          className="rounded-full"
          src="/image.jpg"
          alt="프로필이미지"
          width={48}
          height={48}
        />
      </div>

      {/* 중단 */}
      <div className="mb-4 flex flex-col items-center border-b border-white pb-4">
        <h3 className="mb-4 text-xl">Notifications</h3>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`mb-2 w-full rounded-lg bg-sky-800 p-2 ${notification.read ? 'opacity-50' : 'opacity-100'}`}
          >
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      {/* 하단 */}
      <div className="mt-4 flex justify-around">
        <Link href="/home/setting/myPage">
          <button
            type="button"
            className="responsive_typo rounded-full border border-white bg-cyan-700 px-4 py-2"
          >
            &nbsp;&nbsp;설정&nbsp;&nbsp;
          </button>
        </Link>
        <Link href="/home/collect/questions">
          <button
            type="button"
            className="responsive_typo rounded-full border border-white bg-cyan-800 px-4 py-2"
          >
            모아보기
          </button>
        </Link>
        <Link href="/home/csCenter/contactUs/">
          <button
            type="button"
            className="responsive_typo rounded-full border border-white bg-cyan-900 px-4 py-2"
          >
            고객센터
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProfilePanel
