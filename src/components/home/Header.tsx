'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const Header = ({ onProfileClick }: { onProfileClick: () => void }) => {
  const [username, setUsername] = useState('User Name');
  const [schoolName, setSchoolName] = useState('School Name');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 사용자 이름과 학교 이름을 API로부터 가져오는 가정
        const response = await fetch('http://127.0.0.1:5000/api/members');
        // const response = await fetch('/api/members');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        const firstMember = data[1];
        
        if (firstMember) {
          setUsername(firstMember.username);
          setSchoolName(firstMember.school_name);
        }

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
            <img src='/images/svg/CLAT-LOGO.svg' alt="Logo" />
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
   