'use client'

import CheckBox from '@/components/common/CheckBox'
import InputField from '@/components/common/InputField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SignupFormProps {
  onNext: () => void
  register: any
  handleSubmit: any
  errors: any
}

const SignupForm = ({
  onNext,
  register,
  handleSubmit,
  errors,
}: SignupFormProps) => {
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

  const onSubmit = (data: any) => {
    if (!checkedState.checked1 || !checkedState.checked2) {
      alert('필수 항목을 체크해주세요.')
      return
    }
    console.log(data, "data")
    console.log('Checked State:', checkedState)
  }

  return (
    <form className="mx-auto w-[60%]" onSubmit={handleSubmit(onSubmit)}>
      <p className="w-full pr-[20px] pt-[11px] text-right text-[11px]">
        <span className="text-red-400">*</span> 표시는 필수 항목입니다.
      </p>
      <div className="mt-[48px] flex flex-col items-center justify-center">
        <div className="flex flex-col gap-[10px]">
          <InputField
            label="학교/기관"
            type="text"
            placeholder="학교/기관을 입력해주세요."
            isButton={false}
            name="school"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
          />
          <InputField
            label="증명서"
            type="text"
            placeholder="증명서를 첨부해주세요."
            isButton={true}
            buttonText="파일"
            name="certification"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
          />
          <InputField
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요."
            isButton={false}
            name="name"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
          />
          <InputField
            label="아이디"
            type="text"
            placeholder="아이디를 입력해주세요."
            isButton={true}
            buttonText="중복확인"
            name="id"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
          />
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isButton={false}
            name="password"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isButton={false}
            name="passwordConfirm"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
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
          <button className="rounded-[9px] bg-primary px-[42px] py-[14px] text-[18px] font-bold text-white">
            다음 단계
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignupForm
