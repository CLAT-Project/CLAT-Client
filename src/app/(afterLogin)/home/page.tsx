'use client';

import Link from 'next/link';
import Calendar from '@/components/home/calendar';
import { useState } from 'react';

const HomePage = () => {
  const classes = [
    { id: '1', name: 'Math 101' },
    { id: '2', name: 'Science 201' },
    { id: '3', name: 'History 301' },
    { id: '4', name: 'Art 401' },
    { id: '5', name: 'Physical Education 501' }
  ];

  const [activeTab, setActiveTab] = useState('questions');

  return (

    <div className="flex h-screen">
      {/* 콘텐츠 영역 */}
      <div className="flex flex-1">
        {/* 왼쪽 수업 목록 */}
        <aside className="w-1/2 p-4 pr-8 bg-white ">
          <div className="mb-4">
            <select className="p-2 border rounded">
              <option value="2024-2">24년도 2학기</option>
            </select>
          </div>

          <div className="mb-4 space-y-4 p-2 rounded border border-black">
            <button
              // onClick={}
              className="w-full px-4 py-2  text-black rounded-md text-left"
            >
             새 수업 들어가기 +
            </button>
          </div>

          <ul className="space-y-4">
            {classes.map((classItem) => (
              <li key={classItem.id} className="px-4 p-2 bg-white rounded border border-black text-left">
              <Link href={`/chat/${classItem.id}`}>
                {classItem.name}
                <br />
                <span className="text-xs text-black-500">트럼프</span>
              </Link>
            </li>
            ))}
          </ul>
        </aside>

        {/* 오른쪽 콘텐츠 */}
        <main className="w-1/2 p-4 pl-8">
          <nav className="flex content-between space-x-5 mb-4 ">
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
            <div className="space-y-4 mb-8 border border-black rounded-xl">
              <div className="p-4 rounded">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-xs text-gray-400 shadow">그래픽 디자인 | 박철수 24.03.24 13:32</p>
              </div>
              <div className="p-4 rounded">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-xs text-gray-400 shadow">그래픽 디자인 | 박철수 24.03.24 13:32</p>
              </div>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="space-y-4 mb-8 border border-black rounded-xl">
              <div className="p-4 rounded">
                <p className="text-sm">북마크된 항목 1</p>
                <p className="text-xs text-gray-400 shadow">그래픽 디자인 | 박철수 24.03.24 13:32</p>
              </div>
              <div className="p-4 rounded">
                <p className="text-sm">북마크된 항목 2</p>
                <p className="text-xs text-gray-400 shadow">그래픽 디자인 | 박철수 24.03.24 13:32</p>
              </div>
            </div>
          )}

          <Calendar />
        </main>

      </div>
    </div>
    
  );
};

export default HomePage;
