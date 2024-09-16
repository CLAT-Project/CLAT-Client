'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import NavigationBar from '@/components/home/navigationBar'

const answerPage = () => {
  const router = useRouter()
  const [semester, setSemester] = useState('2024-1')
  const [subject, setSubject] = useState('그래픽 디자인')

  const answers = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, consectetur adipiscing elit.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  ]

  const handleQuestionClick = (id: number) => {
    router.push(`/answer/${id}`)
  }

  return (
    <div className="flex h-screen space-x-4">
      {/* 왼쪽 설정 메뉴 */}
      <NavigationBar />

      {/* 오른쪽 질문 모아보기 */}
      <main className="h-4/5 flex-1 overflow-y-auto rounded-lg border border-black p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">답변 모아보기</h1>
          <div className="flex space-x-2">
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="rounded border p-2"
            >
              <option value="2024-1">24년도 1학기</option>
              <option value="2024-2">24년도 2학기</option>
            </select>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded border p-2"
            >
              <option value="그래픽 디자인">그래픽 디자인</option>
              <option value="디지털 콘텐츠 게임">디지털 콘텐츠 게임</option>
              <option value="수산 해양 산업 관광">수산 해양 산업 관광</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          {answers.map((answer, index) => (
            <div key={index} className="border-t border-gray-300 py-4">
              <p className="text-sm">{answer}</p>
              <p className="text-xs text-gray-500">
                그래픽 디자인 | 박철수 24.03.24 13:32
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default answerPage
