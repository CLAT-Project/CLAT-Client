'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import NavigationBar from '@/components/home/navigationBar'
import { Api } from '@/apis/axios'
import Link from 'next/link'

interface Profile {
  name: string
  username: string
  schoolName: string
}

export default function MyPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const user = {
    nickname: '배부른 햄스터',
    username: 'asdfds546',
    phone: '010-0000-0000',
    email: '123456789@gmail.com',
    school: '@@@대학교',
  }
  useEffect(() => {
    // 프로필 데이터를 서버에서 가져오는 함수
    const fetchProfile = async () => {
      try {
        const response = await Api.get('/members')
        setProfile(response.data)
      } catch (err) {
        console.error('프로필 정보 조회 실패:', err)
      }
    }

    fetchProfile()
  }, [])

  return (
    <div className="flex h-screen sm:w-full">
      {/* 사이드바 */}
      <div className="hidden w-1/4 px-4 sm:block">
        <NavigationBar />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-auto sm:w-full">
        <div className="h-[calc(100vh-100px)] min-w-[350px] overflow-y-auto rounded-lg border border-black p-6">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gray-300">
                <Image
                  className="rounded-full"
                  src="/image.jpg"
                  alt="프로필이미지"
                  width={100}
                  height={100}
                />
              </div>
              <span className="text-lg text-blue-500">사진 변경하기</span>
            </div>
          </div>
          <div className="ml-5 mr-5">
            {profile && (
              <div className="space-y-6">
                {/* 별명 */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">별명</span>
                  <div>
                    <span>{user.nickname}</span>
                    <a href="#" className="ml-2 text-blue-500">
                      수정
                    </a>
                  </div>
                </div>

                {/* 아이디 */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">아이디</span>
                  <div>
                    <span>{profile.name}</span>
                    <a href="#" className="ml-2 text-blue-500">
                      아이디 변경하기
                    </a>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">전화번호</span>
                  <div>
                    <span>{user.phone}</span>
                    <a href="#" className="ml-2 text-blue-500">
                      전화번호 변경하기
                    </a>
                  </div>
                </div>

                {/* 이메일 */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">이메일</span>
                  <div>
                    <span>{user.email}</span>
                    <a href="#" className="ml-2 text-blue-500">
                      이메일 변경하기
                    </a>
                  </div>
                </div>

                {/* 학교 */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">학교</span>
                  <div>
                    <span>{profile.schoolName}</span>
                  </div>
                </div>

                {/* 비밀번호 */}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold">비밀번호</span>
                  <a href="#" className="text-blue-500">
                    비밀번호 변경하기
                  </a>
                </div>
              </div>
            )}
            {/* 탈퇴하기 버튼 */}
            <div className="mt-10 flex justify-end">
              <Link href="/home/setting/myPage/delete">
                <span className="bottom-1 text-red-500">탈퇴하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
