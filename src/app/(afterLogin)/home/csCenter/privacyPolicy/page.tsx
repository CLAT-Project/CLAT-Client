'use client'

import { useState } from 'react'
import NavigationBar from '@/components/home/navigationBar'

const privacyPolicyPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 px-4">
        <NavigationBar />
      </div>

      <main className="custom-scrollbar h-4/5 flex-1 overflow-y-auto rounded-lg border border-black p-6">
        <h1 className="border-7B7B7B mb-8 border-b-2 p-4 text-4xl font-bold">
          개인정보 처리 방침
        </h1>

        <h3 className="mb-4 text-xl font-bold">1. 개인정보 처리 방침 안내</h3>

        <div className="space-y-4">
          <p>
            개인정보 처리방침은 클랫팀 이하 (" ") 팀 이라 합니다가 특정한
            가입절차를 거친 이용자들만 이용 가능한 폐쇄형 서비스를 제공함에 있어
            개인정보를 어떻게 수집, 이용, 보관, 파기하는지에 대한 정보를 담은
            방침을 의미합니다. 개인정보 처리방침은 개인정보보호법 등 국내
            개인정보 보호 법령을 모두 준수하고 있습니다. 본 개인정보
            처리방침에서 정하지 않은 용어의 정의는 서비스 이용약관을 따릅니다.
          </p>
          <h3 className="text-xl font-bold">2. 수집하는 개인정보의 항목</h3>
          <p>
            팀은 서비스 제공을 위해 다음 항목 중 최소한의 개인정보를 수집합니다.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              회원가입 시 수집되는 개인정보: 학교, 아이디, 비밀번호, 이메일,
              이름, 생년월일, 성별, 입학연도, 닉네임, 연계정보(CI, DI), 학과,
              국적
            </li>
            <li>
              별도로 수집되는 개인정보: 학교 인증, 프로필 사진, 이벤트 참여 시
              이름, 전화번호, 주소
            </li>
            <li>
              기타 서비스 이용 과정에서 수집되는 정보: 기기 정보, 로그 기록,
              채팅 내용
            </li>
          </ul>
          <h3 className="text-xl font-bold">3. 개인정보의 처리 및 보유 기간</h3>
          <p>
            팀은 법령에 따른 개인정보 보유 및 이용기간 또는 회원으로부터
            개인정보를 수집 시에 동의받은 개인정보의 보유 및 이용기간 내에서
            개인정보를 처리 및 보유합니다.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>회원 식별 및 관리: 회원 탈퇴 후 14일까지</li>
            <li>학교 인증 시 요청 자료 및 증빙자료 첨부파일: 3개월</li>
            <li>이벤트 참여: 30일</li>
          </ul>
          <h3 className="text-xl font-bold">4. 개인정보의 제3자 제공</h3>
          <p>
            팀은 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며,
            이용자의 동의가 있거나 법률의 규정에 해당하는 경우에만 개인정보를
            제3자에게 제공합니다.
          </p>
          <h3 className="text-xl font-bold">5. 개인정보의 파기</h3>
          <p>
            팀은 개인정보 보유기간이 경과하거나 처리 목적이 달성된 경우, 해당
            개인정보를 지체 없이 파기합니다. 전자적 파일 형태로 저장된
            개인정보는 복구 불가능한 방법으로 파기되며, 종이 문서는 분쇄기로
            파기합니다.
          </p>
          <h3 className="text-xl font-bold">6. 정보주체의 권리</h3>
          <p>
            회원은 언제든지 자신의 개인정보를 조회, 수정, 삭제, 탈퇴할 수
            있으며, 이에 대한 요구를 팀에 전달할 수 있습니다. 또한, 개인정보의
            열람, 정정, 삭제 요구 시 팀은 본인 여부를 확인한 후 처리합니다.
          </p>
          <h3 className="text-xl font-bold">7. 개인정보의 안전성 확보 조치</h3>
          <p>
            팀은 개인정보의 안전성을 확보하기 위하여 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>관리적 조치: 내부 관리계획 수립 및 시행, 정기적 직원 교육</li>
            <li>
              기술적 조치: 개인정보처리시스템의 접근 권한 관리, 암호화, 보안
              프로그램 설치
            </li>
            <li>물리적 조치: 전산실 등의 접근 통제</li>
          </ul>
          <h3 className="text-xl font-bold">
            8. 개인정보 자동 수집 장치의 설치 운영 및 거부
          </h3>
          <p>
            팀은 쿠키를 사용하여 이용자의 로그인 정보를 관리합니다. 쿠키 설정을
            통해 자동로그인을 비활성화할 수 있으며, 이는 일부 서비스 이용에
            제한을 줄 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  )
}

export default privacyPolicyPage
