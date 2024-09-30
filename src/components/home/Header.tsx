'use client'

import { useUserQuery } from '@/hooks/queries/useUserQuery'
import Link from 'next/link'
import Image from 'next/image'

const Header = ({ onProfileClick }: { onProfileClick: () => void }) => {
  const { data: userData } = useUserQuery()

  // const [username, setUsername] = useState('User Name');
  // const [schoolName, setSchoolName] = useState('School Name');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // 사용자 이름과 학교 이름을 API로부터 가져오는 가정
  //       const response = await fetch('http://127.0.0.1:5000/api/members');
  //       // const response = await fetch('/api/members');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch user data');
  //       }

  //       const data = await response.json();
  //       const firstMember = data[1];

  //       if (firstMember) {
  //         setUsername(firstMember.username);
  //         setSchoolName(firstMember.school_name);
  //       }

  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <header className="flex w-full items-center justify-between bg-white p-4 text-black">
      <div className="flex items-center justify-start">
        <div className="h-auto w-20">
          <Link href="/home">
            <img src="/images/svg/CLAT-LOGO.svg" alt="Logo" />
          </Link>
        </div>
        <div className="ml-4 flex flex-col items-start justify-start">
          <span className="text-base font-bold">{userData?.schoolName}</span>
          <span className="text-sm">{userData?.username}</span>
        </div>
      </div>

      <div className="flex items-center">
        <button>
          <img
            src="/images/svg/bell.svg"
            className="mr-4 h-10 w-10 fill-white"
          ></img>
        </button>
        <button onClick={onProfileClick}>
          {/* <img src="/profile-off.png" alt="Profile" className="w-10 h-10 rounded-full" /> */}
          <Image
            src="/images/png/user2.png"
            className="mr-4 h-10 w-10 fill-white"
            alt="Profile"
            width={40}
            height={40}
          />
        </button>
      </div>
    </header>
  )
}

export default Header
