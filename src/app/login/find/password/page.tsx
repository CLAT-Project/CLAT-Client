'use client'

import InputField from '@/components/common/InputField'
import { useFindPassword } from '@/hooks/mutations/useAuthMutation'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormValue {
  username: string
  email: string
}

export default function FindPassword() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>()

  const findPassword = useFindPassword({
    onSuccess: () => {
      toast.success('전송완료')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    },
  })

  const onSubmitPassword = (data: FormValue) => {
    findPassword.mutate({
      username: data.username,
      email: data.email,
    })
  }

  return (
    <div className="mx-auto w-[60%]">
      <div className="flex justify-center pb-[5px] pt-[76px]">
        <Image
          src="/images/svg/CLAT-LOGO.svg"
          alt="Logo"
          width={151}
          height={53}
        />
      </div>

      <div className="flex justify-start">
        <Link href="/login">
          <p className="mx-auto flex">
            <Image
              src="/images/svg/arrow.svg"
              alt="arrow-login"
              width={15}
              height={13}
              className="mr-2"
            />
            LOGIN
          </p>
        </Link>
      </div>
      <div className="mx-auto mt-[10px] h-[1px] w-[100%] bg-black opacity-40" />
      <div className="mt-[45px] flex flex-col items-center justify-center">
        <p className="pb-[17px] text-[36px] font-bold">비밀번호 찾기</p>
        <p className="text-gray-600">
          비밀번호를 찾기 위해 아이디와 이메일을 입력해주세요.
        </p>
        <p className="text-gray-600">
          이메일로 임시 비밀번호를 발송해 드립니다.
        </p>
      </div>
      {/* onSubmit={} */}
      <form
        onSubmit={handleSubmit(onSubmitPassword)}
        className="flex flex-col items-center"
      >
        <div className="mt-[48px] flex flex-col items-center justify-center">
          <div className="flex flex-col gap-[32px]">
            <InputField
              label="아이디"
              type="text"
              isButton={false}
              name="username"
              register={register}
              errors={errors}
              validationRules={{ required: '아이디를 필수 입력해주세요' }}
            />

            <InputField
              label="이메일"
              type="text"
              isButton={false}
              name="email"
              register={register}
              errors={errors}
              validationRules={{ required: '이메일을 필수 입력해주세요.' }}
            />
          </div>
        </div>
        <div className="mt-20 flex h-[55px] w-[155px] items-center justify-center rounded-md bg-blue-500 text-base font-medium text-white">
          <button type="submit" disabled={isSubmitting}>
            비밀번호 찾기
          </button>
        </div>
      </form>
    </div>
  )
}
