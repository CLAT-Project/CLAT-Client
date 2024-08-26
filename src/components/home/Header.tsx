'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = ({ onProfileClick }: { onProfileClick: () => void }) => {
  const [username, setUsername] = useState('User Name');
  const [schoolName, setSchoolName] = useState('School Name');

  useEffect(() => {
    // 예시로 사용하는 API 요청 - 실제 API URL로 대체하세요.
    const fetchUserData = async () => {
      try {
        // 사용자 이름과 학교 이름을 API로부터 가져오는 가정
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUsername(data.username);  // 실제 데이터 키로 대체
        setSchoolName(data.schoolName);  // 실제 데이터 키로 대체
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="w-full flex items-center justify-between bg-white text-black p-4">
      <div className="flex items-center justify-start">
        <div className="w-20 h-auto">
          <Link href="/home">
            <img src='/images/svg/clat-logo.svg' alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col justify-start items-start ml-4">
          <span className="text-base font-bold">{schoolName}</span>
          <span className="text-sm">{username}</span>
        </div>
      </div>

      <div className="flex items-center">
        <button>
          <img src='/images/svg/bell.svg' className='w-10 h-10 mr-4 fill-white' ></img>
        </button>
        <button onClick={onProfileClick}>
          {/* <img src="/profile-off.png" alt="Profile" className="w-10 h-10 rounded-full" /> */}         
          <img src='/images/svg/profile.svg' className='w-10 h-10 mr-4 fill-white'></img>
        </button>
      </div>
    </header>
  );
};

export default Header;
   