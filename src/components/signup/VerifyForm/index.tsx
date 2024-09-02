import InputField from '@/components/common/InputField'
import VerificationCodeInput from '@/components/signup/VerifyForm/VerificationCodeInput'
import {
  useVerifyCodeMutation,
  useVerifyEmailMutation,
} from '@/hooks/mutations/useAuthMutation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IVerifyFormProps {
  status: boolean
  setStatus: Dispatch<SetStateAction<boolean>>
  onSubmitSignup: () => void
}

const VerifyForm = ({
  status,
  setStatus,
  onSubmitSignup,
}: IVerifyFormProps) => {
  const [verificationCode, setVerificationCode] = useState<number[]>(
    Array(6).fill(''),
  )

  const verifyEmail = useVerifyEmailMutation()
  const verifyCode = useVerifyCodeMutation({
    onSuccessFallback: () => {
      setStatus(true)
      alert('인증되었습니다.')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ email: string }>()

  const handleVerificationCodeChange = (value: string, index: number) => {
    const newCode = [...verificationCode]
    newCode[index] = Number(value)
    setVerificationCode(newCode)
  }
  const onClickNextBtn = () => {
    if (status) {
      onSubmitSignup()
    }
  }

  const onSubmitEmail = () => {
    verifyEmail.mutate({ email: watch('email') })
  }

  const onSubmitVerifyCode = () => {
    const email = watch('email')

    verifyCode.mutate({
      email,
      verificationCode: Number(verificationCode.join('')),
    })
  }

  return (
    <div className="mx-auto w-[60%]">
      <p className="w-full pr-[20px] pt-[11px] text-right text-[11px]">
        <span className="text-red-400">*</span> 표시는 필수 항목입니다.
      </p>
      <form
        className="mt-[48px] flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmitEmail)}
      >
        <div className="flex flex-col gap-[32px]">
          <InputField
            name="email"
            label="이메일"
            type="text"
            placeholder="이메일을 입력해주세요."
            isButton
            buttonText="인증번호 발송"
            register={register}
            errors={errors}
            onClickBtn={onSubmitEmail}
          />
          <div className="mt-4 flex items-center gap-5">
            <div className="flex w-[540px] items-center justify-between">
              <div className="required relative text-[14px]">인증번호</div>
              <VerificationCodeInput onChange={handleVerificationCodeChange} />
            </div>
            <div
              className="flex h-[36px] cursor-pointer items-center rounded-[8px] border border-black px-[15px]"
              onClick={onSubmitVerifyCode}
            >
              확인
            </div>
          </div>
          <div className="mx-auto mt-[100px]">
            <div
              className={`cursor-pointer rounded-[9px] px-[42px] py-[14px] text-[18px] font-bold text-white ${status ? 'bg-primary' : 'bg-gray-400'}`}
              onClick={() => onClickNextBtn()}
            >
              다음 단계
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default VerifyForm
