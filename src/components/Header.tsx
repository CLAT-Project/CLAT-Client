'use client';

import { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  fetchSchoolData: () => Promise<{ schoolName: string; logoSrc: string }>;
  fetchUserData: () => Promise<{ username: string }>;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, fetchSchoolData, fetchUserData }) => {
  const [schoolName, setSchoolName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const { schoolName, logoSrc } = await fetchSchoolData();
        setSchoolName(schoolName);
      } catch (error) {
        console.error('Error fetching school name:', error);
      }
    };

    const loadUserData = async () => {
      try {
        const { username } = await fetchUserData();
        setUsername(username);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    loadSchoolData();
    loadUserData();
  }, [fetchSchoolData, fetchUserData]);

  return (
    <header className="w-full flex items-center justify-between bg-white text-black p-4">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-12 h-12 mr-4" />
        <div className="flex flex-col">
          <span className="text-lg font-bold">{schoolName}schoolName</span>
          <span className="text-sm">{username}username</span>
        </div>
      </div>
      <div className="flex items-center">
        <button>
          <img src='/bell.svg' className='w-10 h-10 mr-4 fill-white' alt="Notifications" />
        </button>
        <button onClick={onProfileClick}>
          <img src='/profile.svg' className='w-10 h-10 rounded-full' alt="Profile" />
        </button>
      </div>
    </header>
  );
};

export default Header;
