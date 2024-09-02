'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

const ProfilePanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [username, setUsername] = useState('User Name');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: '답변', read: false },
    { id: 2, message: '세모세모 도형', read: true },
    { id: 3, message: '네트워크 7계층', read: true },
    { id: 4, message: '어쩌구 저쩌구? ??', read: true },
    { id: 5, message: '헤더 값 훔치는 방법', read: true },
    { id: 6, message: 'order as b', read: true },
    { id: 7, message: 'at 3 PM', read: false },
  ]);

  return (
    <div className={`fixed top-0 right-0 w-1/4 h-3/4 bg-slate-500 bg-opacity-70 text-white p-4 transform ${isOpen ? 'translate-x-0 rounded-l-lg-costum' : 'translate-x-full'} transition-transform duration-300`}>
      <div className="flex justify-end">
        <button onClick={onClose}>Close</button>
      </div>
          
      {/* 상단 */}
      <div className="border-b border-white pb-4 mb-4 flex justify-end items-center">
        <div className="text-right mr-4">
          <h6 className='text-xs'>어서오세요!</h6>
          <h5 className="text-sm mt-1">username님</h5>
          <button className="text-xs mt-1" onClick={() => console.log('Logout')}>
            Logout
          </button>
        </div>
        <img src="/images/png/profile-on.png" alt="Profile" className="w-12 h-12 rounded-full " />
      </div>

      {/* 중단 */}
      <div className="flex flex-col items-center border-b border-white pb-4 mb-4">
        <h3 className="text-xl mb-4">Notifications</h3>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`w-full p-2 mb-2 bg-sky-800 rounded-lg ${notification.read ? 'opacity-50' : 'opacity-100'}`}
          >
            <p>{notification.message}</p>
          </div>
        ))}
      </div>

      {/* 하단 */}
      <div className="flex justify-around mt-4">
        <Link href="/home/setting/myPage">
          <button className="bg-cyan-700 px-4 py-2 border border-white rounded-full responsive_typo">&nbsp;&nbsp;설정&nbsp;&nbsp;</button>
        </Link>
        <Link href="/home/collect/questions">
          <button className="bg-cyan-800 px-4 py-2 border border-white rounded-full responsive_typo">모아보기</button>
        </Link>
        <Link href="/home/csCenter/contactUs/">
          <button className="bg-cyan-900 px-4 py-2 border border-white rounded-full responsive_typo">고객센터</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePanel;
