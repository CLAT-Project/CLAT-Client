/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */

'use client'

import Image from 'next/image'
import Calendar from '@/components/home/calendar'
import { useState } from 'react'
import { useUserClassQuery } from '@/hooks/queries/useUserQuery'
import useUser from '@/hooks/common/useUser'
import { useRouter } from 'next/navigation'
import { IUserClassResponse } from '@/types/chat.types'
import Modal from '@/components/common/Modal'
import toast from 'react-hot-toast'
import { useCreateChatRoomMutation } from '@/hooks/mutations/useChatMutation'

const HomePage = () => {
  const router = useRouter()

  const { isProfessor, isStudent } = useUser()
  const { data: userClassData } = useUserClassQuery()
  const createChatRoom = useCreateChatRoomMutation()

  const [activeTab, setActiveTab] = useState('questions')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<IUserClassResponse | null>(
    null,
  )
  const [chatRoomName, setChatRoomName] = useState('')
  const [classWeek, setClassWeek] = useState('')

  const onClickClass = (classItem: IUserClassResponse) => {
    if (isProfessor && classItem.chatRooms?.length === 0) {
      setSelectedClass(classItem)
      setIsModalOpen(true)
    } else {
      const lastChatRoom = classItem.chatRooms?.[classItem.chatRooms.length - 1]
      if (isStudent && classItem.chatRooms?.length === 0) {
        toast.error('생성된 수업채팅이 없습니다.')
        return;
      }
      if (lastChatRoom) {
        router.push(`/chat/${lastChatRoom.chatRoomId}`)
      }
    }
  }

  const onClickPlus = (classItem: IUserClassResponse) => {
    if (isProfessor) {
      setIsModalOpen(true)
      setSelectedClass(classItem)
    }
  }
  const handleCreateChatRoom = () => {
    createChatRoom.mutate({
      roomName: chatRoomName,
      courseId: selectedClass?.courseId ?? 0,
      week: Number(classWeek),
    })
    setIsModalOpen(false)
    setChatRoomName('')
    setClassWeek('')
  }

  return (
    <div className="flex h-screen">
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="mb-4 text-lg font-bold">새 채팅방 생성</h2>
          <input
            type="text"
            placeholder="채팅방 이름"
            value={chatRoomName}
            onChange={(e) => setChatRoomName(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <input
            type="text"
            placeholder="수업 주차"
            value={classWeek}
            onChange={(e) => setClassWeek(e.target.value)}
            className="mb-4 w-full rounded border p-2"
          />
          <button
            onClick={handleCreateChatRoom}
            className="w-full rounded bg-blue-500 p-2 text-white"
          >
            생성
          </button>
        </Modal>
      )}

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1">
        {/* 왼쪽 수업 목록 */}
        <aside className="w-1/2 bg-white p-4 pr-8">
          <div className="mb-4">
            <select className="rounded border p-2">
              <option value="2024-2">24년도 2학기</option>
            </select>
          </div>

          {/* <div className="mb-4 space-y-4 p-2 rounded border border-black">
            <button
              // onClick={}
              className="w-full px-4 py-2  text-black rounded-md text-left"
            >
              새 수업 들어가기 +
            </button>
          </div> */}

          <ul className="space-y-4">
            {userClassData?.map((classItem) => (
              <li
                key={classItem.courseCode}
                className="flex cursor-pointer items-center justify-between rounded border border-black bg-white p-2 px-4 text-left"
              >
                <div
                  className="flex w-full flex-col gap-2"
                  onClick={() => {
                    onClickClass(classItem)
                  }}
                >
                  <p>{classItem.courseName}</p>
                  <span className="text-black-500 text-xs">
                    {classItem.room}
                  </span>
                </div>
                {isProfessor && (
                  <div onClick={() => onClickPlus(classItem)} className="z-10">
                    <Image
                      src="/images/svg/plus.svg"
                      alt="plus"
                      width={26}
                      height={26}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* 오른쪽 콘텐츠 */}
        <main className="w-1/2 p-4 pl-8">
          <nav className="mb-4 flex content-between space-x-5">
            <a
              href="#"
              onClick={() => setActiveTab('questions')}
              className={`p-2 ${activeTab === 'questions' ? 'bg-blue-300' : ''} w-149 rounded-full border border-black`}
            >
              질문 모아보기
            </a>
            <a
              href="#"
              onClick={() => setActiveTab('bookmarks')}
              className={`p-2 ${activeTab === 'bookmarks' ? 'bg-blue-300' : ''} w-149 rounded-full border border-black`}
            >
              북마크
            </a>
          </nav>

          {/* 탭 내용 */}
          {activeTab === 'questions' && (
            <div className="mb-8 space-y-4 rounded-xl border border-black">
              <div className="rounded p-4">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-xs text-gray-400 shadow">
                  그래픽 디자인 | 박철수 24.03.24 13:32
                </p>
              </div>
              <div className="rounded p-4">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-xs text-gray-400 shadow">
                  그래픽 디자인 | 박철수 24.03.24 13:32
                </p>
              </div>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="mb-8 space-y-4 rounded-xl border border-black">
              <div className="rounded p-4">
                <p className="text-sm">북마크된 항목 1</p>
                <p className="text-xs text-gray-400 shadow">
                  그래픽 디자인 | 박철수 24.03.24 13:32
                </p>
              </div>
              <div className="rounded p-4">
                <p className="text-sm">북마크된 항목 2</p>
                <p className="text-xs text-gray-400 shadow">
                  그래픽 디자인 | 박철수 24.03.24 13:32
                </p>
              </div>
            </div>
          )}

          <Calendar />
        </main>
      </div>
    </div>
  )
}

export default HomePage
