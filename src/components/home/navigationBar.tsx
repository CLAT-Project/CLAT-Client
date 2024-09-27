import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavigationBar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href: string) => pathname.startsWith(href);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(prevMenu => (prevMenu === menuName ? null : menuName));
  };

  useEffect(() => {
    if (isActive('/home/collect/')) {
      setOpenMenu('moabogi');
    } else if (isActive('/home/contactUs/')) {
      setOpenMenu('faq');
    } else {
      setOpenMenu(null);  
    }
  }, [pathname]);

  return (
    <aside className="w-full p-4 h-1/3 border bg-white border-black rounded-lg">
      <nav>
        <ul className="space-y-4">
          {/* 설정 */}
          <li>
            <Link href="/home/setting/myPage">
              <span
                className={`${
                  isActive('/home/setting/myPage') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                }`}
              >
                설정
              </span>
            </Link>
          </li>

          {/* 모아보기 */}
          <li>
            <button
              className="text-left w-full focus:outline-none"
              onClick={() => toggleMenu('moabogi')}
            >
              <span className={`${
                  openMenu || isActive('/home/collect/') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                }`}>
                모아보기
              </span>
            </button>
            {(openMenu === 'moabogi' || isActive('/home/collect/')) && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link href="/home/collect/questions">
                    <span className={`${isActive('/home/collect/questions') ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>질문 모아보기</span>
                  </Link>
                </li>
                <li>
                  <Link href="/home/collect/files"> 
                    <span className={`${isActive('/home/collect/files') ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>자료 모아보기</span>
                  </Link>
                </li>
                <li>
                  <Link href="/home/collect/answers">
                    <span className={`${isActive('/home/collect/answers') ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>답변 모아보기</span>
                  </Link>
                </li>
                <li>
                  <Link href="/home/collect/bookmarks">
                    <span className={`${isActive('/home/collect/bookmarks') ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}>북마크</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 고객센터 */}
          <li>
            <button
              className="text-left w-full focus:outline-none"
              onClick={() => toggleMenu('faq')}
            >
              <span className={`${
                  openMenu === 'faq' || isActive('/home/csCenter/contactUs/') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                }`}>
                고객센터
              </span>
            </button>
            {(openMenu === 'faq' || isActive('/home/csCenter')) && (
              <ul className="ml-4 mt-2 space-y-2">
                <li><Link href="/home/csCenter/contactUs/">자주 묻는 질문</Link></li>
                <li><Link href="/home/csCenter/rules/">커뮤니티이용규칙</Link></li>
                <li><Link href="/home/csCenter/privacyPolicy/">개인정보처리방침</Link></li>
                <li><Link href="/home/csCenter/youthPolicy/">청소년보호정책</Link></li>
                <li><Link href="/home/csCenter/terms/">서비스이용약관</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
