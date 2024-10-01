'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/home/navigationBar';

export default function MyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const member_id = params.id;

  const [user, setUser] = useState({
    nickname: '',
    username: '',
    phone: '010-1234-5678',
    email: '',
    school: '',
  });

  // 데이터를 API에서 불러오는 useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/members/${member_id}', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser({
            nickname: userData.nick_name || 'No nickname set',
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            school: userData.school_name,
          });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [member_id]);

  const handleEdit = (field: string) => {
    router.push(`/edit-profile?field=${field}&id=${member_id}`);
  };

  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-3/4 items-center justify-center">
        <div className="flex-1 p-6 h-4/5 border border-black rounded-lg overflow-y-auto custom-scrollbar">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                {/* 프로필 사진 자리 (추가 기능 필요 시 여기에 업로드 기능 추가 가능) */}
              </div>
              <span className="text-blue-500 text-sm cursor-pointer">사진 변경하기</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* 별명 */}
            <div className="flex items-center justify-between">
              <div className="w-1/3 text-left">
                <span className="text-lg font-semibold">별명</span>
              </div>
              <div className="w-1/3 text-center">
                <span>{user.nickname || 'Null'}</span>
              </div>
              <div className="w-1/3 text-right">
                <button onClick={() => handleEdit('nick_name')} className="text-blue-500">수정</button>
              </div>
            </div>

            {/* 아이디 */}
            <div className="flex items-center justify-between">
              <div className="w-1/3 text-left">
                <span className="text-lg font-semibold">아이디</span>
              </div>
              <div className="w-1/3 text-center">
                <span>{user.username || 'Null'}</span>
              </div>
              <div className="w-1/3 text-right">
                <button onClick={() => handleEdit('username')} className="text-blue-500">아이디 변경하기</button>
              </div>
            </div>

            {/* 전화번호 */}
            <div className="flex items-center justify-between">
              <div className="w-1/3 text-left">
                <span className="text-lg font-semibold">전화번호</span>
              </div>
              <div className="w-1/3 text-center">
                <span>{user.phone || '010-****-****'}</span>
              </div>
              <div className="w-1/3 text-right">
                <button onClick={() => handleEdit('phone')} className="text-blue-500">전화번호 변경하기</button>
              </div>
            </div>

            {/* 이메일 */}
            <div className="flex items-center justify-between">
              <div className="w-1/3 text-left">
                <span className="text-lg font-semibold">이메일</span>
              </div>
              <div className="w-1/3 text-center">
                <span>{user.email || 'Null'}</span>
              </div>
              <div className="w-1/3 text-right">
                <button onClick={() => handleEdit('email')} className="text-blue-500">이메일 변경하기</button>
              </div>
            </div>

            {/* 학교 */}
            <div className="flex items-center justify-between">
              <div className="w-1/3 text-left">
                <span className="text-lg font-semibold">학교</span>
              </div>
              <div className="w-1/3 text-center">
                <span>{user.school || 'Null'}</span>
              </div>
              <div className="w-1/3 text-right">
                {/* 학교는 수정 불가능 */}
              </div>
            </div>

            {/* 비밀번호 */}
            <div className="flex items-center justify-between">
              <div className="w-1/3 text-left">
                <span className="text-lg font-semibold">비밀번호</span>
              </div>
              <div className="w-1/3 text-center">
                <span>********</span> {/* 비밀번호는 보이지 않도록 처리 */}
              </div>
              <div className="w-1/3 text-right">
                <button onClick={() => handleEdit('password')} className="text-blue-500">비밀번호 변경하기</button>
              </div>
            </div>
          </div>

          {/* 탈퇴하기 버튼 */}
          <div className="flex justify-end mt-10">
            <button className="text-red-500">탈퇴하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
