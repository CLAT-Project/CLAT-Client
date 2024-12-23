import BackButton from '@/components/home/BackButton'
import Image from 'next/image'

export default function DeleteSuccess() {
  return (
    <div className="fixed inset-0 bottom-[50px] left-[350px] flex items-center justify-center sm:left-[350px]">
      <main className="absolute flex items-center justify-center rounded-lg border border-black bg-white p-6 md:h-[312px] md:w-[458px]">
        <div className="absolute right-4 top-3 flex">
          <BackButton redirectLogin />
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="mb-5 flex items-center justify-center">
            <Image
              src="/images/svg/check.svg"
              alt="Logo"
              width={123}
              height={123}
            />
          </div>
          <div className="mb-10 text-center font-bold">
            <span>탈퇴가 완료되었습니다.</span>
            <br />
            <span>안녕히 가세요.</span>
          </div>
        </div>
      </main>
    </div>
  )
}
