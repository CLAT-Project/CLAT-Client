'use client'

import { useEffect, useState } from 'react'
import NavigationBar from '@/components/home/navigationBar'
import { Api } from '@/apis/axios'

interface FAQPost {
  createdDate: string
  lastModifiedDate: string
  id: number
  title: string
  description: string
  comment: string
}

const ContactUsPage = () => {
  const [faqItems, setFaqItems] = useState<FAQPost[]>([])

  // FAQ 데이터 가져오기
  useEffect(() => {
    const getFAQPosts = async () => {
      try {
        const { data } = await Api.get<FAQPost[]>('/help/faq')
        // const response = await fetch('/help/faq');
        setFaqItems(data)
      } catch (error) {
        console.error('Error fetching FAQ data:', error)
      }
    }

    getFAQPosts()
  }, [])

  return (
    <div className="flex h-screen">
      {/* 왼쪽 설정 메뉴 */}
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      {/* 오른쪽 FAQ 모아보기 */}
      <div className="w-3/4">
        <main className="custom-scrollbar h-[calc(100vh-100px)] overflow-y-auto rounded-lg border border-black p-6">
          <h1 className="border-7B7B7B mb-8 border-b-2 p-4 text-4xl font-bold">
            자주 묻는 질문
          </h1>

          <ul className="space-y-4">
            {faqItems.slice(0, 7).map((item) => (
              <div className="border-b border-gray-300 py-4">
                <p>
                  {new Date(item.createdDate).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // 24시간 형식
                  })}
                </p>
                <p className="text-lg font-medium">{item.description}</p>
                <p className="mt-2 text-gray-700">{item.comment}</p>
              </div>
            ))}
          </ul>
        </main>

        {/* 푸터 */}
        <footer className="mt-6 w-full rounded-lg border border-black p-4">
          <div className="mx-auto max-w-4xl">
            <p className="p-2 font-bold">
              찾으시는 질문이 없나요? 고객센터에 직접 문의해보세요.
            </p>
            <button
              type="button"
              className="w-full rounded-lg bg-blue-500 py-3 text-center text-white"
              style={{ margin: '5 auto' }}
              onClick={() => {
                window.location.href = '/home/csCenter/contactUs/inquiry'
              }}
            >
              문의 접수 창으로 이동하기
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default ContactUsPage
