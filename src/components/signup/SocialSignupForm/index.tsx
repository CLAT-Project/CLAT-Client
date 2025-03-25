'use client'

import InputField from '@/components/common/InputField'
import Image from 'next/image'
import ImageUpload from '@/components/signup/SignupForm/ImageUpload'
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import toast from 'react-hot-toast'

interface SocialSignupFormProps {
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
  errors: FieldErrors<FieldValues>
  onSubmit: (data: any) => void
  setSelectedImgFile: Dispatch<SetStateAction<File | null>>
  watch: UseFormWatch<FieldValues>
  setSocialUserType: Dispatch<SetStateAction<string>>
  socialData: {
    username: string
    name: string
    email: string
  }
}

const SocialSignupForm = ({
  register,
  handleSubmit,
  errors,
  onSubmit,
  setSelectedImgFile,
  socialData,
  watch,
  setSocialUserType,
}: SocialSignupFormProps) => {
  const [selectedImgName, setSelectedImgName] = useState<string>('')

  const handleImageChange = (file: File | null, filename: string) => {
    if (file) {
      setSelectedImgName(filename)
      setSelectedImgFile(file)
    } else {
      setSelectedImgName('')
      setSelectedImgFile(null)
    }
  }

  // 회원구분
  const onClickUserType = (userType: string) => {
    if (userType === 'STUDENT') {
      setSocialUserType('STUDENT')
    } else if (userType === 'PROFESSOR') {
      setSocialUserType('PROFESSOR')
    }
  }

  const onClickNextBtn = () => {
    const schoolName = watch('schoolName')
    const userType = watch('userType')

    if (!userType) {
      toast.error('회원 유형을 선택해주세요.')
      return
    }

    if (schoolName === '') {
      toast.error('필수 입력 사항을 입력해주세요.')
      return
    }

    if (!selectedImgName) {
      toast.error('증명서를 업로드해주세요.')
      return
    }
    handleSubmit(onSubmit)
  }

  return (
    <div className="min-h-screen flex-col items-center justify-center">
      <div className="flex justify-center pb-[50px] pt-[76px]">
        <Image
          src="/images/svg/CLAT-LOGO.svg"
          alt="Logo"
          width={151}
          height={53}
          priority
        />
      </div>
      <div className="mx-auto mt-[10px] h-[1px] w-[60%] bg-black opacity-40" />
      <div>
        <form className="mx-auto w-[60%]" onSubmit={handleSubmit(onSubmit)}>
          <p className="w-full pr-[20px] pt-[11px] text-right text-[11px]">
            <span className="text-red-400">*</span> 표시는 필수 항목입니다.
          </p>
          <div className="mt-[48px] flex flex-col items-center justify-center">
            <div className="flex flex-col gap-[32px]">
              <div className="flex text-sm">
                <div className="mr-[110px]">
                  <p className="required relative">회원구분 </p>
                </div>
                <div className="mr-[200px]">
                  <input
                    type="radio"
                    id="student"
                    {...register('userType', {
                      required: '회원 유형을 선택해주세요.',
                    })}
                    value="STUDENT"
                    onClick={() => onClickUserType('STUDENT')}
                  />
                  <label htmlFor="student" className="ml-3">
                    학생
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="professor"
                    {...register('userType', {
                      required: '회원 유형을 선택해주세요.',
                    })}
                    value="professor"
                    onClick={() => onClickUserType('PROFESSOR')}
                  />
                  <label htmlFor="student" className="ml-3">
                    교수
                  </label>
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
                value={socialData.name}
                readOnly
              />
              <InputField
                label="아이디"
                type="text"
                placeholder="아이디를 입력해주세요."
                name="username"
                register={register}
                errors={errors}
                value={socialData.username}
                readOnly
              />
              <InputField
                name="email"
                label="이메일"
                type="text"
                placeholder="이메일을 입력해주세요."
                register={register}
                errors={errors}
                value={socialData.email}
                readOnly
              />
              <InputField
                label="학교/기관"
                type="text"
                placeholder="학교/기관을 입력해주세요."
                isButton={false}
                name="schoolName"
                register={register}
                errors={errors}
                validationRules={{ required: '학교/기관을 필수 입력해주세요.' }}
              />
              <ImageUpload
                onChange={handleImageChange}
                selectedImgName={selectedImgName}
              />
            </div>
            <div className="mt-[70px]">
              <button
                type="submit"
                className="rounded-[9px] bg-primary px-[42px] py-[14px] text-[18px] font-bold text-white"
                onClick={onClickNextBtn}
              >
                다음 단계
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SocialSignupForm
