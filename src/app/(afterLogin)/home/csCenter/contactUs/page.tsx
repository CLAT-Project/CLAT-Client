'use client';

import { useEffect, useState } from 'react';
import NavigationBar from '@/components/home/navigationBar';

interface FAQ {
  faq_id: number;
  title: string;
  description: string;
  comment: string;
  created_date: string;
  last_modified_date: string;
}

const ContactUsPage = () => {
  const [faqItems, setFaqItems] = useState<FAQ[]>([]);

  // FAQ 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/help/faq'); // 여기에 실제 API 엔드포인트를 넣으세요
        // const response = await fetch('/help/faq');
        const data = await response.json();
        setFaqItems(data);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
        {/* 왼쪽 설정 메뉴 */}
        <div className="w-1/4 px-4">
          <NavigationBar />
        </div>

        {/* 오른쪽 FAQ 모아보기 */}
        <div className="w-3/4">
          <main className="p-6 h-[calc(100vh-100px)] border border-black rounded-lg overflow-y-auto custom-scrollbar">
            <h1 className="text-4xl font-bold p-4 mb-8 border-b-2 border-7B7B7B">자주 묻는 질문</h1>

            <div className="space-y-4">
              {faqItems.map((item) => (
                <div key={item.faq_id} className="border-b border-gray-300 py-4">
                  <p className="text-lg font-medium">{item.title}</p>
                  <p className="mt-2 text-gray-700">{item.comment}</p>
                </div>
              ))}
            </div>
          </main>

          {/* 푸터 */}
          <footer className="w-full p-4 border border-black rounded-lg mt-6">
            <div className="max-w-4xl mx-auto">
              <p className='p-2 font-bold'>찾으시는 질문이 없나요? 고객센터에 직접 문의해보세요.</p>
              <button
                className="w-full py-3 bg-blue-500 text-white rounded-lg text-center"
                style={{ margin: '5 auto' }}
                onClick={() => window.location.href = '/home/csCenter/contactUs/inquiry'}
              >
                문의 접수 창으로 이동하기
              </button>
            </div>
          </footer>
        </div>
    </div>
  );
};

export default ContactUsPage;
