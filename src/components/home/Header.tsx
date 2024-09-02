'use client';

import Link from 'next/link';
import Image from 'next/image'
import { useUserQuery } from '@/hooks/queries/useUserQuery';

const Header = ({ onProfileClick }: { onProfileClick: () => void }) => {
  const { data: userData } = useUserQuery()

  return (
    <header className="w-full flex items-center justify-between bg-white text-black p-4">
      <div className="flex items-center justify-start">
        <div className="w-20 h-auto">
          <Link href="/home">
            <img src='/images/svg/clat-logo.svg' alt="Logo" />
          </Link>
        </div>
        <div className="flex flex-col justify-start items-start ml-4">
          <span className="text-base font-bold">{userData?.schoolName}</span>
          <span className="text-sm">{userData?.username}</span>
        </div>
      </div>

      <div className="flex items-center gap-[45px]">
        <button>
          <Image src='/images/svg/bell.svg' alt='bell' width={30} height={38} />
        </button>
        <button onClick={onProfileClick}>
          {/* <img src="/profile-off.png" alt="Profile" className="w-10 h-10 rounded-full" /> */}
          {/* <img src='/images/svg/profile.svg' className='w-10 h-10 mr-4 fill-white'></img> */}
          <Image src='/images/png/user2.png' alt='profile' width={40} height={40} />
        </button>
      </div>
    </header>
  );
};

export default Header;
