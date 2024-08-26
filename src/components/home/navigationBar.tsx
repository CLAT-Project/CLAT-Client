import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavigationBar() {
  const pathname = usePathname();
  const [isMoabogiOpen, setMoabogiOpen] = useState(false);
  const [isCustomerServiceOpen, setCustomerServiceOpen] = useState(false);

  // 경로가 정확히 일치하는지 확인하기 위해 사용
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-1/6 bg-white-100 p-6 border-r border-black">
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
              onClick={() => setMoabogiOpen(!isMoabogiOpen)}
            >
              <span className={`${
                  isMoabogiOpen || isActive('/home/setting/moabogi') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                }`}>
                모아보기
              </span>
            </button>
            {isMoabogiOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li><Link href="/home/setting/moabogi/option1">옵션 1</Link></li>
                <li><Link href="/home/setting/moabogi/option2">옵션 2</Link></li>
                <li><Link href="/home/setting/moabogi/option3">옵션 3</Link></li>
                <li><Link href="/home/setting/moabogi/option4">옵션 4</Link></li>
              </ul>
            )}
          </li>

          {/* 고객센터 */}
          <li>
            <button
              className="text-left w-full focus:outline-none"
              onClick={() => setCustomerServiceOpen(!isCustomerServiceOpen)}
            >
              <span className={`${
                  isCustomerServiceOpen || isActive('/home/setting/customer-service') ? 'text-blue-500 font-semibold' : 'text-gray-700'
                }`}>
                고객센터
              </span>
            </button>
            {isCustomerServiceOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li><Link href="/home/setting/customer-service/option1">옵션 1</Link></li>
                <li><Link href="/home/setting/customer-service/option2">옵션 2</Link></li>
                <li><Link href="/home/setting/customer-service/option3">옵션 3</Link></li>
                <li><Link href="/home/setting/customer-service/option4">옵션 4</Link></li>
                <li><Link href="/home/setting/customer-service/option5">옵션 5</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
