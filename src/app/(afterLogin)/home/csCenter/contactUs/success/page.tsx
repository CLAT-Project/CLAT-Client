'use client'

import { useRouter } from 'next/navigation'
import NavigationBar from '@/components/home/navigationBar'

const SuccessPage = () => {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/home/csCenter/contactUs')
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      <div className="w-3/4">
        <main className="custom-scrollbar h-[600px] overflow-y-auto rounded-lg border border-black p-6">
          <h1 className="border-7b7b7b mb-8 border-b-2 p-4 text-4xl font-bold">
            문의하기
          </h1>

          {/* 문의 내용 입력 영역 */}
          <div className="space-y-4">
            <div className="flex h-80 flex-col items-center justify-center">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M49.6752 99.3504C77.1101 99.3504 99.3504 77.1101 99.3504 49.6752C99.3504 22.2403 77.1101 0 49.6752 0C22.2403 0 0 22.2403 0 49.6752C0 77.1101 22.2403 99.3504 49.6752 99.3504Z"
                  fill="#2C75FF"
                />
                <path
                  d="M41.0331 73.6636C39.8274 73.6636 38.6232 73.2034 37.7028 72.2844L18.9108 53.4924C17.0714 51.653 17.0714 48.6712 18.9108 46.8319C20.7502 44.9925 23.7319 44.9925 25.5713 46.8319L41.0331 62.295L73.1151 30.2116C74.9545 28.3722 77.9362 28.3722 79.7756 30.2116C81.615 32.0509 81.615 35.0327 79.7756 36.8721L44.3633 72.2844C43.4443 73.2034 42.2387 73.6636 41.0331 73.6636Z"
                  fill="white"
                />
              </svg>
              <div className="mt-14 text-center">
                {/* <img src='/images/svg/bluecheck.svg' /> */}
                <h1 className="mb-4 text-2xl font-bold">
                  문의 접수가 완료되었습니다
                </h1>
                <p className="text-sm">
                  보내주신 문의에 대한 답변이 2~3일 내에 등록하신 이메일로
                  발송됩니다.
                </p>
                <p className="text-sm">감사합니다.</p>
              </div>
            </div>
            <div className="border-t text-center">
              <p className="mt-10 text-xs font-light text-gray-400">
                다른 문의 사항이 있으신가요?
              </p>
              <button
                type="button"
                className="mt-2 w-1/3 rounded-lg bg-blue-500 px-4 py-2 text-white"
                onClick={handleNavigation} // 홈 페이지로 이동
              >
                문의하기
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SuccessPage
