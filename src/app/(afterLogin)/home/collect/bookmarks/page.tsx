'use client';

import { useState } from 'react';
// import { useBookmarks } from '@/components/home/collect/bookmark/bookmarkProvider';
import NavigationBar from '@/components/home/navigationBar';

const BookmarksPage = () => {
  // const { bookmarks, removeBookmark } = useBookmarks();
  const [semester, setSemester] = useState('2024-1');
  const [category, setCategory] = useState('사진과 구도');

  return (
    <div className="flex h-screen space-x-4">
      {/* 왼쪽 네비게이션 바 */}
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      {/* 오른쪽 콘텐츠 영역 */}
      <main className="flex-1 p-6 h-4/5 border border-black rounded-lg overflow-y-auto">
        <div className="flex justify-between mb-4 border-b border-gray-300 pb-2">
          <h1 className="text-2xl font-bold">북마크 모아보기</h1>
          <div className="flex space-x-2">
            <select 
              value={semester} 
              onChange={(e) => setSemester(e.target.value)} 
              className="p-2 border rounded"
            >
              <option value="2024-1">24년도 1학기</option>
              <option value="2024-2">24년도 2학기</option>
            </select>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="p-2 border rounded"
            >
              <option value="사진과 구도">사진과 구도</option>
              <option value="디자인 이론">디자인 이론</option>
              <option value="작품 분석">작품 분석</option>
            </select>
          </div>
        </div>

        {/* <div className="overflow-y-auto">
          {bookmarks.length === 0 ? (
            <p className="text-center text-gray-500">북마크가 없습니다.</p>
          ) : (
            <ul className="space-y-4">
              {bookmarks.map((bookmark) => (
                <li 
                  key={bookmark.id} 
                  className="p-4 bg-white rounded border border-gray-300"
                >
                  <div className="flex justify-between items-center">
                    <span>{bookmark.title}</span>
                    <button 
                      onClick={() => removeBookmark(bookmark.id)} 
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">그래픽 디자인 | 박철수 24.03.24 13:32</p>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </main>
    </div>
  );
};

export default BookmarksPage;
