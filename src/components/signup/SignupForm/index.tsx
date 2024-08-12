'use client'

import CheckBox from '@/components/common/CheckBox'
import InputField from '@/components/common/InputField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignupForm = ({ onNext }: { onNext: () => void }) => {
  const navigate = useRouter()

  const [checkedState, setCheckedState] = useState({
    checked1: false,
    checked2: false,
  })

  const handleChangeChecked = (isChecked: boolean, key: string) => {
    setCheckedState({
      ...checkedState,
      [key]: isChecked,
    })
  }

  return (
    <div className="mx-auto w-[60%]">
      <p className="w-full pr-[20px] pt-[11px] text-right text-[11px]">
        <span className="text-red-400">*</span> 표시는 필수 항목입니다.
      </p>
      <div className="mt-[48px] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-[32px]">
          <InputField
            label="학교/기관"
            type="text"
            placeholder="학교/기관을 입력해주세요."
            isButton={false}
          />
          <InputField
            label="증명서"
            type="text"
            placeholder="증명서를 첨부해주세요."
            isButton={true}
            buttonText="파일"
          />
          <InputField
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요."
            isButton={false}
          />
          <InputField
            label="아이디"
            type="text"
            placeholder="아이디를 입력해주세요."
            isButton={true}
            buttonText="중복확인"
          />
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isButton={false}
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isButton={false}
          />
        </div>
        <div className="mt-10 flex w-full justify-center gap-10">
          <CheckBox
            label="개인정보 이용 동의"
            checked={checkedState.checked1}
            onChange={handleChangeChecked}
            keyProp="checked1"
          />
          <CheckBox
            label="마케팅 수신 동의"
            checked={checkedState.checked2}
            onChange={handleChangeChecked}
            keyProp="checked2"
          />
        </div>
        <div className="mt-[40px]">
          <button
            className="rounded-[9px] bg-primary px-[42px] py-[14px] text-[18px] font-bold text-white"
            onClick={onNext}
          >
            다음 단계
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
