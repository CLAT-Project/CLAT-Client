'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavigationBar from '@/components/home/navigationBar';

const filePage = () => {
  const router = useRouter();
  const [semester, setSemester] = useState('2024-1');
  const [subject, setSubject] = useState('그래픽 디자인');
  const [fileType, setFileType] = useState('PDF');

  const dataItems = [
    { title: '그래픽 디자인 종류.pdf', date: '24.03.24 13:32', type: 'PDF', link: '#' },
    { title: '그래픽 디자인 예시.pdf', date: '24.03.24 13:32', type: 'PDF', link: '#' },
    { title: '그래픽 디자인 수업 계획.pdf', date: '24.03.24 13:32', type: 'PDF', link: '#' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '24.03.24 13:32', type: 'Text' },
    { title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', date: '24.03.24 13:32', type: 'Text' },
    { title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', date: '24.03.24 13:32', type: 'Text' },
  ];

  const handleQuestionClick = (id: number) => {
    router.push(`/questions/${id}`);
  };

  return (
    <div className="flex h-screen space-x-4">
      {/* 왼쪽 설정 메뉴 */}
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      {/* 오른쪽 자료 모아보기 */}
      <main className="flex-1 p-6 h-4/5 border border-black rounded-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">자료 모아보기</h1>
          <div className="flex space-x-2">
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="p-2 border rounded">
              <option value="2024-1">24년도 1학기</option>
              <option value="2024-2">24년도 2학기</option>
            </select>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="p-2 border rounded">
              <option value="그래픽 디자인">그래픽 디자인</option>
              <option value="디지털 콘텐츠 게임">디지털 콘텐츠 게임</option>
              <option value="수산 해양 산업 관광">수산 해양 산업 관광</option>
            </select>
            <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="p-2 border rounded">
              <option value="PDF">PDF</option>
              <option value="Image">이미지</option>
              <option value="Video">영상</option>
              <option value="Other">그 외</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {dataItems.map((item, index) => (
            <div key={index} className="border-t border-gray-300 py-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">
                  {item.type === 'PDF' ? (
                    <a href={item.link} className="text-blue-500 underline">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </p>
                <p className="text-sm text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      
    </div>
  );
};

export default filePage;
