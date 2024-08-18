'use client'

import CheckBox from '@/components/common/CheckBox'
import InputField from '@/components/common/InputField'
import ImageUpload from '@/components/signup/SignupForm/ImageUpload'
import { useIdCheckMutation } from '@/hooks/mutations/useAuthMutation'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

interface SignupFormProps {
  onNext: () => void
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>
  errors: FieldErrors<FieldValues>
  onSubmit: (data: any) => void
  setSelectedImgFile: Dispatch<SetStateAction<File | null>>
  watch: UseFormWatch<FieldValues>
}

const SignupForm = ({
  onNext,
  register,
  handleSubmit,
  errors,
  onSubmit,
  setSelectedImgFile,
  watch,
}: SignupFormProps) => {
  const [selectedImgName, setSelectedImgName] = useState<string>('')
  const [idCheck, setIdCheck] = useState<boolean>()
  const [checkedState, setCheckedState] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
  })

  const checkId = useIdCheckMutation()

  const handleChangeChecked = (isChecked: boolean, key: string) => {
    setCheckedState({
      ...checkedState,
      [key]: isChecked,
    })
  }

  const handleImageChange = (file: File | null, filename: string) => {
    if (file) {
      setSelectedImgName(filename)
      setSelectedImgFile(file)
    } else {
      setSelectedImgName('')
      setSelectedImgFile(null)
    }
  }

  const validatePasswordConfirm = (
    password: string,
    passwordConfirm: string,
  ): string | null => {
    if (password !== passwordConfirm) {
      return '비밀번호와 비밀번호 확인이 일치하지 않습니다.'
    }
    return null
  }

  const onClickIdCheckBtn = () => {
    checkId.mutate({ username: watch('username') })

    if (checkId?.data?.code === '200 OK' && !checkId.isPending) {
      setIdCheck(true)
      alert(checkId?.data?.message)
    } else {
      setIdCheck(false)
      alert(checkId?.data?.message)
    }
  }

  const onClickNextBtn = () => {
    const username = watch('username')
    const password = watch('password')
    const passwordConfirm = watch('passwordConfirm')
    const name = watch('name')
    const schoolName = watch('schoolName')

    if (
      !checkedState.checked1 ||
      !checkedState.checked2 ||
      !checkedState.checked3
    ) {
      alert('필수 항목에 동의해주세요.')
      return
    }

    if (
      username === '' ||
      password === '' ||
      passwordConfirm === '' ||
      name === '' ||
      schoolName === '' ||
      !idCheck ||
      !selectedImgName
    ) {
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
            validationRules={{ required: '학교/기관을 필수 입력해주세요.' }}
          />
          <ImageUpload
            onChange={handleImageChange}
            selectedImgName={selectedImgName}
          />
          <InputField
            label="이름"
            type="text"
            placeholder="이름을 입력해주세요."
            isButton={false}
            name="name"
            register={register}
            errors={errors}
            validationRules={{ required: '이름을 필수 입력해주세요.' }}
          />
          <InputField
            label="아이디"
            type="text"
            placeholder="아이디를 입력해주세요."
            isButton={true}
            buttonText="중복확인"
            name="username"
            register={register}
            errors={errors}
            validationRules={{ required: '아이디를 필수 입력해주세요.' }}
            onClickBtn={onClickIdCheckBtn}
          />
          <InputField
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isButton={false}
            name="password"
            register={register}
            errors={errors}
            validationRules={{
              required: true,
              maxLength: {
                value: 14,
                message: '비밀번호는 14자 이하로 입력해주세요.',
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,14}$/,
                message:
                  '비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 14자 이하여야 합니다.',
              },
            }}
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            isButton={false}
            name="passwordConfirm"
            register={register}
            errors={errors}
            validationRules={{
              required: true,
              validate: (value: string) =>
                validatePasswordConfirm(watch('password'), value),
            }}
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
