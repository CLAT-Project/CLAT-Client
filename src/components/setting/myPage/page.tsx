'use client';

import React from 'react';
import NavigationBar from '@/components/home/navigationBar';


export default function MyPage() {
  const user = {
    nickname: '빠부른 햄스터',
    username: 'asdfds546',
    phone: '010-0000-0000',
    email: '123456789@gmail.com',
    school: '@@@대학교',
  };

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <NavigationBar />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 bg-white p-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                {/* 프로필 사진 자리 */}
              </div>
              <span className="text-blue-500 text-lg">사진 변경하기</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* 별명 */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">별명</span>
              <div>
                <span>{user.nickname}</span>
                <a href="#" className="text-blue-500 ml-2">수정</a>
              </div>
            </div>

            {/* 아이디 */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">아이디</span>
              <div>
                <span>{user.username}</span>
                <a href="#" className="text-blue-500 ml-2">아이디 변경하기</a>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">전화번호</span>
              <div>
                <span>{user.phone}</span>
                <a href="#" className="text-blue-500 ml-2">전화번호 변경하기</a>
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">이메일</span>
              <div>
                <span>{user.email}</span>
                <a href="#" className="text-blue-500 ml-2">이메일 변경하기</a>
              </div>
            </div>

            {/* 학교 */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">학교</span>
              <div>
                <span>{user.school}</span>
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">비밀번호</span>
              <a href="#" className="text-blue-500">비밀번호 변경하기</a>
            </div>
          </div>

          {/* 탈퇴하기 버튼 */}
          <div className="flex justify-end mt-10">
            <button className="text-red-500 bottom-1">탈퇴하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
