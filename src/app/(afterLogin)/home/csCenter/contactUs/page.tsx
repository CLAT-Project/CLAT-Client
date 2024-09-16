'use client'

import { useState } from 'react'
import NavigationBar from '@/components/home/navigationBar'

const ContactUsPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqItems = [
    {
      question: 'Q. 고객 센터에 자주 묻는 질문 쌀라 살라?',
      answer: 'A. 자주 묻는 질문에 대한 답변이 여기고 저쩌고 미쟝오 쿠조앙',
    },
    {
      question: 'Q. 다른 질문 2?',
      answer: 'A. 답변 2입니다.',
    },
    {
      question: 'Q. 다른 질문 3?',
      answer: 'A. 답변 3입니다.',
    },
    {
      question: 'Q. 다른 질문 4?',
      answer: 'A. 답변 4입니다.',
    },
    {
      question: 'Q. 다른 질문 5?',
      answer: 'A. 답변 5입니다.',
    },
  ]

  return (
    <div className="flex h-screen space-x-4">
      {/* 왼쪽 설정 메뉴 */}
      <NavigationBar />

      {/* 오른쪽 FAQ 모아보기 */}
      <main className="h-4/5 flex-1 overflow-y-auto rounded-lg border border-black p-6">
        <h1 className="mb-4 text-2xl font-bold">고객 센터</h1>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-300 py-4">
              <p className="text-lg font-medium">{item.question}</p>
              <p className="mt-2 text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="fixed bottom-4 left-1/2 w-1/2 -translate-x-1/2 transform px-4">
          <button className="w-full rounded-lg bg-blue-500 py-3 text-center text-white">
            문의 접수 창으로 이동하기
          </button>
        </div>
      </main>
    </div>
  )
}

export default ContactUsPage
