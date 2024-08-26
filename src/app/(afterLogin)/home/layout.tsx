'use client';

import '@/styles/global.css';
import Header from '@/components/home/Header';
import ProfilePanel from '@/components/common/profilePanel';
import { BookmarkProvider } from '@/components/home/collect/bookmark/bookmarkProvider';
import { useState } from 'react';

export default function homeLayout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfilePanel = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className='container mx-auto max-w-2/3 px-6'>
      <Header onProfileClick={toggleProfilePanel} />
      <main className="flex-1 p-8">
          <BookmarkProvider>
            {children}
          </BookmarkProvider>
      </main>
      <ProfilePanel isOpen={isProfileOpen} onClose={toggleProfilePanel} />
    </div>
  );
}
