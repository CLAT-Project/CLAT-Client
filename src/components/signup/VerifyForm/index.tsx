import InputField from '@/components/common/InputField'
import VerificationCodeInput from '@/components/signup/VerifyForm/VerificationCodeInput'
import { useState } from 'react'

const VerifyForm = ({ onNext }: { onNext: () => void }) => {
  const [verificationCode, setVerificationCode] = useState<number[]>(
    Array(6).fill(''),
  )

  const handleVerificationCodeChange = (value: string, index: number) => {
    const newCode = [...verificationCode]
    newCode[index] = Number(value)
    setVerificationCode(newCode)
  }

  return (
    <div className="mx-auto w-[60%]">
      <p className="w-full pr-[20px] pt-[11px] text-right text-[11px]">
        <span className="text-red-400">*</span> 표시는 필수 항목입니다.
      </p>
      <div className="mt-[48px] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-[32px]">
          <InputField
            label="이름"
            type="text"
            placeholder="학교/기관을 입력해주세요."
            isButton={false}
          />
          <InputField
            label="이메일"
            type="text"
            placeholder="학교/기관을 입력해주세요."
            isButton={true}
            buttonText="인증번호 발송"
          />
          <div className="mt-4 flex items-center gap-5">
            <div className="flex w-[540px] items-center justify-between">
              <label className="min-w-[80px] text-[14px]">인증번호</label>
              <VerificationCodeInput onChange={handleVerificationCodeChange} />
            </div>
            <button className="h-[36px] rounded-[8px] border border-black px-[15px]">
              확인
            </button>
          </div>
          <div className="mx-auto mt-[100px]">
            <button
              className="rounded-[9px] bg-primary px-[42px] py-[14px] text-[18px] font-bold text-white"
              onClick={onNext}
            >
              다음 단계
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyForm
