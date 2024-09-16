'use client'

import { Api } from '@/apis/axios'
import userApi from '@/apis/user'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const RoomCreationForm = ({ onSubmit }: any) => {
  const route = useRouter()

  const { data: userClassData } = useQuery({
    queryKey: ['userClass'],
    queryFn: userApi.getUserClass,
  })

  console.log(userClassData)
  const [roomName, setRoomName] = useState('')
  const [courseId, setCourseId] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(roomName, courseId)
  }

  const renderSchedule = () => {
    return userClassData?.map((item: any) => (
      <div
        key={item.couseCode}
        className="mb-2 flex flex-col border-b p-2"
        onClick={() => route.push(`/chat/${item.courseCode}`)}
      >
        <div className="font-bold">
          {item.courseName} ({item.courseCode})
        </div>
        <div>{item.room}</div>
        <div>
          {item.start_date} - {item.end_date}
        </div>
      </div>
    ))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="룸 이름을 입력하세요"
          className="mb-4 w-64 rounded border p-2"
        />
        <input
          type="text"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          placeholder="코스 ID를 입력하세요"
          className="mb-4 w-64 rounded border p-2"
        />
        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-white"
        >
          룸 생성
        </button>
      </form>
      {renderSchedule()}
    </>
  )
}

const TestPage = () => {
  const createChatRoom = async (roomName: string, courseId: number) => {
    const response = await Api.post(`/chatRoom`, {
      roomName,
      courseId,
    })

    return response.data
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <RoomCreationForm onSubmit={createChatRoom} />
    </div>
  )
}

export default TestPage
