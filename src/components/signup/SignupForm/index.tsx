'use client'

import CheckBox from '@/components/common/CheckBox'
import InputField from '@/components/common/InputField'
import { Dispatch, SetStateAction, useRef, useState } from 'react'

interface SignupFormProps {
  onNext: () => void
  register: any
  handleSubmit: any
  errors: any
  onSubmit: (data: any) => void
  setSelectedImgFile: Dispatch<SetStateAction<File | null>>
}

const SignupForm = ({
  onNext,
  register,
  handleSubmit,
  errors,
  onSubmit,
  setSelectedImgFile,
}: SignupFormProps) => {
  const imgRef = useRef<HTMLInputElement>(null)
  const [selectedImgName, setSelectedImgNaem] = useState<string>('')
  const [checkedState, setCheckedState] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
  })

  const handleChangeChecked = (isChecked: boolean, key: string) => {
    setCheckedState({
      ...checkedState,
      [key]: isChecked,
    })
  }

  const onClickFileBtn = () => {
    if (imgRef.current) {
      imgRef.current.click()
    }
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0]

    if (imageFile) {
      setSelectedImgNaem(imageFile.name)
      setSelectedImgFile(imageFile)
    } else {
      setSelectedImgNaem('')
      setSelectedImgFile(null)
    }
  }

  const onClickNextBtn = () => {
    if (!checkedState.checked1 || !checkedState.checked2) {
      alert('필수 항목에 동의해주세요.')
      return
    }
    onNext()
  }

  return (
    <form className="mx-auto w-[60%]" onSubmit={handleSubmit(onSubmit)}>
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
            name="schoolName"
            register={register}
            errors={errors}
            validationRules={{ required: true }}
          />
          <div className="relative flex items-center gap-5">
            <div className="flex w-[540px] items-center justify-between">
              <label className="required relative text-[14px]">증명서</label>
              <input
                className={`hidden`}
                type="file"
                accept="image/*"
                placeholder="증명서를 첨부해주세요."
                ref={imgRef}
                onChange={handleChangeImage}
              />
              <p className="signup-input flex items-center">
                <span>{selectedImgName}</span>
              </p>
            </div>
            <div
              className="cursor-pointer rounded-[8px] bg-primary px-[23px] py-[7px] text-[14px] text-white"
              onClick={onClickFileBtn}
            >
              파일 선택
            </div>
            <div className="absolute -bottom-2 left-1/4 h-[10px]">
              <p className="color-[0a0a0a] mt-1 text-[10px]">
                재직/재학 증명서를 첨부해주십시오.
              </p>
            </div>
          </div>
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
            label="서비스 이용 약관"
            checked={checkedState.checked2}
            onChange={handleChangeChecked}
            keyProp="checked2"
          />
          <CheckBox
            label="마케팅 수신 동의"
            checked={checkedState.checked3}
            onChange={handleChangeChecked}
            keyProp="checked3"
          />
        </div>
        <div className="mt-[40px]">
          <button
            className="rounded-[9px] bg-primary px-[42px] py-[14px] text-[18px] font-bold text-white"
            onClick={() => onClickNextBtn()}
          >
            다음 단계
          </button>
        </div>
      </div>
    </form>
  )
}

export default SignupForm
